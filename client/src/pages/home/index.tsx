import React, { Component } from 'react';
import { Link } from 'umi';

import Header from '@/layouts/header';
import './index.less';
import { menuData } from './menuData';

type menuData = {
  id: number;
  name: string;
  path: string;
  type: string;
};

interface HomeTypes {
  menuData: menuData[];
}

class Home extends Component<{}, HomeTypes> {
  constructor(props: any) {
    super(props);

    this.state = {
      menuData,
    };
  }
  render() {
    return (
      <div className="ql-home">
        <Header />

        <div className="home-con">
          {this.state.menuData.map((item: menuData) => {
            const curImg = require(`./images/${item.type}.png`);
            return (
              <div className="hc-item" key={item.id}>
                <Link to={item.path}>
                  <img src={curImg} alt="" />
                  <p>{item.name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
