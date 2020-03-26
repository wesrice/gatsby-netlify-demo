import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import Page from '../components/MinimalLayout';

export const query = graphql`
  query MDXQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        seo {
          description
          keywords
        }
      }
    }
  }
`;

export default ({ data }: any) => {
  // tslint:disable-next-line: variable-name
  const { frontmatter, body } = data.mdx;
  const { seo, title } = frontmatter;

  return (

    <Page
      description={seo?.description}
      keywords={seo?.keywords}
      title={title}
    >
      <MDXRenderer>
        {body}
      </MDXRenderer>
    </Page>
  );
};
