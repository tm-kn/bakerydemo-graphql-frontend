import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogPage = ({ data }) => {
  const page = data.wagtail.pages.blog.blogPage[0];

  const dateDisplay = new Date(page.datePublished).toLocaleDateString();
  const heroImage = page.image && page.image.rendition;

  return <Layout>
    <SEO title={page.seoTitle} description={page.seoDescription} />
    {heroImage && <img src={heroImage.url} alt={heroImage.alt} />}
    <h1>{page.title}</h1>
    <p>{page.subtitle}</p>
    <p>{dateDisplay}</p>
    <ul>
      {page.authors.map(v => <li key={v.id}>
        <img src={v.image && v.image.rendition.url} alt={v.image && v.image.rendition.alt} />
        <p>{v.firstName} {v.lastName}</p>
      </li>)}
    </ul>
    {page.body && <div>{JSON.stringify(page.body)}</div>}
    <h2>Tagged with</h2>
    <ul>
      {page.tags.map(v => <li key={v}>{v}</li>)}
    </ul>
  </Layout>;
};

BlogPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query($pageID: ID) {
    wagtail {
      pages {
        blog {
          blogPage(id: $pageID) {
            id
            title
            subtitle
            seoTitle
            seoDescription
            introduction
            datePublished
            body
            tags
            image {
              rendition(filter: "fill-1920x600") {
                url
                alt
              }
            }
            authors {
              id
              firstName
              lastName
              image {
                rendition(filter: "fill-50x50-c100") {
                  url
                  alt
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default BlogPage;
