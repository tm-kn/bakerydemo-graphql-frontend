import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import StreamField from '../components/stream-field';
import Layout from '../components/layout';
import SEO from '../components/seo';

const StandardPage = ({ data }) => {
  const page = data.wagtail.pages.base.standardPage[0];

  const heroImage = page.image && page.image.rendition;

  return <Layout>
    <SEO title={page.seoTitle} description={page.seoDescription} />
    {heroImage && <img src={heroImage.url} alt={heroImage.alt} />}
    <h1>{page.title}</h1>
    <StreamField value={page.body} />
  </Layout>;
};

StandardPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query($pageID: ID) {
    wagtail {
      pages {
        base {
          standardPage(id: $pageID) {
            id
            title
            seoTitle
            seoDescription
            introduction
            image {
              rendition(filter: "fill-1920x600") {
                url
                alt
              }
            }
            body
          }
        }
      }
    }
  }
`;

export default StandardPage;
