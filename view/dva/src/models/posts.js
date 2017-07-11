import * as postService from '../services/posts';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';

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
    *get({ payload: { id } }, { call, put }) {
      const response = yield call(postService.getPostById, { id });
      const data = response.data.data;
      yield put({
        type: 'updatePost',
        payload: {
          post: data
        }
      });
    },
    *save({ payload: { post } }, { call, put }) {
      const response = yield call(postService.save, { ...post });
      yield put(routerRedux.push('/admin/posts'));
    },
    *update({ payload: { post } }, { call, put }) {
      const response = yield call(postService.update, { ...post });
      yield put(routerRedux.push('/admin/posts'));
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        //文章列表页
        if (pathname === '/admin/posts') {
          dispatch({ type: 'fetch', payload: { page: 1, pageSize: 10 } });
        }
        //文章修改页
        const match = pathToRegexp('/admin/postEdit/:postId').exec(pathname)
        if (match) {
          const postId = match[1];
          dispatch({ type: 'get', payload: { id: postId }});
        }
      });
    },
  },
};
