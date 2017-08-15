import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Row, Col, Select } from 'antd';
import Remarkable from 'remarkable';
import styles from './PostEditor.css';
const FormItem = Form.Item;
const Option = Select.Option;

const PostEditor = Form.create()((props) => {

  const { form, post, tags, handleSubmit, handleContentChange } = props;

  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;

  const optionList = [];
  for (let index in tags) {
    optionList.push(<Option key={tags[index].id}>{tags[index].name}</Option>)
  }

  const defaultSelected = [];
  if (post) {
    for (let index in post.tags) {
      defaultSelected.push({
        key: post.tags[index].id,
        label: post.tags[index].name
      });
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const data = getFieldsValue();
        //tags转换
        const { tags } = data;
        let selectedTags = [];
        for (let index in tags) {
          selectedTags.push({
            id: tags[index].key,
            name: tags[index].label
          });
        }
        let result = data;
        result.tags = selectedTags;
        handleSubmit(result);
      }
    });
    resetFields();
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
        <FormItem label="Titile" style={{ maxWidth: "300" }}>
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
        <FormItem label="Tags" style={{ maxWidth: "300" }}>
          {getFieldDecorator('tags', {
            initialValue: defaultSelected,
          })(
            <Select labelInValue mode="multiple">
              {optionList}
            </Select>
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
              <div className={styles.render}>
                <p style={{ margin: '', maxWidth: 700, maxHeight: 700 }} dangerouslySetInnerHTML={{ __html: renderedContent }}>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
})

export default PostEditor;
