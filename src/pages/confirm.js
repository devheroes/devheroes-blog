import React from 'react';
import Layout from '../layouts/Layout';
import get from 'lodash/get';
import { graphql } from 'gatsby';

class Confirm extends React.Component {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <main>
          <h1>Só mais uma coisa...</h1>
          <p>
            Obrigado por assinar. Você vai precisar verificar sua caixa de
            entrada e confirmar sua assinatura.
          </p>
        </main>
      </Layout>
    );
  }
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

export default Confirm;
