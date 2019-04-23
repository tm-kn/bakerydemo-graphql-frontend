import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogIndexPage = ({ data }) => {
  const page = data.wagtail.pages.blog.blogIndexPage[0];

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
      <ul>
        {pages.map(page => {
          const image = page.specific.image && page.specific.image.rendition;
          const dateDisplay = new Date(page.specific.datePublished).toLocaleDateString()
          return (
            <li key={page.id}>
              {image && (
                <Link to={page.url}>
                  <img src={image.url} alt={image.alt} />
                </Link>
              )}
              <Link to={page.url}>{page.title}</Link>
              <p>
                {dateDisplay} by {page.specific.authors
                              .map(v => `${v.firstName} ${v.lastName}`)
                              .join(',')}
              </p>
            </li>
          );
        })}
      </ul>
    </>;
  };

  return <Layout>
    <SEO title={page.seoTitle} description={page.seoDescription} />
    <h1>{page.title}</h1>
    {renderPageList(page.children)}
  </Layout>;
};

BlogIndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query($pageID: ID) {
    wagtail {
      pages {
        blog {
          blogIndexPage(id: $pageID) {
            id
            title
            introduction
            seoTitle
            seoDescription

            children (order: "-blogpage__date_published"){
              title
              id
              url
              specific {
                ... on WAGTAIL_BlogBlogPageObjectType {
                  datePublished
                  authors {
                    id
                    firstName
                    lastName
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

export default BlogIndexPage;
