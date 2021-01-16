// 书籍
const bookMenu = [
  {
    name: '书籍管理',
    path: '1',
    children: [
      {
        name: '排行榜',
        path: '',
      }
    ],
  },
  {
    name: '用户管理',
    path: '2',
    children: [
      {
        name: '用户列表',
        path: '',
      }
    ]
  },
];

// 商城
const shopMenu = [
  {
    name: '用户管理',
    path: '1',
    children: [
      {
        name: '用户管理',
        path: '/user',
      },
    ],
  },
  {
    name: '产品管理',
    path: '2',
    children: [
      {
        name: '产品管理',
        path: '/product',
      },
    ],
  },
  {
    name: '权限管理',
    path: '/auth'
  },
];

export { bookMenu, shopMenu };
