import classNames from 'classnames';
import React from 'react';
import { ICodeBlock } from './CodeBlock';
import styles from './CodeBlocks.module.scss';

interface ICodeBlocks {
  children: React.ReactElement<ICodeBlock>[];
}

const CodeBlocks: React.FC<ICodeBlocks> = (props) => {
  return (
    <div>
      <ul
        className={styles.list}
      >
        {props.children.map((child: any, index: number) => (
          <li
            className={classNames(
              styles.listItem,
              styles[child.props.lang],
            )}
            key={`lang-${index}`}
          >
            {child.props.lang}
          </li>
        ))}
      </ul>
      {props.children}
    </div>
  );
};

export default CodeBlocks;
