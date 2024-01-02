import React from 'react';

const TruncatedText = ({ text, maxLength }) => {
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <p className={`short-desc`}>
      {truncatedText}
    </p>
  );
};

export default TruncatedText;
