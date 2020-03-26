import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';

export interface IHead {
  description?: string;
  keywords?: string[];
  meta?: any[];
  title: string;
}

interface IData {
  site: {
    siteMetadata: {
      author: string;
      description: string;
      keywords: [];
      meta: [];
      title: string;
    },
  };
}

interface IHeadData extends IHead {
  data: IData;
}

const Helmet: React.FC<IHeadData> = ({
  data,
  description,
  keywords = [],
  meta = [],
  title,
}) => {
  const { siteMetadata } = data.site;
  const metaDescription = description || siteMetadata.description;

  const compiledMeta = [
    {
      content: metaDescription,
      name: `description`,
    },
    {
      content: title,
      property: `og:title`,
    },
    {
      content: metaDescription,
      property: `og:description`,
    },
    {
      content: `website`,
      property: `og:type`,
    },
    {
      content: `summary`,
      name: `twitter:card`,
    },
    {
      content: siteMetadata.author,
      name: `twitter:creator`,
    },
    {
      content: title,
      name: `twitter:title`,
    },
    {
      content: metaDescription,
      name: `twitter:description`,
    },
  ]
    .concat(
      keywords.length > 0
        ? {
            content: keywords.join(`, `),
            name: `keywords`,
          }
        : []
    )
    .concat(meta);

  return (
    <ReactHelmet
      base={{ href: '/' }}
      meta={compiledMeta}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
    />
  );
};

const query = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;

const Head = (props: IHead) => {
  const render = (data: IData) => <Helmet data={data} {...props} />;
  return (
    <StaticQuery query={query} render={render} />
  );
};

Head.defaultProps = {
  keywords: [],
  lang: `en`,
  meta: [],
};

Head.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default Head;
