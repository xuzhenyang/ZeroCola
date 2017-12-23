import React, { Component } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Form, Input, Button, Select, Tabs, message } from 'antd';
import marked3 from 'marked3';
import { request } from '../../common';
import { tokenKey } from '../../config';
const FormItem = Form.Item;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

class AdminPostCreatePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
        this.onContentChange = this.onContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onContentChange(e) {
        this.setState({
            content: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { validateFields, resetFields } = this.props.form;
        validateFields((errors, values) => {
            if (errors) {
                return;
            }
            const token = window.localStorage.getItem(tokenKey);
            const data = {
                title: values.title,
                tags: values.tags,
                content: values.content,
            };
            request('/api/v1/admin/posts', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${token}`
                },
                body: JSON.stringify(data)
            }).then((response) => {
                this.props.history.push('/admin/posts');
                resetFields();
            }).catch((error) => {
                message.error('submit failed');
            })
        });
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        }

        return (
            <div>
                <AdminLayout>
                    <h1>Admin Post Create Page</h1>
                    <Form>
                        <FormItem label="Title" {...formItemLayout}>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'please input title !' }]
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <FormItem label="Tags" {...formItemLayout}>
                            {getFieldDecorator('tags')(
                                <Select />
                            )}
                        </FormItem>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="edit" key="1">
                                <FormItem>
                                    {getFieldDecorator('content', {
                                        rules: [{ required: true, message: 'please input content !' }]
                                    })(
                                        <TextArea rows={20} onChange={this.onContentChange} />
                                    )}
                                </FormItem>
                            </TabPane>
                            <TabPane tab="preview" key="2">
                                <div style={{height: 420, overflowY: "scroll", marginBottom: 24, border: "1px solid #d9d9d9", borderRadius: 4 }} dangerouslySetInnerHTML={{ __html: marked3(this.state.content) }} />
                            </TabPane>
                        </Tabs>
                        <Button>Draft</Button>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </Form>
                </AdminLayout>
            </div>
        );
    }
}

AdminPostCreatePage = Form.create({})(AdminPostCreatePage);

export default AdminPostCreatePage;