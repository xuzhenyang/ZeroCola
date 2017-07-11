import React from 'react';
import { connect } from 'dva';
import styles from './PostCreatePage.css';
import PostEditor from '../../components/admin/Posts/PostEditor';

const PostCreatePage = (props) => {

  const { dispatch, posts } = props;

  function handleSubmit(data) {
    dispatch({
      type: 'posts/save',
      payload: {
        post: data
      },
    });
  }

  function handleContentChange(value) {
    dispatch({
      type: 'posts/updatePost',
      payload: {
        post: {
          content: value,
        },
      },
    });
  }

  const editorProps = {
    post: posts.post,
    handleSubmit: handleSubmit,
    handleContentChange: handleContentChange,
  }

  return (
    <div className={styles.normal}>
      <PostEditor { ...editorProps } />
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(PostCreatePage);
