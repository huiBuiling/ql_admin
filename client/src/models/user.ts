import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import * as Serv from '@/services/user'

const namespace = 'user'
export const namespace_user = namespace

interface ModelState {
  name: string;
  tableData: any[];
}

interface ModelsType {
  namespace: typeof namespace;
  state: ModelState;
  reducers: {
    save: Reducer<ModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  effects: {
    query: Effect;
    findUserById: Effect;
    findAllUser: Effect;
    findUser: Effect;
    addUser: Effect;
    editUser: Effect;
    delUser: Effect;
  };
  subscriptions: { setup: Subscription };
}

const UserModels: ModelsType = {
  namespace,
  state: {
    name: 'shop',
    tableData: []
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    // 访问匹配路由即执行
    *query({ payload }, { call, put }) {
      yield put({
        type: 'findAllUser'
      })
    },

    // 查询全部用户
    *findAllUser({ payload }, {call, put}) {
      const data = yield call(Serv.findAllUser)
      // console.log(data.result)

      yield put({
        type: 'save',
        payload: {
          tableData: data.result
        }
      })
    },

    // 根据ID 查找用户
    *findUserById({ payload }, {call, put}) {
      const { searchVal } = payload
      const data = yield call(Serv.findUserById, { id: searchVal })
      // console.log(data.result)

      yield put({
        type: 'save',
        payload: {
          tableData: data.result
        }
      })
    },

    // 根据用户名查找用户
    *findUser({ payload }, {call, put}) {
      const { searchVal } = payload
      const data = yield call(Serv.findUser, { username: searchVal })
      console.log(data.result)

      yield put({
        type: 'save',
        payload: {
          tableData: data.result
        }
      })
    },

    // 添加用户
    *addUser({ payload }, {call, put}) {
      // 时间戳
      const timestamp = new Date().getTime()
      console.log(payload)
      yield call(Serv.addUser, { ...payload, create_time: timestamp})

      yield put({
        type: 'findAllUser'
      })
    },

    // 编辑用户
    *editUser({ payload }, {call, put}) {
      yield call(Serv.editUser, payload)

      yield put({
        type: 'findAllUser'
      })
    },

    // 删除用户
    *delUser({ payload }, {call, put}) {
      const data = yield call(Serv.delUser, { id: 123 })
      console.log(data)
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/shop/1/user') {
          dispatch({
            type: 'query',
          })
        }
      });
    }
  }
};

export default UserModels;