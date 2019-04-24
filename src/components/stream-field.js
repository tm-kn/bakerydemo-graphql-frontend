import React from 'react';
import PropTypes from 'prop-types';

import RichText from './rich-text';
import Heading from './heading';

const StreamField = ({ value }) => {
  return (
    <div>
      {value.map(block => {
        switch (block.type) {
          case 'paragraph_block':
            return <RichText key={block.id}>{block.value}</RichText>;
          case 'heading_block':
            return <Heading size={block.value.size}>
              {block.value.heading_text}
            </Heading>;
          case 'image_block':
            return (
              <div key={block.id} style={{ marginBottom: 30 }}>
                <img style={{ margin: 0 }}
                  src={block.value.image.url} alt={block.value.image.alt} />
                <p style={{ fontStyle: 'italic', fontSize: '80%' }}>
                  {block.value.attribution} - {block.value.caption}
                </p>
              </div>
            );

          case 'embed_block':
            return (
              <div key={block.id}
                dangerouslySetInnerHTML={{ __html: block.value.html }} />
            );

          case 'block_quote':
            return (
              <div>
                <blockquote>
                  <p>{block.value.text}</p>
                </blockquote>
                {block.value.attribute_name && <cite>
                  {block.value.attribute_name}
                </cite>}
              </div>
            );
        }
      })}
    </div>
  );
};

StreamField.propTypes = {
  value: PropTypes.array
};

export default StreamField;
