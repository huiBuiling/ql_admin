import React from 'react';
import '../layout.less';
import { history } from 'umi';

/**
 * header
 */
export default () => {
  function goHome() {
    history.push('/');
  }

  const logo = require('../../static/logo.png');
  return (
    <div className="ql-header">
      <div className="qh-logo">
        <img src={logo} onClick={goHome} alt="" />
      </div>

      <div className="qh-opera">
        <div className="op-item">
          <i className="icon icon-help2"></i>
        </div>

        <div className="op-item">
          <i className="icon icon-msg2"></i>
        </div>

        <div className="op-item">
          <i className="icon icon-admin"></i>
        </div>
      </div>
    </div>
  );
};
