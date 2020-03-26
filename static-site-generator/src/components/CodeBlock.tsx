import PropTypes from 'prop-types';
import React from 'react';
import styles from './CodeBlock.module.scss';

export interface ICodeBlock {
  lang: 'c#'
    | 'javascript'
    | 'go'
    | 'perl'
    | 'node'
    | 'php'
    | 'ruby';
}

const CodeBlock: React.FC<ICodeBlock> = (props) => (
  <pre className={styles[props.lang]}>
    <code>
      {props.children}
    </code>
  </pre>
);

// CodeBlock.propTypes = {
//   type: PropTypes.oneOf(['primary', 'secondary', 'danger']),
// };

export default CodeBlock;
