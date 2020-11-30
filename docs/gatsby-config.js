const navConfig = {
  'Backend Starter': {
    category: 'Backend',
    url: 'https://github.com/dotintent/intentbase-backend',
    description: 'Backend starter for intentbase projects',
  },
  'UI Auth': {
    category: 'Components',
    url: 'https://github.com/dotintent/intentbase-ui-auth',
    description:
      'UI React components for Log in, Register and Forgot password, to use with auth providers like Cognito.',
  },
  'Frontend Starter': {
    category: 'Frontend',
    url: 'https://github.com/dotintent/intentbase-front',
    description: 'Frontend starter for intentbase projects',
  },
  'Deployment script': {
    category: 'DevOps',
    url: 'https://github.com/dotintent/intentbase-front',
    description: 'Frontend starter for intentbase projects',
  },
};

const footerNavConfig = {
  Website: {
    href: 'https://withintent.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  Github: {
    href: 'https://github.com/dotintent/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  Blog: {
    href: 'https://withintent.com/blog/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

module.exports = {
  pathPrefix: '/docs',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/img`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      // Options Docs:
      // https://github.com/apollographql/gatsby-theme-apollo/tree/master/packages/gatsby-theme-apollo-docs
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        root: __dirname,
        description: 'How to use the Apollo GraphQL platform',
        siteName: 'Intentbase Docs',
        subtitle: 'Intentbase UI Auth',
        pageTitle: 'Intentbase UI Auth Docs',
        baseDir: 'docs',
        contentDir: 'content',
        githubRepo: 'dotintent/intentbase-ui-auth',
        // gaTrackingId: 'UA-74643563-13', TODO: discuss do we need analytics
        algoliaApiKey: '768e823959d35bbd51e4b2439be13fb7', // TODO: Request for api key after most of content will be added
        algoliaIndexName: 'apollodata',
        baseUrl: 'http://localhost:8000/', // TODO: change to deployed app link
        twitterHandle: 'dotintent',
        menuTitle: 'Intentbase Platform',
        navConfig,
        logoLink: 'http://localhost:8000/', // TODO: change to deployed app link
        footerNavConfig,
        sidebarCategories: {
          null: ['index'],
          Tutorial: ['tutorial/test'],
          Resources: ['[Principled GraphQL](https://principledgraphql.com)'],
        },
      },
    },
  ],
};
