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

export default function Thanks({ location, data }: Props) {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <main>
        <h1>Obrigado por assinar.</h1>
        <p>
          Você agora está confirmado. Você pode esperar receber emails conforme
          formos criando novo conteúdo.
        </p>
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ThanksSiteData {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
