import React from 'react';
import styles from './index.less';
import { Button } from 'antd';

export default (props: any) => {
  return (
    <div>
      <h1 className={styles.title}>Page read</h1>
      <Button>你好</Button>
    </div>
  );
};
