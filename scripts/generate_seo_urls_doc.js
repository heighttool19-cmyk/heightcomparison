const fs = require('fs');
const path = require('path');

const VERCEL_BASE = 'https://heightcomparison.vercel.app';
const PROD_BASE = 'https://heightcomparisoncalculator.com';

const LOCALES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { code: 'sv', name: 'Swedish', native: 'Svenska', flag: '🇸🇪' },
  { code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱' }
];

const PAGES = [
  { id: 'home', name: 'Homepage / Height Comparison Tool', slug: '', type: 'Core Tool / Home' },
  { id: 'heightDifference', name: 'Height Difference Calculator', slug: 'height-difference-calculator', type: 'Calculator' },
  { id: 'heightPredictor', name: 'Child Height Predictor', slug: 'height-predictor', type: 'Calculator' },
  { id: 'heightWeightPercentile', name: 'Height & Weight Percentile Calculator', slug: 'height-weight-percentile-calculator', type: 'Calculator' },
  { id: 'idealBodyWeight', name: 'Ideal Body Weight Calculator', slug: 'ideal-body-weight-calculator', type: 'Calculator' },
  { id: 'imageToHeight', name: 'Image to Height Calculator', slug: 'image-to-height', type: 'Tool / Guide' },
  { id: 'averageHeightByCountry', name: 'Average Height by Country', slug: 'average-height-by-country', type: 'Data / Table' },
  { id: 'blogs', name: 'Blog Index', slug: 'blogs', type: 'Blog' },
  { id: 'blog_post', name: 'Blog: 10 Tallest People Ever Recorded', slug: 'blog/10-tallest-people-ever-recorded', type: 'Article' },
  { id: 'about', name: 'About Us', slug: 'about', type: 'Company' },
  { id: 'contact', name: 'Contact Us', slug: 'contact', type: 'Support' },
  { id: 'privacy', name: 'Privacy Policy', slug: 'privacy', type: 'Legal' }
];

function getUrl(base, localeCode, slug) {
  if (localeCode === 'en') {
    return slug ? `${base}/${slug}` : `${base}`;
  }
  return slug ? `${base}/${localeCode}/${slug}` : `${base}/${localeCode}`;
}

function getMeta(localeJson, pageId) {
  if (pageId === 'contact') {
    return {
      title: localeJson.contact?.metadata?.title || 'Contact Us | Height Comparison Calculator',
      description: localeJson.contact?.metadata?.description || ''
    };
  }
  if (pageId === 'blog_post') {
    return {
      title: '10 Tallest People Ever Recorded (272 cm Record Holder)',
      description: 'Discover the 10 tallest people in recorded history, from Robert Wadlow to modern record holders.'
    };
  }
  const titleKey = `${pageId}Title`;
  const descKey = `${pageId}Description`;
  return {
    title: localeJson.metadata?.[titleKey] || '',
    description: localeJson.metadata?.[descKey] || ''
  };
}

// Prepare records
const records = [];

for (const loc of LOCALES) {
  const jsonPath = path.join(__dirname, '..', 'messages', `${loc.code}.json`);
  const localeJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  for (const page of PAGES) {
    const meta = getMeta(localeJson, page.id);
    const vercelUrl = getUrl(VERCEL_BASE, loc.code, page.slug);
    const prodUrl = getUrl(PROD_BASE, loc.code, page.slug);

    records.push({
      localeCode: loc.code,
      language: `${loc.flag} ${loc.name} (${loc.native})`,
      pageType: page.type,
      pageName: page.name,
      slug: page.slug || '/',
      vercelUrl,
      prodUrl,
      title: meta.title,
      description: meta.description
    });
  }
}

// 1. Write CSV
const csvRows = [
  ['Language Code', 'Language', 'Page Name', 'Page Type', 'Vercel URL', 'Production URL', 'Current Meta Title', 'Current Meta Description', 'Optimized Meta Title (Biswa)', 'Optimized Meta Description (Biswa)', 'Target Focus Keyword', 'H1 Heading']
];

