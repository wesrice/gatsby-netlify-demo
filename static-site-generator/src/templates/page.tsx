import { graphql, Link } from 'gatsby';
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

export default (props: any) => {
  const { seo, title } = props.pageContext.frontmatter;

  return (
    <Page
      description={seo?.description}
      keywords={seo?.keywords}
      title={title}
    >
      {props.children}
    </Page>
  );
};
