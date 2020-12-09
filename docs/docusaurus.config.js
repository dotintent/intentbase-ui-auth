module.exports = {
  title: 'Intentbase Docs',
  tagline: 'Set of packages for intentbase project.',
  url: 'https://intentbase.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'dotintent', // Usually your GitHub org/user name.
  projectName: 'intentbase-ui-auth', // Usually your repo name.
  themeConfig: {
    // googleAnalytics: {
    // 	trackingID: '',
    // 	anonymizeIP: true,
    // },
    // algolia : {
    // 	// This is a read-only, search-only key served directly by the front-end, managed by Algolia via their
    // 	// free DocSearch program. The key is not sensitive. See https://docsearch.algolia.com/ for more details.
    // 	apiKey: '',
    // 	indexName: '',
    // },
    navbar: {
      title: 'Intentbase',
      logo: {
        alt: 'Intentbase Logo',
        src: 'img/mobile-logo.png',
      },
      items: [
        {
          to: 'docs/ui-auth',
          label: 'Auth Components',
          position: 'left',
        },
        {
          to: '/',
          label: 'Frontend Starter',
          position: 'left',
        },
        {
          to: '/',
          label: 'Backend Starter',
          position: 'left',
        },
        {
          href: 'https://github.com/dotintent/intentbase-ui-auth',
          label: 'Github',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Intentbase Packages',
          items: [
            {
              label: 'UI Auth Components',
              to: 'docs/ui-auth',
            },
            {
              label: 'Frontend Starter',
              to: '/',
            },
            {
              label: 'Backend Starter',
              to: '/',
            },
          ],
        },
        {
          title: 'Social Media',
          items: [
            {
              label: 'Linkedin',
              href: 'https://www.linkedin.com/company/dotintent/',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/dotintent/',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/dotintent',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/dotintent',
            },
          ],
        },
        {
          title: 'More about Intent',
          items: [
            {
              label: 'Website',
              href: 'https://withintent.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/dotintent',
            },
            {
              label: 'Blog',
              href: 'https://withintent.com/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Intent. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/dotintent/intentbase-ui-auth/tree/main/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
