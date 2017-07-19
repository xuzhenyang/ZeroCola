import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Row, Col } from 'antd';
import Remarkable from 'remarkable';
import styles from './PostEditor.css';
const FormItem = Form.Item;

const PostEditor = Form.create()((props) => {

  const { form, post, handleSubmit, handleContentChange } = props;

  const { getFieldDecorator, getFieldsValue, validateFields } = form;

  function onSubmit(e) {
    validateFields((err, values) => {
      if (!err) {
        const data = getFieldsValue();
        handleSubmit(data);
      }
    });
  }

  function editContent(e) {
    handleContentChange(e.target.value);
  }

  var renderedContent = (new Remarkable({
    highlight: function (/*str, lang*/) { return ''; }
  })).render(post ? post.content : '');

  return (
    <div className={styles.normal}>
      <Form layout="horizontal" onSubmit={onSubmit}>
        <Button type="primary" htmlType="submit">Submit</Button>
        <FormItem label="Titile">
          {getFieldDecorator('title', {
            initialValue: post ? post.title : '',
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
              initialValue: post ? post.content : '',
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
              <p style={{ margin: '', maxWidth: 700, maxHeight: 700 }} dangerouslySetInnerHTML={{ __html: renderedContent }}>
              </p>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
})

export default PostEditor;
