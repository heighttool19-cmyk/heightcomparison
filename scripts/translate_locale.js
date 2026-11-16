const fs = require('fs');
const path = require('path');

// Read OPENROUTER_API_KEY from environment or .env file
if (!process.env.OPENROUTER_API_KEY && fs.existsSync('.env')) {
  try {
    const envContent = fs.readFileSync('.env', 'utf8');
    for (const line of envContent.split('\n')) {
      const match = line.match(/^\s*OPENROUTER_API_KEY\s*=\s*["']?([^"'\r\n]+)["']?/);
      if (match) {
        process.env.OPENROUTER_API_KEY = match[1].trim();
        break;
      }
    }
  } catch (_) {}
}

const API_KEY = process.env.OPENROUTER_API_KEY || '';

const LOCALE_NAMES = {
  de: { name: 'German', nativeName: 'Deutsch' },
  es: { name: 'Spanish', nativeName: 'Español' },
  fr: { name: 'French', nativeName: 'Français' },
  pt: { name: 'Portuguese', nativeName: 'Português' },
  nl: { name: 'Dutch', nativeName: 'Nederlands' },
  ar: { name: 'Arabic', nativeName: 'العربية' },
  it: { name: 'Italian', nativeName: 'Italiano' },
  sv: { name: 'Swedish', nativeName: 'Svenska' },
  pl: { name: 'Polish', nativeName: 'Polski' }
};

const MODELS = [
  'google/gemini-2.5-flash',
  'deepseek/deepseek-chat',
  'meta-llama/llama-3.3-70b-instruct'
];

function countLeafKeys(obj) {
  let count = 0;
  for (const k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      count += countLeafKeys(obj[k]);
    } else {
      count += 1;
    }
  }
  return count;
}

async function callOpenRouter(messages, modelIndex = 0) {
  const model = MODELS[modelIndex] || MODELS[0];
  const url = 'https://openrouter.ai/api/v1/chat/completions';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://heightcomparisoncalculator.com',
      'X-Title': 'Height Comparison Tool Localization'
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      temperature: 0.1,
      response_format: { type: 'json_object' }
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.warn(`[WARN] Model ${model} returned status ${res.status}: ${errorText}`);
    if (modelIndex + 1 < MODELS.length) {
      console.log(`[INFO] Retrying with fallback model ${MODELS[modelIndex + 1]}...`);
      return callOpenRouter(messages, modelIndex + 1);
    }
    throw new Error(`OpenRouter API failed: ${res.status} - ${errorText}`);
  }

  const json = await res.json();
  const rawContent = json.choices[0]?.message?.content || '{}';
  return JSON.parse(rawContent);
}

function getEntitiesForLocale(locale) {
  const entityFilePath = path.resolve(`docs/semantic-seo-localization/${locale}/entities.json`);
  if (!fs.existsSync(entityFilePath)) return [];
  const entityData = JSON.parse(fs.readFileSync(entityFilePath, 'utf8'));
  return entityData.entities || [];
}

function buildSystemPrompt(locale, entities) {
  const lang = LOCALE_NAMES[locale]?.name || locale;
  const untranslated = entities.filter(e => !e.translate).map(e => e.canonical_name);
  const translated = entities.filter(e => e.translate && e.localized_form).map(e => `"${e.canonical_name}" -> "${e.localized_form}"`);

  return `You are an expert native SEO localization specialist translating web content from English into ${lang}.

CORE LOCALIZATION RULES:
1. Translate meaning, tone, and search intent naturally. Avoid awkward literal word-for-word machine translation.
2. NEVER modify or translate JSON keys. The output MUST have the EXACT same JSON keys and structure as the input.
3. PRESERVE VARIABLES EXACTLY: Never translate, remove, or modify ICU placeholders such as {count}, {amount}, {name}, {percentile}, {ratio}, {height}, {target}, {year}, etc.
4. PRESERVE HTML/RICH-TEXT TAGS: Keep tags like <bold>, </bold>, <link>, </link>, <mark>, </mark>, <sup>, </sup>, etc. intact.
5. PROTECT REGISTERED ENTITIES:
   - The following brand names, product names, and medical formula names must remain UNTRANSLATED (verbatim in English):
     ${untranslated.slice(0, 40).join(', ')}
   - The following products use specific localized names:
     ${translated.join('\n     ')}
6. SEO SEARCH HABITS:
   - For Swedish (sv): Use natural Swedish search terms such as "längdjämförelse", "kroppslängd", "medellängd efter land", "idealvikt", "räknare".
   - For Polish (pl): Use natural Polish search terms such as "porównanie wzrostu", "kalkulator wzrostu", "średni wzrost według kraju", "idealna waga", "kalkulator".
7. OUTPUT FORMAT:
   - Return strictly valid JSON containing the translated content matching the input keys. No conversational fluff, markdown backticks, or preamble.`;
}

