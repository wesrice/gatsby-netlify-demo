import CMS from 'netlify-cms-app';
import { MdxControl, setupPreview } from 'netlify-cms-widget-mdx';
import React from 'react';
import * as collections from './collections';
import LayoutPreview from '@Site/components/MinimalLayout/Preview';
import * as components from '@Site/components';

const config = {
  collections: Object.values(collections),
  load_config_file: false,
  media_folder: 'content/uploads',
  media_folder_relative: true,
  public_folder: '/uploads',
};

// Important to remove your backend config and replace it in this setup
if (process.env.NODE_ENV === 'development') {
  config.backend = {
    branch: 'master',
    name: 'proxy',
    proxy_url: 'http://penguin.linux.test:3001/api/v1',
    repo: 'wesrice/gatsby-netlify-demo',
  };
  config.local_backend = {
    url: 'http://penguin.linux.test:3001/api/v1',
  };
} else {
  config.backend = {
    auth_endpoint: '/oauth/auth',
    base_url: 'https://us-central1-mm-playground.cloudfunctions.net',
    branch: 'master',
    name: 'github',
    repo: 'wesrice/gatsby-netlify-demo',
  };
  config.publish_mode = 'editorial_workflow';
}

CMS.registerWidget('mdx', MdxControl, setupPreview({
  components: {
    h1: ({ children, ...props }) => (
      <h1 style={{ color: 'tomato' }} {...props}>
        {children}
      </h1>
    ),
  },
  scope: components,
}));

CMS.registerPreviewTemplate(
  'pages',
  LayoutPreview,
);

CMS.registerPreviewStyle("/main.css");

CMS.init({ config });
