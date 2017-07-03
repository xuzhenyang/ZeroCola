import * as postService from '../services/posts';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'posts',
  state: {
    postList: [],
    post: {}
  },
  reducers: {
    updatePostList(state, action) {
      const {postList} = action.payload;
      return { ...state, postList };
    },
    updatePost(state, action) {
      const {post} = action.payload;
      return { ...state, post };
    },
  },
  effects: {
    *fetch({ payload: { page, pageSize } }, { call, put }) {
      const response = yield call(postService.fetch, { page, pageSize });
      const data = response.data.data.content;
      yield put({
        type: 'updatePostList',
        payload: {
          postList: data
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
