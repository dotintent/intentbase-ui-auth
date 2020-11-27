import React from 'react';
import { Helmet } from 'react-helmet';
import favicon from '../../assets/icons/favicon.ico';

const SEO = ({ title, description, siteName, twitterCard = 'summary', children }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="icon" href={favicon} />
      {children}
    </Helmet>
  );
};

export default SEO;
