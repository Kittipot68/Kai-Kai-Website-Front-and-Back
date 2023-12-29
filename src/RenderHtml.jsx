import React from 'react';

function RenderHTML({ htmlContent }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

export default RenderHTML;
