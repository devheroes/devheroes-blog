import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import { formatPostDate, formatReadingTime } from '../utils/helpers';

import Footer from '../components/Footer';
import Layout from '../layouts/Layout';
import Panel from '../components/Panel';
import React from 'react';
import SEO from '../components/SEO';
import { rhythm } from '../utils/typography';

import { authors } from '../utils/authors';

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
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            author: string;
            date: string;
            spoiler: string;
            title: string;
          };
          fields: {
            slug: string;
          };
          timeToRead: number;
        };
      }>;
    };
    avatars: {
      edges: Array<{
        node: {
          childImageSharp: {
            fixed: GatsbyImageSharpFixed;
          };
        };
      }>;
    };
  };
  pageContext: {
    langKey: string;
  };
};

export default function BlogIndexTemplate({
  location,
  data,
  pageContext,
}: Props) {
  const siteTitle = data.site.siteMetadata.title;
  const langKey = pageContext.langKey;

  const posts = data.allMarkdownRemark.edges;
  console.log({ data });

  return (
    <Layout location={location} title={siteTitle}>
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
          const title = node.frontmatter.title || node.fields.slug;
          const author = node.frontmatter.author;
          const avatar = data.avatars.edges.find(avatar =>
            avatar.node.childImageSharp.fixed.src.includes(author)
          );

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
                <ArticleInfo>
                  {avatar && <Img fixed={avatar.node.childImageSharp.fixed} />}
                  <small>
                    {authors[author].name}
                    {` • ${formatPostDate(node.frontmatter.date, langKey)}`}
                    {` • ${formatReadingTime(node.timeToRead)}`}
                  </small>
                </ArticleInfo>
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

const ArticleInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;

  small {
    margin-left: 16px;
  }
  img {
    border-radius: 50%;
  }
`;

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
    avatars: allFile(filter: { relativePath: { regex: "/authors/" } }) {
      edges {
        node {
          childImageSharp {
            fixed(width: 32, height: 32, quality: 100) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
      }
    }
  }
`;
