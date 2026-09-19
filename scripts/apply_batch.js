const fs = require('fs');
const path = require('path');

function getFlattenedKeys(obj, prefix = '') {
  let keys = {};
  for (const k in obj) {
    const fullPath = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(keys, getFlattenedKeys(obj[k], fullPath));
    } else {
      keys[fullPath] = obj[k];
    }
  }
  return keys;
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/apply_batch.js <locale> <batch_file_or_json>');
  process.exit(1);
}

const locale = args[0];
const inputPath = args[1];

let batchData;
if (fs.existsSync(inputPath)) {
  batchData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
} else {
  batchData = JSON.parse(inputPath);
}

const targetPath = path.resolve(`messages/${locale}.json`);
const enPath = path.resolve('messages/en.json');

const targetData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Apply the batch namespaces
const updatedNamespaces = Object.keys(batchData);
for (const ns of updatedNamespaces) {
  targetData[ns] = batchData[ns];
}

fs.writeFileSync(targetPath, JSON.stringify(targetData, null, 2) + '\n', 'utf8');
console.log(`Updated namespaces [${updatedNamespaces.join(', ')}] in messages/${locale}.json`);

// Validate key completeness against en.json for these namespaces
const enFlat = getFlattenedKeys(enData);
const targetFlat = getFlattenedKeys(targetData);

const missingKeys = [];
const extraKeys = [];
const emptyKeys = [];

for (const key in enFlat) {
  if (!updatedNamespaces.some(ns => key === ns || key.startsWith(ns + '.'))) {
    continue;
  }
  if (!(key in targetFlat)) {
    missingKeys.push(key);
  } else if (typeof targetFlat[key] === 'string' && targetFlat[key].trim() === '') {
    emptyKeys.push(key);
  }
}

for (const key in targetFlat) {
  if (!updatedNamespaces.some(ns => key === ns || key.startsWith(ns + '.'))) {
    continue;
  }
  if (!(key in enFlat)) {
    extraKeys.push(key);
  }
}

console.log(`\nValidation for namespaces [${updatedNamespaces.join(', ')}]:`);
console.log(`Missing keys: ${missingKeys.length}`);
console.log(`Extra keys: ${extraKeys.length}`);
console.log(`Empty keys: ${emptyKeys.length}`);

if (missingKeys.length > 0) console.error('MISSING:', missingKeys);
if (extraKeys.length > 0) console.error('EXTRA:', extraKeys);
if (emptyKeys.length > 0) console.error('EMPTY:', emptyKeys);

const passed = missingKeys.length === 0 && extraKeys.length === 0 && emptyKeys.length === 0;
console.log(`RESULT: ${passed ? '✅ PASS' : '❌ FAIL'}`);

if (!passed) process.exit(1);
