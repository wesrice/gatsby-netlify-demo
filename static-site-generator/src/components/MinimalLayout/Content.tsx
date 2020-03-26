import React from 'react';
import * as styles from './Content.module.scss';

const Content = ({ children }: any) => (
  <article className={styles.content}>
    {children}
  </article>
);

export default Content;
