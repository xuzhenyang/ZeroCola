import * as postService from '../services/posts';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'posts',
  state: {
    postPage: {},
    post: {}
  },
  reducers: {
    updatePostPage(state, action) {
      const { postPage } = action.payload;
      return { ...state, postPage };
    },
    updatePost(state, action) {
      const { post } = action.payload;
      return { ...state, post };
    },
  },
  effects: {
    *fetch({ payload: { page, pageSize } }, { call, put }) {
      const response = yield call(postService.fetch, { page, pageSize });
      const data = response.data.data;
      yield put({
        type: 'updatePostPage',
        payload: {
          postPage: data
        }
      });
    },
    *save({ payload: { post } }, { call, put }) {
      const response = yield call(postService.save, { ...post });
      yield put(routerRedux.push('/admin/posts'));
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/admin/posts') {
          dispatch({ type: 'fetch', payload: { page: 1, pageSize: 10 } });
        }
      });
    },
  },
};
