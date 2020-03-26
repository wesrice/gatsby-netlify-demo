import { graphql, StaticQuery } from 'gatsby';
import React, { useEffect, useState } from 'react';

import Page from '../components/MinimalLayout';

const query = graphql`
  query FeaturesQuery {
    site {
      siteMetadata {
        cmsUrl
        siteUrl
      }
    }
  }
`;

const FeaturesPage = () => {
  const render = (data: any) => {
    const { cmsUrl, siteUrl } = data.site.siteMetadata;
    const [headers, setHeaders] = useState([] as string[]);

    useEffect(() => {
      const req = new XMLHttpRequest();
      req.open('GET', window.location.href, false);
      req.send(null);
      setHeaders(req.getAllResponseHeaders().trim().split('\r\n'));
    }, []);

    return (
      <Page
        description={'Below is a list of features of this architecture.'}
        title="Features"
      >
        <h2>GatsbyJS</h2>
        <ul>
          <li>Generates CSP Policies</li>
          <li>Generates Integrity</li>
          <li>Live-reload local development</li>
        </ul>

        <h2>Netlify</h2>
        <ul>
          <li>CMS for markdown files</li>
          <li>Live-preview</li>
          <li>Created content results in a Pull Request</li>
        </ul>

        <h2>Firebase</h2>
        <ul>
          <li>Hosts static websites via GCP Cloud Storage
            <ul>
              <li><a href={siteUrl} target="_blank">Demo Site</a></li>
              <li><a href={cmsUrl} target="_blank">CMS</a></li>
            </ul>
          </li>
          <li>Handles redirects (demo -
            <a
              href={`${siteUrl}/go-to-non-existent-page`}
              target="_blank"
            >
              Go to non-existent page
            </a>)
          </li>
          <li>Sets security headers
            <ul>
              {headers.map((header, index: number) => (
                <li key={`header-${index}`}>{header}</li>
              ))}
            </ul>
          </li>
          <li>Cloud Functions support</li>
        </ul>
      </Page>
    );
  };

  return (
    <StaticQuery query={query} render={render} />
  );
};

export default FeaturesPage;
