import { Link, graphql } from 'gatsby';
import { formatPostDate, formatReadingTime } from '../utils/helpers';

import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Panel from '../components/Panel';
import React from 'react';
import SEO from '../components/SEO';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';

import { authors } from '../utils/authors';

class BlogIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const langKey = this.props.pageContext.langKey;

    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        <main>
          {langKey !== 'pt-br' && (
            <Panel>
              Esses artigos foram{' '}
              <a
                href="https://github.com/devheroes/devheroes-blog#contributing-translations"
                target="_blank"
                rel="noopener noreferrer"
              >
                traduzidos pela comunidade
              </a>
              .
            </Panel>
          )}

          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug;
            const author = node.frontmatter.author;

            return (
              <article key={node.fields.slug}>
                <header>
                  <h3
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: rhythm(1),
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link
                      style={{ boxShadow: 'none' }}
                      to={node.fields.slug}
                      rel="bookmark"
                    >
                      {title}
                    </Link>
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '8px 0',
                    }}
                  >
                    <img
                      src={authors[author].profilePic}
                      alt={authors[author].name}
                      style={{
                        marginRight: rhythm(1 / 2),
                        marginBottom: 0,
                        width: rhythm(1.25),
                        height: rhythm(1.25),
                        borderRadius: '50%',
                      }}
                    />
                    <small>
                      {authors[author].name}
                      {` • ${formatPostDate(node.frontmatter.date, langKey)}`}
                      {` • ${formatReadingTime(node.timeToRead)}`}
                    </small>
                  </div>
                </header>
                <p
                  dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }}
                />
              </article>
            );
          })}
        </main>
        <Footer />
      </Layout>
    );
  }
}

export default BlogIndexTemplate;

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            langKey
          }
          timeToRead
          frontmatter {
            author
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
          }
        }
      }
    }
  }
`;
