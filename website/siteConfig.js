/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.
const baseUrl = process.env.DEPLOY_ENV ? 'https://wandisco.github.io/wandisco-documentation/' : '/'

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    //image: '/img/undraw_open_source.svg',
    infoLink: 'https://www.wandisco.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'WANdisco docs', // Title for your website.
  tagline: 'What\'s new',
  url: 'https://wandisco.github.io/wandisco-documentation/ ', // Your website URL
  baseUrl: baseUrl, // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'wandisco-documentation',
  organizationName: 'WANdisco',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'why-fusion/benefits', label: 'Why Fusion?'},
    {doc: 'quickstarts/installation/quickstart-config', label: 'Quickstarts'},
    {doc: 'docs/doc1', label: 'Docs'},
    {doc: 'docs/install_guides/install_guides_intro', label: 'Install Guides'},
    {doc: 'glossary/a', label: 'Glossary'},
  //  {doc: 'api/api', label: 'API'},
    {doc: 'help/need_help', label: 'Help'},
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: href="img/favicon.png",
  //footerIcon: href="//www.wandisco.com/static/images/favicon-32x32.png",
  favicon: href="img/favicon.png",

  /* Colors for website */
  colors: {
    primaryColor: '#6c757d',
    secondaryColor: '#EA7600',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} WANdisco, Inc.`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
docsSideNavCollapsible: true,

  algolia: {
    apiKey: '56e573413aa88e9ec072a585bec45683',
    indexName: 'wandisco',
    algoliaOptions: {} // Optional, if provided by Algolia
  },



  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};


module.exports = siteConfig;
