import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const query = graphql`
  query {
    logo: file(relativePath: { eq: "main-logo.png" }) {
      childImageSharp {
        fixed(width: 180, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

const Logo = () => {
  const { logo } = useStaticQuery(query);
  return <Img fixed={logo.childImageSharp.fixed} alt="Intent Logo" />;
};

export default Logo;
