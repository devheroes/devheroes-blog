module.exports = {
  siteMetadata: {
    title: 'DevHeroes',
    subTitle: 'Torne-se um herói do desenvolvimento',
    author: 'Marcelo Dapper',
    description: 'Torne-se um herói do desenvolvimento',
    siteUrl: 'https://devheroes.io/',
    social: {
      twitter: '@devheroes_io',
    },
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
              prompt: {
                user: 'devheroes',
                host: 'localhost',
                global: false,
              },
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-130227707-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const siteUrl = site.siteMetadata.siteUrl;
                const postText = `
                <div style="margin-top=55px; font-style: italic;">(This is an article posted on the blog devheroes.io. You can read it online by <a href="${siteUrl +
                  edge.node.fields.slug}">clicking here</a>.)</div>
              `;

                let html = edge.node.html;
                html = html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.spoiler,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': html + postText }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                  filter: {fields: { langKey: {eq: "pt-br"}}}
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        spoiler
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'DevHeroes Blog RSS Feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-ebook`,
      options: {
        filename: 'devheroes.epub',
        query: `
          {
            site {
              siteMetadata {
                title
                author
              }
            }
            allMarkdownRemark(
              sort: { fields: frontmatter___date, order: ASC },
              filter: { fields: { langKey: { eq: "pt-br" } } }
            ) {
              edges {
                node {
                  id
                  fileAbsolutePath
                  rawMarkdownBody
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          }`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `DevHeroes`,
        description: `Blog com artigos sobre as tecnologias mais recentes usadas para desenvolvimento Web. Torne-se você também um herói do desenvolvimento.`,
        short_name: `DevHeroes`,
        start_url: `/`,
        background_color: `#9575CD`,
        theme_color: `#7E57C2`,
        display: `minimal-ui`,
        icon: `src/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'pt-br',
        useLangKeyLayout: false,
      },
    },
    `gatsby-plugin-catch-links`,
  ],
};
