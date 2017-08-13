import React from 'react';
import { connect } from 'dva';
import styles from './Tags.css';
import TagComponent from '../../components/admin/Tags/Tags';
import TagForm from '../../components/admin/Tags/TagForm';

function Tags({ dispatch, tags }) {

  const formOpts = {
    onSubmit: (data) => {
      dispatch({
        type: 'tags/save',
        payload: data
      });
    }
  }

  const tableOpts = {
    tags: tags.tags.length > 0 ? tags.tags : [],
    dispatch
  }

  return (
    <div className={styles.normal}>
      <TagForm {...formOpts} />
      <TagComponent {...tableOpts} />
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(Tags);
