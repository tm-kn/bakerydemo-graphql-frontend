import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import RichText from '../components/rich-text';
import StreamField from '../components/stream-field';

const HomePage = ({ data }) => {
  const page = data.wagtail.pages.base.homePage[0];

  const heroContainerStyle = {
    color: 'white'
  };
  const heroImage = page.image && page.image.rendition.url;
  const promoImage = page.promoImage && page.promoImage.rendition;
  if (heroImage) {
    heroContainerStyle['backgroundImage'] = `url(${heroImage})`;
  }

  return <Layout>
    <SEO title={page.seoTitle} description={page.seoDescription} />
    <div style={heroContainerStyle}>
      <h1>{page.title}</h1>
      <p>{page.heroText}</p>
      <Link style={{ color: 'white' }} to={page.heroCtaLink.url}>{page.heroCta}</Link>
    </div>
    <br />
    <div className="container">
      <div className="row promo-row">
        <div className="col-sm-5 promo">
          {(promoImage || page.promoTitle || page.promoText) && <>
            <figure><img src={promoImage.url} alt={promoImage.alt} /></figure>
            <div className="promo-text">
              <h3>{page.promoTitle}</h3>
              <RichText>{page.promoText}</RichText>
            </div>
          </>}
        </div>

        <div className="col-sm-6 col-sm-offset-1 feature-1">
          {page.featuredSection1 &&
            <>
              <h2>{page.featuredSection1Title}</h2>
              <div className="featured-children">
                {page.featuredSection1.children.map(v => {
                  const image = v.specific.image && v.specific.image.rendition;
                  let imageElement;
                  if (image) {
                    imageElement = (
                      <Link to={v.url}>
                        <figure>
                          <img src={image.url} alt={image.alt} />
                        </figure>
                      </Link>
                    );
                  }

                  return <li key={v.id}>
                    <div className="row">
                      <div className="col-xs-4">
                        {imageElement}
                      </div>
                      <div className="col-xs-8">
                        <h3><Link to={v.url}>{v.title}</Link></h3>
                      </div>
                    </div>
                  </li>;
                })}
              </div>
            </>
          }
        </div>

        <StreamField value={page.body} />

        <div className="col-sm-6 col-sm-offset-1 feature-1">
          {page.featuredSection2 &&
            <>
              <h2>{page.featuredSection2Title}</h2>
              <div className="featured-children">
                {page.featuredSection2.children.map(v => {
                  const image = v.specific.image && v.specific.image.rendition;
                  let imageElement;
                  if (image) {
                    imageElement = (
                      <Link to={v.url}>
                        <figure>
                          <img src={image.url} alt={image.alt} />
                        </figure>
                      </Link>
                    );
                  }

                  return <li key={v.id}>
                    <div className="row">
                      <div className="col-xs-4">
                        {imageElement}
                      </div>
                      <div className="col-xs-8">
                        <h3><Link to={v.url}>{v.title}</Link></h3>
                        {v.specific && v.specific.introduction &&
                          <p>{v.specific.introduction}</p>
                        }
                      </div>
                    </div>
                  </li>;
                })}
              </div>
            </>
          }
        </div>

        <div className="col-sm-6 col-sm-offset-1 feature-1">
          {page.featuredSection3 &&
            <>
              <h2>{page.featuredSection3Title}</h2>
              <div className="featured-children">
                {page.featuredSection3.children.map(v => {
                  const image = v.specific.image && v.specific.image.rendition;
                  let imageElement;
                  if (image) {
                    imageElement = (
                      <Link to={v.url}>
                        <figure>
                          <img src={image.url} alt={image.alt} />
                        </figure>
                      </Link>
                    );
                  }

                  return <li key={v.id}>
                    <div className="row">
                      <div className="col-xs-4">
                        {imageElement}
                      </div>
                      <div className="col-xs-8">
                        <h3><Link to={v.url}>{v.title}</Link></h3>
                      </div>
                    </div>
                  </li>;
                })}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  </Layout>;
};

HomePage.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query($pageID: ID) {
    wagtail {
      pages {
        base {
          homePage(id: $pageID) {
            id
            title
            seoTitle
            seoDescription
            children {
              id
              title
              url
            }

            heroText
            heroCta
            heroCtaLink {
              url
            }
            image {
              rendition(filter: "fill-1920x600") {
                url
              }
            }

            promoTitle
            promoText
            promoImage {
              rendition(filter: "fill-200x200-c100") {
                url
                alt
              }
            }

            featuredSection1 {
              children(limit:4) {
                id
                url
                title
                specific {
                  ... on WAGTAIL_BreadsBreadPageObjectType {
                    image {
                      rendition(filter: "fill-180x140-c100") {
                        url
                      }
                    }
                  }
                }
              }
            }
            featuredSection1Title

            body

            featuredSection2 {
              children(limit: 3) {
                id
                url
                title
                specific {
                  ... on WAGTAIL_LocationsLocationPageObjectType {
                    image {
                      rendition(filter: "fill-180x140-c100") {
                        url
                      }
                    }
                    introduction
                  }
                }
              }
            }

            featuredSection2Title


            featuredSection3 {
              children(limit:6) {
                id
                title
                url
                specific {
                  ... on WAGTAIL_BlogBlogPageObjectType {
                    image {
                      rendition(filter: "fill-180x140-c100") {
                        url
                      }
                    }
                    introduction
                  }
                }
              }
            }

            featuredSection3Title
          }
        }
      }
    }
  }
`;

export default HomePage;