async function translateChunk(locale, chunkData, entities, label = '') {
  const prompt = buildSystemPrompt(locale, entities);
  const userMessage = `Translate this JSON slice from English to ${LOCALE_NAMES[locale]?.name}:\n${JSON.stringify(chunkData, null, 2)}`;
  
  let attempts = 0;
  while (attempts < 3) {
    try {
      attempts++;
      const result = await callOpenRouter([
        { role: 'system', content: prompt },
        { role: 'user', content: userMessage }
      ]);
      return result;
    } catch (err) {
      console.warn(`    [WARN] Attempt ${attempts} failed for ${label}: ${err.message}`);
      if (attempts >= 3) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function translateNamespace(locale, nsName, nsData, entities) {
  console.log(`\n--------------------------------------------------`);
  console.log(`Translating [${nsName}] for locale: ${locale}...`);

  const keys = Object.keys(nsData);
  const totalLeaf = countLeafKeys(nsData);
  console.log(`  Top-level keys: ${keys.length}, Total leaf keys: ${totalLeaf}`);

  let translatedNs = {};

  // If small namespace (<= 25 leaves), translate in one shot
  if (totalLeaf <= 25) {
    const res = await translateChunk(locale, { [nsName]: nsData }, entities, `${nsName} (all)`);
    translatedNs = res[nsName] || res;
  } else {
    // Process top-level keys grouped by leaf count <= 25
    let currentBatchKeys = [];
    let currentLeafCount = 0;
    const batches = [];

    for (const key of keys) {
      const val = nsData[key];
      const keyLeaves = typeof val === 'object' && val !== null && !Array.isArray(val) ? countLeafKeys(val) : 1;
      
      // If a single key has > 25 leaves, it gets its own batch (or its subkeys get batched)
      if (keyLeaves > 25) {
        if (currentBatchKeys.length > 0) {
          batches.push(currentBatchKeys);
          currentBatchKeys = [];
          currentLeafCount = 0;
        }
        batches.push([key]);
      } else if (currentLeafCount + keyLeaves > 25 && currentBatchKeys.length > 0) {
        batches.push(currentBatchKeys);
        currentBatchKeys = [key];
        currentLeafCount = keyLeaves;
      } else {
        currentBatchKeys.push(key);
        currentLeafCount += keyLeaves;
      }
    }
    if (currentBatchKeys.length > 0) {
      batches.push(currentBatchKeys);
    }

    console.log(`  Divided into ${batches.length} batches`);

    for (let bIndex = 0; bIndex < batches.length; bIndex++) {
      const batchKeys = batches[bIndex];
      console.log(`  Batch ${bIndex + 1}/${batches.length} (keys: ${batchKeys.join(', ')})...`);

      // If this batch is a single large sub-object (> 25 leaves), batch its subkeys!
      if (batchKeys.length === 1 && typeof nsData[batchKeys[0]] === 'object' && !Array.isArray(nsData[batchKeys[0]]) && countLeafKeys(nsData[batchKeys[0]]) > 25) {
        const subKey = batchKeys[0];
        const subObj = nsData[subKey];
        const subSubKeys = Object.keys(subObj);
        console.log(`    Sub-batching large object [${subKey}] (${subSubKeys.length} subkeys)...`);
        
        translatedNs[subKey] = {};
        const SUB_BATCH_SIZE = 12;
        for (let s = 0; s < subSubKeys.length; s += SUB_BATCH_SIZE) {
          const sliceKeys = subSubKeys.slice(s, s + SUB_BATCH_SIZE);
          const sliceData = {};
          for (const k of sliceKeys) sliceData[k] = subObj[k];

          console.log(`      Sub-batch ${Math.floor(s / SUB_BATCH_SIZE) + 1}/${Math.ceil(subSubKeys.length / SUB_BATCH_SIZE)} (subkeys: ${sliceKeys.slice(0, 3).join(', ')}...)...`);
          const res = await translateChunk(locale, sliceData, entities, `${subKey}.${sliceKeys[0]}`);
          const returned = res[subKey] || res;
          for (const k of sliceKeys) {
            translatedNs[subKey][k] = returned[k] !== undefined ? returned[k] : subObj[k];
          }
        }
      } else {
        const batchData = {};
        for (const k of batchKeys) batchData[k] = nsData[k];

        const res = await translateChunk(locale, batchData, entities, batchKeys.join(', '));
        const returned = res[nsName] || res;
        for (const k of batchKeys) {
          translatedNs[k] = returned[k] !== undefined ? returned[k] : nsData[k];
        }
      }
    }
  }

  return translatedNs;
}

async function run() {
  const args = process.argv.slice(2);
  const locale = args[0];
  const targetNsArg = args[1] ? args[1].split(',') : null;

  if (!locale || !LOCALE_NAMES[locale]) {
    console.error(`Usage: node scripts/translate_locale.js <sv|pl> [namespace1,namespace2]`);
    process.exit(1);
  }

  const enPath = path.resolve('messages/en.json');
  const targetPath = path.resolve(`messages/${locale}.json`);

  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const targetData = fs.existsSync(targetPath) ? JSON.parse(fs.readFileSync(targetPath, 'utf8')) : {};
  const entities = getEntitiesForLocale(locale);

  const namespaces = targetNsArg || Object.keys(enData);
  console.log(`==================================================`);
  console.log(`Starting translation for [${locale}] (${LOCALE_NAMES[locale].name})`);
  console.log(`Namespaces to process: ${namespaces.join(', ')}`);
  console.log(`==================================================`);

  for (const ns of namespaces) {
    if (!enData[ns]) {
      console.warn(`Namespace [${ns}] not found in messages/en.json, skipping.`);
      continue;
    }

    try {
      const translated = await translateNamespace(locale, ns, enData[ns], entities);
      targetData[ns] = translated;

      // Save incrementally after each namespace
      fs.writeFileSync(targetPath, JSON.stringify(targetData, null, 2) + '\n', 'utf8');
      console.log(`  --> Successfully saved [${ns}] to messages/${locale}.json`);
    } catch (err) {
      console.error(`  [ERROR] Failed to translate namespace [${ns}]:`, err.message);
      throw err;
    }
  }

  console.log(`\n==================================================`);
  console.log(`Translation completed for [${locale}]!`);
  console.log(`==================================================\n`);
}

run().catch(err => {
  console.error('Fatal error in translation script:', err);
  process.exit(1);
});
