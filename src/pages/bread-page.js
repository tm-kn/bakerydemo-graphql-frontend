import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const BreadPage = ({ data }) => {
  const page = data.wagtail.pages.breads.breadPage[0];

  const image = page.image && page.image.rendition;

  return <Layout>
    <SEO title={page.seoTitle} description={page.seoDescription} />
    <div>
      <div>
        <h1>{page.title}</h1>
        {image && <img src={image.url} alt={image.alt} />}
      </div>
      <div>
        <p>{page.introduction}</p>
        <h2>Origin</h2>
        {page.origin.title}
        <h2>Type</h2>
        {page.breadType.title}
      </div>
    </div>
  </Layout>;
};

BreadPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query($pageID: ID) {
    wagtail {
      pages {
        breads {
          breadPage(id: $pageID) {
            id
            title
            seoTitle
            seoDescription
            introduction
            image {
              rendition(filter:"width-500") {
                alt
                url
              }
            }

            breadType {
              title
            }

            origin {
              title
            }
          }
        }
      }
    }
  }
`;

export default BreadPage;
