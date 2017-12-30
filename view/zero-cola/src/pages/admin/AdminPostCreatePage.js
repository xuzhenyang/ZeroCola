import React, { Component } from 'react';
import AdminLayout from '../../components/AdminLayout';
import AdminPostEditor from '../../components/AdminPostEditor';
import { message } from 'antd';
import { request } from '../../common';
import { tokenKey } from '../../config';

class AdminPostCreatePage extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        const token = window.localStorage.getItem(tokenKey);
        request('/api/v1/admin/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${token}`
            },
            body: JSON.stringify(data)
        }).then((response) => {
            this.props.history.push('/admin/posts');
        }).catch((error) => {
            message.error('submit failed');
        });
    }

    render() {

        const editorProps = {
            handleSubmit: this.handleSubmit,
        }

        return (
            <div>
                <AdminLayout>
                    <h1>Admin Post Create Page</h1>
                    <AdminPostEditor {...editorProps} />
                </AdminLayout>
            </div>
        );
    }
}


export default AdminPostCreatePage;