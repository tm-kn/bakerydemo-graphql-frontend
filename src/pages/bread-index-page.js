import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const BreadIndexPage = ({ data }) => {
  const page = data.wagtail.pages.breads.breadsIndexPage[0];

  const renderPageList = (pages, title) => {
    if (!pages || pages.length === 0) {
      return;
    }

    let titleHeading;

    if (title) {
      titleHeading = <h2>{title}</h2>;
    }

    return <>
      {titleHeading}
      <table>
        <thead>
          <th colSpan={2}>Bread</th>
          <th>Type</th>
          <th>Origin</th>
        </thead>
        <tbody>
          {pages.map(page => {
            const image = page.specific.image && page.specific.image.rendition;
            const breadType = page.specific.breadType
              ? page.specific.breadType.title : '';
            const origin = page.specific.origin ? page.specific.origin.title : '';
            return (
              <tr key={page.id}>
                <td>
                  {image && (
                    <Link to={page.url}>
                      <img src={image.url} alt={image.alt} />
                    </Link>
                  )}
                </td>
                <td><Link to={page.url}>{page.title}</Link></td>
                <td>{breadType}</td>
                <td>{origin}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>;
  };

  return <Layout>
    <SEO title={page.seoTitle} description={page.seoDescription} />
    <h1>{page.title}</h1>
    {renderPageList(page.children)}
  </Layout>;
};

BreadIndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query($pageID: ID) {
    wagtail {
      pages {
        breads {
          breadsIndexPage(id: $pageID) {
            id
            title
            introduction
            seoTitle
            seoDescription

            children(order:"title") {
              title
              id
              url
              specific {
                ... on WAGTAIL_BreadsBreadPageObjectType {
                  origin {
                    title
                  }
                  breadType {
                    title
                  }
                  image {
                    rendition(filter:"fill-100x100-c100") {
                      alt
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default BreadIndexPage;
