import React, { Component } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Form, Input, Button, Select, Tabs } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

class AdminPostCreatePage extends Component {
    render() {

        const formItemLayout = {
            labelCol: { span: 1 },
            wrapperCol: { span: 8 }
        }

        return (
            <div>
                <AdminLayout>
                    <h1>Admin Post Create Page</h1>
                    <Form>
                        <FormItem label="Title" {...formItemLayout}>
                            <Input />
                        </FormItem>
                        <FormItem label="Tag" {...formItemLayout}>
                            <Select />
                        </FormItem>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="edit" key="1">
                                <FormItem>
                                    <TextArea rows={20} />
                                </FormItem>
                            </TabPane>
                            <TabPane tab="preview" key="2">
                                <TextArea readOnly={true} rows={20} />
                            </TabPane>
                        </Tabs>
                        <Button>Draft</Button>
                        <Button>Submit</Button>
                    </Form>
                </AdminLayout>
            </div>
        );
    }
}

AdminPostCreatePage = Form.create({})(AdminPostCreatePage);

export default AdminPostCreatePage;