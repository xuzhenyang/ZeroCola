import * as tagService from '../services/tags';
import { routerRedux } from 'dva/router';

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
    *save({ payload }, { call, put }) {
      const tag = payload;
      const response = yield call(tagService.save, tag);
      if (response.data) {
        yield put(routerRedux.push('/admin/tags'));
      }

    },
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
    *deleteTags({ payload }, { call, put }) {
      console.log(payload);
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname == '/admin/tags') {
          dispatch({ type: 'getTags' });
          return;
        }
      })
    }
  },
};
