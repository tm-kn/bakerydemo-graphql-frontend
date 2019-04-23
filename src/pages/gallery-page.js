import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const GalleryPage = ({ data }) => {
  const page = data.wagtail.pages.base.galleryPage[0];

  return <Layout>
    <SEO title={page.seoTitle} description={page.seoDescription} />
    <h1>{page.title}</h1>
    {page.introduction && <h2 className="subtitle">{page.introduction}</h2>}
    {page.collection && page.collection.images.map(v => (
      <div key={v.id}>
        <h2>{v.title}</h2>
        <img src={v.rendition.url} alt={v.rendition.alt} />
        <hr />
      </div>
    ))}
  </Layout>;
};

GalleryPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query($pageID: ID) {
    wagtail {
      pages {
        base {
          galleryPage(id: $pageID) {
            id
            title
            introduction
            seoTitle
            seoDescription

            collection {
              images {
                id
                title
                rendition(filter:"height-600") {
                  url
                  alt
                }
              }
            }

            parent {
              title
              id
              url
            }

            children {
              title
              id
              url
            }

            previousSiblings {
              title
              id
              url
            }

            nextSiblings {
              title
              id
              url
            }

            ancestors {
              id
              title
              url
            }

            descendants {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`;

export default GalleryPage;
