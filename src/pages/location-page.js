import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import StreamField from '../components/stream-field';
import Layout from '../components/layout';
import SEO from '../components/seo';

const LocationPage = ({ data }) => {
  const page = data.wagtail.pages.locations.locationPage[0];

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
      </div>
      <h2>Address</h2>
      <div>
        {page.address.split(',').map(v => <p key={v}>{v}</p>)}
      </div>
      <div>
        <h2>Opening hours</h2>
        {page.operatingHours.map(v => {
          return (
            <div key={v.id}>
              <time itemProp="openingHours" dateTime={v.title}>
                <span className="day">{v.day}</span>:
                <span className="hours">
                  {v.closed ? 'Closed' : (
                    `${v.openingTime} - ${v.closingTime}`
                  )}
                </span>
              </time>
            </div>
          );
        })}
      </div>
      <br />
      <StreamField value={page.body} />
    </div>
  </Layout>;
};

LocationPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query($pageID: ID) {
    wagtail {
      pages {
        locations {
          locationPage(id: $pageID) {
            operatingHours {
              id
              title
              day
              closed
              openingTime
              closingTime
            }
            latLong
            address
            id
            title
            body
            seoTitle
            seoDescription
            introduction
            image {
              rendition(filter:"fill-1920x600") {
                alt
                url
              }
            }
          }
        }
      }
    }
  }
`;

export default LocationPage;
