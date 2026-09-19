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

function validateCompleteness(locale, targetNamespaces = null) {
  const enPath = path.resolve('messages/en.json');
  const targetPath = path.resolve(`messages/${locale}.json`);

  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const targetData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

  const enFlat = getFlattenedKeys(enData);
  const targetFlat = getFlattenedKeys(targetData);

  const missingKeys = [];
  const extraKeys = [];
  const emptyKeys = [];

  for (const key in enFlat) {
    if (targetNamespaces && !targetNamespaces.some(ns => key === ns || key.startsWith(ns + '.'))) {
      continue;
    }
    if (!(key in targetFlat)) {
      missingKeys.push(key);
    } else if (typeof targetFlat[key] === 'string' && targetFlat[key].trim() === '') {
      emptyKeys.push(key);
    }
  }

  for (const key in targetFlat) {
    if (targetNamespaces && !targetNamespaces.some(ns => key === ns || key.startsWith(ns + '.'))) {
      continue;
    }
    if (!(key in enFlat)) {
      extraKeys.push(key);
    }
  }

  console.log(`\n========================================`);
  console.log(`Completeness Validation for Locale: [${locale}]`);
  if (targetNamespaces) {
    console.log(`Filtered namespaces: ${targetNamespaces.join(', ')}`);
  }
  console.log(`Total En keys checked: ${Object.keys(enFlat).filter(k => !targetNamespaces || targetNamespaces.some(ns => k.startsWith(ns))).length}`);
  console.log(`Missing keys: ${missingKeys.length}`);
  console.log(`Extra keys: ${extraKeys.length}`);
  console.log(`Empty string keys: ${emptyKeys.length}`);

  if (missingKeys.length > 0) {
    console.error('MISSING KEYS (first 10):', missingKeys.slice(0, 10));
  }
  if (extraKeys.length > 0) {
    console.error('EXTRA KEYS (first 10):', extraKeys.slice(0, 10));
  }
  if (emptyKeys.length > 0) {
    console.error('EMPTY KEYS (first 10):', emptyKeys.slice(0, 10));
  }

  const passed = missingKeys.length === 0 && extraKeys.length === 0 && emptyKeys.length === 0;
  console.log(`RESULT: ${passed ? '✅ PASS (100% Complete)' : '❌ FAIL'}`);
  console.log(`========================================\n`);

  return passed;
}

// Allow CLI execution: node scripts/validate_completeness.js es common,nav,footer
const args = process.argv.slice(2);
const locale = args[0] || 'es';
const namespaces = args[1] ? args[1].split(',') : null;
validateCompleteness(locale, namespaces);
