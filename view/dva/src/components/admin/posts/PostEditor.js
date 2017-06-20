import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input } from 'antd';
import Markdown from 'react-markdown-plus';
import styles from './PostEditor.css';
const FormItem = Form.Item;

function PostEditor({ dispatch, posts }) {

  function editContent(e) {
    dispatch({
      type: 'posts/updatePost',
      payload: {
        post: {
          content: e.target.value,
        },
      },
    });
  }

  return (
    <div className={styles.normal}>
      <Form>
        <FormItem label="Titile">
          <Input />
        </FormItem>
        <Input type="textarea" onChange={editContent} rows={30} />
        <Markdown text={posts.post.content} style={{ maxWidth: 1000 }} />
      </Form>
    </div>
  );
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps)(PostEditor);
