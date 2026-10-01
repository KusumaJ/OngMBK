#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const version = (value) => crypto.createHash('sha1').update(value).digest('hex').slice(0, 10);
const outputDirectory = path.join(root, 'public');
const writeOutput = (file, value) => {
  const destination = path.join(outputDirectory, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, value, 'utf8');
};

const site = JSON.parse(read('data/site.json'));
const pageTemplate = read('templates/page.html');
const componentTemplate = read('templates/site-components.js');
const routes = new Set(site.pages.map((page) => page.route));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateNavigation(items) {
  items.forEach((item) => {
    if (item.href) assert(routes.has(item.href), `Navigation route does not exist: ${item.href}`);
    if (item.children) validateNavigation(item.children);
  });
}

assert(site.site && site.navigation && site.pages, 'data/site.json must include site, navigation, and pages.');
assert(routes.size === site.pages.length, 'Each page route must be unique.');
validateNavigation(site.navigation);

const componentSource = componentTemplate.replace('__SITE_DATA__', JSON.stringify({ site: site.site, navigation: site.navigation }, null, 2));
const componentVersion = version(componentSource);
const stylesheetVersion = version(read('files/main_style.css'));

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });
fs.cpSync(path.join(root, 'files'), path.join(outputDirectory, 'files'), { recursive: true });
fs.cpSync(path.join(root, 'uploads'), path.join(outputDirectory, 'uploads'), { recursive: true });
['robots.txt', 'sitemap.xml'].forEach((file) => fs.copyFileSync(path.join(root, file), path.join(outputDirectory, file)));

site.pages.forEach((page) => {
  assert(/^[\w-]+\.html$/.test(page.route), `Unsafe page route: ${page.route}`);
  const content = read(page.content);
  assert(content.trim(), `Content is empty: ${page.content}`);

  const output = pageTemplate
    .replace('{{TITLE}}', page.title)
    .replace('{{BODY_CLASS}}', page.bodyClass)
    .replace('{{CONTENT}}', content)
    .replace('files/main_style.css?v=1', `files/main_style.css?v=${stylesheetVersion}`)
    .replace('files/theme/files/site-components.js?v=1', `files/theme/files/site-components.js?v=${componentVersion}`);

  assert(!output.includes('{{'), `Unresolved template token in ${page.route}`);
  writeOutput(page.route, output);
});

writeOutput('files/theme/files/site-components.js', componentSource);
console.log(`Built ${site.pages.length} pages in public/.`);
