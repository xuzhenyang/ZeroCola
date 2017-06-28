import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Row, Col } from 'antd';
import Markdown from 'react-markdown-plus';
import styles from './PostEditor.css';
const FormItem = Form.Item;

const PostEditor = Form.create()((props) => {

  const { form, dispatch, posts } = props;

  const { getFieldDecorator, getFieldsValue, validateFields } = form;

  function handleSubmit(e) {
    validateFields((err, values) => {
      if (!err) {
        const data = getFieldsValue();
        dispatch({
            type: 'posts/save',
            payload: { 
              post: data
             },
          });
      }
    });
  }

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
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Button type="primary" htmlType="submit">Submit</Button>
        <FormItem label="Titile">
          {getFieldDecorator('title', {
            rules: [{
              required: true,
              message: "please input title"
            }],
          })(
            <Input />
            )}
        </FormItem>
        <Row gutter={32}>
          <Col span={12}>
            {getFieldDecorator('content', {
              rules: [{
                required: true,
                message: "please input content"
              }],
            })(
              <Input type="textarea" onChange={editContent} rows={38} />
              )}
          </Col>
          <Col span={12}>
            <div style={{ overflowY: "scroll" }}>
              <Markdown text={posts.post ? posts.post.content : ''} style={{ margin: '', maxWidth: 700, maxHeight: 700 }} />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
})

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps)(PostEditor);
