import React from 'react';
import Layout from '../components/Layout';
import get from 'lodash/get';

class ReactComponentsUnsubscribed extends React.Component {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <h1>Você cancelou sua assinatura</h1>
        <p>Você não vai mais receber emails do Newsletter do DevHeroes.</p>
      </Layout>
    );
  }
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

export default ReactComponentsUnsubscribed;