for (const r of records) {
  csvRows.push([
    r.localeCode,
    r.language,
    r.pageName,
    r.pageType,
    r.vercelUrl,
    r.prodUrl,
    r.title,
    r.description,
    '', // Biswa to fill
    '', // Biswa to fill
    '', // Biswa to fill
    ''  // Biswa to fill
  ]);
}

function escapeCsv(val) {
  const str = String(val || '').replace(/"/g, '""');
  return `"${str}"`;
}

const csvContent = csvRows.map(row => row.map(escapeCsv).join(',')).join('\n');
fs.writeFileSync(path.join(__dirname, '..', 'docs', 'all-urls-seo-10-languages.csv'), '\uFEFF' + csvContent, 'utf8'); // BOM for Excel / Google Sheets

// 2. Write Markdown Document
let md = `# Multilingual Website URLs & On-Page SEO Master Sheet\n\n`;
md += `> **Prepared for**: Biswa (On-Page SEO Optimization)\n`;
md += `> **Staging / Vercel Domain**: [https://heightcomparison.vercel.app](https://heightcomparison.vercel.app)\n`;
md += `> **Production Domain**: [https://heightcomparisoncalculator.com](https://heightcomparisoncalculator.com)\n`;
md += `> **Total Languages**: 10 Languages\n`;
md += `> **Total Pages per Language**: 12 Pages\n`;
md += `> **Total Indexed URLs**: 120 URLs\n\n`;

// 2A. Plain URL List - All 120 URLs in one block
md += `## 📋 Plain URL List (All 120 Vercel URLs - Single Copy Block)\n\n`;
md += `*Copy all 120 URLs at once directly into your Google Doc or Sheets:*\n\n`;
md += `\`\`\`text\n`;
for (const r of records) {
  md += `${r.vercelUrl}\n`;
}
md += `\`\`\`\n\n`;

// 2B. Grouped by Language (Clean list for individual Google Docs)
md += `## 🗂️ URLs Grouped by Language (12 URLs per Language)\n\n`;
md += `*Use these if you are preparing separate Google Docs for each language:*\n\n`;

LOCALES.forEach((loc, locIdx) => {
  const locRecords = records.filter(r => r.localeCode === loc.code);
  md += `### ${locIdx + 1}. ${loc.flag} ${loc.name} (\`${loc.code}\`)\n\n`;
  locRecords.forEach((r, idx) => {
    md += `${idx + 1}. ${r.vercelUrl}\n`;
  });
  md += `\n`;
});

md += `---\n\n`;

// 2C. Quick navigation to SEO metadata tables
md += `## 📊 Detailed On-Page SEO Tables (Metadata by Language)\n\n`;
md += `Jump to language table:\n`;
LOCALES.forEach(l => {
  md += `- [${l.flag} ${l.name} (${l.code})](#${l.code}---${l.name.toLowerCase()})\n`;
});
md += `\n---\n\n`;

for (const loc of LOCALES) {
  const locRecords = records.filter(r => r.localeCode === loc.code);
  md += `## ${loc.flag} ${loc.name} (${loc.native}) — Code: \`${loc.code}\`\n\n`;
  md += `| # | Page Name | Vercel URL | Production URL | Current Meta Title | Current Meta Description |\n`;
  md += `|---|---|---|---|---|---|\n`;

  locRecords.forEach((r, idx) => {
    md += `| ${idx + 1} | **${r.pageName}** | [\`${r.vercelUrl}\`](${r.vercelUrl}) | [\`${r.prodUrl}\`](${r.prodUrl}) | ${r.title.replace(/\|/g, '\\|')} | ${r.description.replace(/\|/g, '\\|')} |\n`;
  });

  md += `\n---\n\n`;
}

fs.writeFileSync(path.join(__dirname, '..', 'docs', 'all-urls-seo-10-languages.md'), md, 'utf8');

console.log(`Generated:
- docs/all-urls-seo-10-languages.csv (with BOM, perfect for Google Sheets import)
- docs/all-urls-seo-10-languages.md (Markdown format for Google Docs copying)
Total records: ${records.length}`);
