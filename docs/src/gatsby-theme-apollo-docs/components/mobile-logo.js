import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const query = graphql`
  query {
    mobileLogo: file(relativePath: { eq: "mobile-logo.png" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export const MobileLogo = () => {
  const { mobileLogo } = useStaticQuery(query);
  return <Img fixed={mobileLogo.childImageSharp.fixed} alt="Mobile Intent Logo" />;
};
