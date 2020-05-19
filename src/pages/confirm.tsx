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

export default function Confirm({ location, data }: Props) {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <main>
        <h1>Só mais uma coisa...</h1>
        <p>
          Obrigado por assinar. Você vai precisar verificar sua caixa de entrada
          e confirmar sua assinatura.
        </p>
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ConfirmSiteData {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
