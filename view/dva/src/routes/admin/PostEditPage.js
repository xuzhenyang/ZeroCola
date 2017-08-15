import React from 'react';
import { connect } from 'dva';
import styles from './PostEditPage.css';
import PostEditor from '../../components/admin/Posts/PostEditor';

const PostEditPage = (props) => {

  const { dispatch, posts, tags } = props;

  function handleSubmit(data) {
    dispatch({
      type: 'posts/update',
      payload: {
        post: {
          ...posts.post,
          ...data,
        }
      },
    });
  }

  function handleContentChange(value) {
    dispatch({
      type: 'posts/updatePost',
      payload: {
        post: {
          //覆盖原post
          ...posts.post,
          content: value,
        },
      },
    });
  }

  const editorProps = {
    post: posts.post ? posts.post : null,
    tags: tags.tags,
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

export default connect(mapStateToProps)(PostEditPage);
