import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Icon, Button } from 'antd';
import styles from './LoginPage.css';
const FormItem = Form.Item;

const LoginPage = (props) => {

  const {
    dispatch,
    form: {
      getFieldDecorator,
      validateFields,
      resetFields
    }
  } = props;

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        dispatch({
          type: 'user/login',
          payload: { username, password }
        });
        resetFields();
      }
    });
  }

  return (
    <div className={styles.normal}>
      <Form onSubmit={handleSubmit} className={styles.login_form}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{
              required: true,
              message: 'Please input your username!'
            }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: 'Please input your Password!'
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
        </FormItem>
        <Button type="primary" htmlType="submit" className={styles.button}>
          Log in
          </Button>
      </Form>
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(Form.create({})(LoginPage));
