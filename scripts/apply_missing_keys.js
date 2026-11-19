// scripts/apply_missing_keys.js
const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');

const locales = ['en', 'de', 'es', 'fr', 'pt', 'nl', 'it', 'sv', 'pl', 'ar'];

const dataMap = {
  en: require('./missing_keys_en').data.en,
  de: require('./locales/de'),
  es: require('./locales/es'),
  fr: require('./locales/fr'),
  pt: require('./locales/pt'),
  nl: require('./locales/nl'),
  it: require('./locales/it'),
  sv: require('./locales/sv'),
  pl: require('./locales/pl'),
  ar: require('./locales/ar'),
};

for (const loc of locales) {
  const filePath = path.join(MESSAGES_DIR, `${loc}.json`);
  const current = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const patch = dataMap[loc];

  // 1. Add dashboard
  current.dashboard = patch.dashboard;

  // 2. Add contact
  current.contact = patch.contact;

  // 3. Update home
  if (!current.home) current.home = {};
  current.home.cta = patch.home.cta;
  if (!current.home.section8) current.home.section8 = {};
  current.home.section8.sources = patch.home.section8.sources;
  current.home.section8.items = patch.home.section8.items;
  current.home.visuals = patch.home.visuals;

  fs.writeFileSync(filePath, JSON.stringify(current, null, 2) + '\n', 'utf8');
  console.log(`Updated messages/${loc}.json successfully.`);
}

