// utils/blogContentRender.js

import React from 'react';

export const renderContent = (blocks) => {
  return blocks.map((block, index) => {
    const { type, data, accessibility } = block;

    // Render headers with accessibility attributes
    if (type === 'header') {
      const { text, level } = data;
      const ariaLevel = accessibility?.ariaLevel || level;
      const HeadingTag = `h${level}`; // Dynamically choose header level

      return (
        <HeadingTag
          key={index}
          role={accessibility?.role || 'heading'}
          aria-level={ariaLevel}
        >
          {text}
        </HeadingTag>
      );
    }

    // Render paragraphs
    if (type === 'paragraph') {
      return <p key={index}>{data.text}</p>;
    }

    // Render images with alt text and captions
    if (type === 'image') {
      return (
        <figure key={index}>
          <img
            src={data.file.url}
            alt={accessibility?.alt || 'Image'}
            style={{
              border: data.withBorder ? '1px solid #ccc' : 'none',
              width: data.stretched ? '100%' : 'auto',
              background: data.withBackground ? '#f5f5f5' : 'none',
            }}
          />
          {data.caption && <figcaption>{data.caption}</figcaption>}
        </figure>
      );
    }

    // Render lists (ordered or unordered) with accessibility attributes
    if (type === 'list') {
      const ListTag = data.style === 'ordered' ? 'ol' : 'ul';
      return (
        <ListTag key={index} role={accessibility?.role || 'list'}>
          {data.items.map((item, i) => (
            <li key={i} role={item.accessibility?.role || 'listitem'}>
              {item.content}
            </li>
          ))}
        </ListTag>
      );
    }

    // Default case: return null if the block type is unknown
    return null;
  });
};
