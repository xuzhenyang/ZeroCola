import * as tagService from '../services/tags';

export default {
  namespace: 'tags',
  state: {
    tags: {},
    tag: {}
  },
  reducers: {
    updateTags(state, action) {
      const { tags } = action.payload;
      return { ...state, tags };
    }
  },
  effects: {
    *getTags({ payload }, { call, put }) {
      const response = yield call(tagService.getTags);
      const data = response.data.data;
      yield put({
        type: 'updateTags',
        payload: {
          tags: data
        }
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname == '/admin/postCreate') {
          dispatch({ type: 'getTags' });
          return;
        }
      })
    }
  },
};
