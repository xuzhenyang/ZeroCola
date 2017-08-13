import React from 'react';
import { Button, Form, Input } from 'antd';
const FormItem = Form.Item;

const TagForm = Form.create()((props) => {

    const {
        onSubmit,
        form: {
            getFieldDecorator,
            getFieldsValue,
            validateFields,
            resetFields
        }
    } = props;

    function handleSubmit() {
        validateFields((err, values) => {
            if (!err) {
                const data = getFieldsValue();
                onSubmit(data);
                resetFields();
            }
        });
    }

    return (
        <div>
            <Form layout="inline">
                <FormItem>
                    {
                        getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: "请填写标签名"
                            }]
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <Button onClick={handleSubmit}>添加</Button>
            </Form>
        </div>
    );
})

export default TagForm;