import * as userService from '../services/user';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'user',
  state: {
  },
  reducers: {
  },
  effects: {
    *login({ payload: { username, password } }, { call, put }) {
      const response = yield call(userService.login, { username, password });
      const data = response.data.data;
    },
    *logout({ payload }, { put }) {
      yield put(routerRedux.push('/login'));
    }
  },
  subscriptions: {},
};
