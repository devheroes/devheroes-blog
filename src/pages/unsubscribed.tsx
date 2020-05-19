import React from 'react';
import Layout from '../layouts/Layout';
import { graphql } from 'gatsby';

type Props = {
  location: {
    pathname: string;
  };
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
};

export default function Unsubscribed({ location, data }: Props) {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Você cancelou sua assinatura</h1>
      <p>Você não vai mais receber emails do Newsletter do DevHeroes.</p>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ReactComponentsUnsubscribedSiteData {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
