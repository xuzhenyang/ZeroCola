import * as postService from '../services/posts';

export default {
  namespace: 'posts',
  state: {
    postList: []
  },
  reducers: {
    update(state, action) {
      const {postList} = action.payload;
      return { ...state, postList };
    },
  },
  effects: {
    *fetch({ payload: { page, pageSize } }, { call, put }) {
      const response = yield call(postService.fetch, { page, pageSize });
      const data = response.data.data.content;
      yield put({
        type: 'update',
        payload: {
          postList: data
        }
      });
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
