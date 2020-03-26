import classNames from 'classnames';
import React from 'react';
import Content from './Content';
import { IHead } from './Head';
import styles from './Layout.module.scss';

interface Layout {
  children: React.ReactNode;
  isPreview?: boolean;
}

const Link = (props: any) => (
  <a
    activeClassName={styles['navLink--active']}
    className={styles.navLink}
    {...props}
  />
);

const Layout: React.FC<Layout & IHead> = (props) => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>{props.title}</h1>

        {props.description && (
          <p className={styles.description}>{props.description}</p>
        )}

        {props.keywords && props.keywords.length > 0 && (
          <ul className={styles.keywords}>
          {props.keywords?.map((keyword: string, index: any) => (
            <li
              className={styles.keyword}
              key={`keyword-${index}`}
            >
              <code
                className={styles['keyword-code']}
              >
                {keyword}
              </code>
            </li>
          ))}
          </ul>
        )}

        <hr
          className={styles.divider}
        />

        <Content>
          {props.children}
        </Content>
      </main>
    </>
  );
};

Layout.propTypes = {
  // children: PropTypes.node.isRequired,
};

export default Layout;
