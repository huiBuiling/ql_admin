import React, { useState } from 'react';
import { Link, useLocation, useRouteMatch  } from 'umi';
import { Menu, Breadcrumb } from 'antd';
import { MailOutlined, HomeOutlined } from '@ant-design/icons';
import Header from '@/layouts/header';
import { bookMenu, shopMenu } from './menu';

const { SubMenu } = Menu;

interface menuType {
  name: string;
  path?: string;
  id?: string;
  children?: menuType[];
}

export default (props: any) => {
  // 当前模块路径
  const menuPath = useRouteMatch().path;

  // 当前模块菜单
  const menuData: menuType[] = selectedMenu()

  // 根据模块路径获取菜单
  function selectedMenu(): any {
    switch (menuPath) {
      case '/read':
        return bookMenu;
      default:
        return shopMenu;
    }
  }

  // SubMenu 展开/关闭的回调 cuOpenKeys: string[]
  function onOpenChange(cuOpenKeys: any): void {
    const latestOpenKey: string = cuOpenKeys.find((key: string) => openKeys.indexOf(key) === -1) || '';
    if (menuData.findIndex(item => item.path === latestOpenKey) === -1) {
      setOpenKeys(openKeys => openKeys);
    } else {
      setOpenKeys(
        openKeys => (openKeys = latestOpenKey ? [latestOpenKey] : []),
      );
    }
  }

  // 点击 MenuItem
  function itemChange({ key, keyPath }: any): void {
    setOpenKeys(openKeys => (openKeys = [keyPath[1] || keyPath[0]]));
    setSelectedKeys(selectedKeys => (selectedKeys = [key]));
  }

  const pathArr = useLocation().pathname.split('/')
  const [openKeys, setOpenKeys] = useState([pathArr[2] || '']);
  const [selectedKeys, setSelectedKeys] = useState([pathArr.length === 3 ? `/${pathArr[2]}` : `/${pathArr[3]}`]);

  // 面包屑数组
  let extraBreadcrumbItems: any[] = []
  function getCrumbData (data: any, isChildren?: boolean): void{
    // 刚进入，默认不选择任意项
    if(!openKeys[0]) return

    const curKeys = isChildren ? selectedKeys: openKeys
    // 获取当前对应管理模块
    const crumbData: any = data.find((item: any) => item.path === curKeys[0]) || {}
    if(crumbData && crumbData && crumbData.name) {
      const html = <Breadcrumb.Item href={crumbData.path} key={crumbData.path}>
        <span>{crumbData.name}</span>
      </Breadcrumb.Item>
      extraBreadcrumbItems.push(html)

      if(crumbData.children) {
        getCrumbData(crumbData.children, true)
      }
    }
  }
  getCrumbData(menuData)

  // 面包屑
  const breadcrumbItems = [
    <Breadcrumb.Item href="/home" key="/home">
      <HomeOutlined />
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);

  return (
    <div className="ql-layout">
      <Header />

      {/* menu */}
      <div className="qla-con">
        <div className="layout-l">
          <Menu
            mode="inline"
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={onOpenChange}
            onClick={itemChange}
          >
            {menuData.map(item => {
              if (item.children) {
                return (
                  <SubMenu
                    key={item.path}
                    title={
                      <span>
                        <MailOutlined />
                        <span>{item.name}</span>
                      </span>
                    }
                  >
                    {item.children.map(itemB => {
                      return (
                        <Menu.Item key={itemB.path}>
                          <Link to={`${props.route.path}/${item.path}${itemB.path}`}>
                            {itemB.name}
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              }

              return (
                <Menu.Item key={item.path}>
                  <Link to={`${props.route.path}${item.path}`}>
                    <MailOutlined /> {item.name}
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>

        {/* 渲染块 */}
        <div className="layout-r">
          {/* 顶部面包屑 */}
          <div className="layout-r-top">
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
          </div>

          {/* 组件渲染 */}
          <div className="layout-r-con">{props.children}</div>
        </div>
      </div>
    </div>
  );
};
