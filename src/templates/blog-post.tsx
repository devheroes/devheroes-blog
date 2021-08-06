import React, { Fragment } from 'react';
import { Link, graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

import '../fonts/fonts-post.css';
import Bio from '../components/Bio';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO';
import Signup from '../components/Signup';
import Panel from '../components/Panel';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import { rhythm, scale } from '../utils/typography';
import {
  codeToLanguage,
  createLanguageLink,
  loadFontsForCode,
  replaceAnchorLinksByLanguage,
} from '../utils/i18n';

import { authors } from '../utils/authors';

const GITHUB_USERNAME = 'devheroes';
const GITHUB_REPO_NAME = 'devheroes-blog';
const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif`;

type TranslationsProps = {
  editUrl: string;
  langKey: LangKey;
  languageLink: (language: LangKey) => string;
  translations: Array<LangKey>;
};

function Translations({
  translations,
  langKey,
  languageLink,
  editUrl,
}: TranslationsProps) {
  return (
    <div className="translations">
      <Panel fontFamily={systemFont}>
        {translations.length > 0 && (
          <span>
            <span>Translated by readers into: </span>
            {translations.map((language, i) => (
              <React.Fragment key={language}>
                {language === langKey ? (
                  <b>{codeToLanguage(language)}</b>
                ) : (
                  <Link to={languageLink(language)}>
                    {codeToLanguage(language)}
                  </Link>
                )}
                {i === translations.length - 1 ? '' : ' • '}
              </React.Fragment>
            ))}
          </span>
        )}
        {langKey !== 'pt-br' && (
          <Fragment>
            <br />
            <br />
            <Link to={languageLink('pt-br')}>Read the original</Link>
            {' • '}
            <a href={editUrl} target="_blank" rel="noopener noreferrer">
              Improve this translation
            </a>
            {' • '}
            <Link to={`/${langKey}`}>See all translated posts</Link>{' '}
          </Fragment>
        )}
      </Panel>
    </div>
  );
}

type Post = {
  frontmatter: {
    author: string;
    date: string;
    spoiler: string;
    title: string;
    image: {
      publicURL: string;
    };
  };
  fields: {
    langKey: LangKey;
    slug: string;
  };
  timeToRead: number;
  html: string;
};

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
    markdownRemark: Post;
    avatars: {
      edges: Array<{
        node: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      }>;
    };
  };
  pageContext: {
    previous: Post;
    next: Post;
    slug: string;
    translations: Array<LangKey>;
    translatedLinks: Array<string>;
  };
};

export default function BlogPostTemplate({
  data,
  pageContext,
  location,
}: Props) {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  let { previous, next, slug, translations, translatedLinks } = pageContext;
  const langKey = post.fields.langKey;

  // Replace original links with translated when available.
  let html = post.html;

  // Replace original anchor links by langKey when available in whitelist
  // see utils/whitelist.js
  html = replaceAnchorLinksByLanguage(html, langKey);

  translatedLinks.forEach(link => {
    // jeez
    function escapeRegExp(str: string) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    let translatedLink = '/' + langKey + link;
    html = html.replace(
      new RegExp('"' + escapeRegExp(link) + '"', 'g'),
      '"' + translatedLink + '"'
    );
  });

  translations = translations.slice();
  translations.sort((a, b) => {
    return codeToLanguage(a) < codeToLanguage(b) ? -1 : 1;
  });

  loadFontsForCode(langKey);
  // TODO: this curried function is annoying
  const languageLink = createLanguageLink(slug, langKey);
  const ptBrSlug = languageLink('pt-br');
  const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/pages/${ptBrSlug.slice(
    1,
    ptBrSlug.length - 1
  )}/index${langKey === 'pt-br' ? '' : '.' + langKey}.md`;
  const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://devheroes.io${ptBrSlug}`
  )}`;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        langKey={langKey}
        title={post.frontmatter.title}
        description={post.frontmatter.spoiler}
        image={post.frontmatter.image.publicURL}
        slug={post.fields.slug}
      />
      <main>
        <article>
          <header>
            <h1 style={{ color: 'var(--textTitle)' }}>
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: 'block',
                marginBottom: rhythm(1),
                marginTop: rhythm(-4 / 5),
              }}
            >
              {authors[post.frontmatter.author].name}
              {` • ${formatPostDate(post.frontmatter.date, langKey)}`}
              {` • ${formatReadingTime(post.timeToRead)}`}
            </p>
            {translations.length > 0 && (
              <Translations
                translations={translations}
                editUrl={editUrl}
                languageLink={languageLink}
                langKey={langKey}
              />
            )}
          </header>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <footer>
            <p>
              <a href={discussUrl} target="_blank" rel="noopener noreferrer">
                Discuss on Twitter
              </a>
              {` • `}
              <a href={editUrl} target="_blank" rel="noopener noreferrer">
                Edit on GitHub
              </a>
            </p>
          </footer>
        </article>
      </main>
      <aside>
        <div
          style={{
            margin: '90px 0 40px 0',
            fontFamily: systemFont,
          }}
        >
          <Signup />
        </div>

        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: rhythm(0.25),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'var(--purple)',
            }}
            to={'/'}
          >
            DevHeroes
          </Link>
        </h3>
        <Bio author={post.frontmatter.author} avatars={data.avatars} />
        <nav>
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              listStyle: 'none',
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link
                  to={previous.fields.slug}
                  rel="prev"
                  style={{ marginRight: 20 }}
                >
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        spoiler
        image {
          publicURL
        }
      }
      fields {
        slug
        langKey
      }
    }
    avatars: allFile(filter: { relativePath: { regex: "/authors/" } }) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(
              width: 64
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              quality: 100
            )
          }
        }
      }
    }
  }
`;
