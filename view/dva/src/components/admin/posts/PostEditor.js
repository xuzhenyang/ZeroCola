import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Row, Col } from 'antd';
import Markdown from 'react-markdown-plus';
// import styles from './PostEditor.css';
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
    <div>
      <Form>
        <FormItem label="Titile">
          <Input />
        </FormItem>
        <Row gutter={32}>
          <Col span={12}>
            <Input type="textarea" onChange={editContent} rows={38} />
          </Col>
          <Col span={12}>
            <div style={{ overflowY: "scroll"}}>
              <Markdown text={posts.post.content} style={{ margin: '' , maxWidth: 700, maxHeight: 700 }} />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps)(PostEditor);
