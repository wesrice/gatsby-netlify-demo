import React from 'react';
import Layout from './index';

const Preview: React.FC<any> = ({ entry, widgetFor }) => {
  const description = entry.getIn(['data', 'seo', 'description']);
  const keywords = entry.getIn(['data', 'seo', 'keywords'])?.toArray();
  const title = entry.getIn(['data', 'title']);

  return (
    <Layout
      isPreview={true}
      description={description}
      keywords={keywords}
      title={title}
    >
      {widgetFor('body')}
    </Layout>
  );
};

export default Preview;
