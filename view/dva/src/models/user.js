import * as userService from '../services/user';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { tokenKey } from '../utils/config';

export default {
  namespace: 'user',
  state: {
  },
  reducers: {
  },
  effects: {
    *checkAuth({ payload, onComplete }, { put }) {
      const token = window.localStorage.getItem(tokenKey);
      if (token) {
        onComplete();
      }
      else {
        yield put({ type: 'relogin' });
      }
    },
    *login({ payload: { username, password } }, { call, put }) {
      const response = yield call(userService.login, { username, password });
      const token = response.data.token;
      window.localStorage.setItem(tokenKey, token);
      yield put(routerRedux.push('/admin'));
    },
    *logout({ payload }, { put }) {
      window.localStorage.removeItem(tokenKey);
      yield put(routerRedux.push('/'));
    },
    *relogin({ payload }, { put }) {
      yield put(routerRedux.push('/login'));
    },
  },
  subscriptions: {},
};
