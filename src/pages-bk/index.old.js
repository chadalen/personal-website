import React from 'react';
import { graphql } from 'gatsby';

export default ({ location, data }) => {
  return (

  );
};

export const query = graphql`
  query MyQuery($avatarWidth: Int = 384, $mtaWidth: Int = 192) {
    avatar: file(relativePath: { eq: "data/images/avatar-circle.png" }) {
      ...avatarFragment
    }
    mta1: file(relativePath: { eq: "data/images/mta-badge-1.png" }) {
      ...mtaFragment
    }
    mta2: file(relativePath: { eq: "data/images/mta-badge-2.png" }) {
      ...mtaFragment
    }
  }

  fragment avatarFragment on File {
    childImageSharp {
      resize(width: $avatarWidth, toFormat: WEBP, quality: 75) {
        src
      }
    }
  }

  fragment mtaFragment on File {
    childImageSharp {
      resize(width: $mtaWidth, toFormat: WEBP, quality: 75) {
        src
      }
    }
  }
`;
