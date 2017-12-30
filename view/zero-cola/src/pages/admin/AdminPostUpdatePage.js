import React, { Component } from 'react';
import AdminLayout from '../../components/AdminLayout';
import AdminPostEditor from '../../components/AdminPostEditor';
import { message } from 'antd';
import { request } from '../../common';
import { tokenKey } from '../../config';

class AdminPostUpdatePage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.fetchPost = this.fetchPost.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fetchPost() {
        const id = this.props.match.params.id;
        const token = window.localStorage.getItem(tokenKey);
        return request(`/api/v1/admin/posts/${id}`, {
            method: 'GET',
            headers: new Headers({
                "Authorization": `${token}`
            })
        })
            .then(data => this.setState({ post: data.data }));
    }

    handleSubmit(data) {
        const token = window.localStorage.getItem(tokenKey);
        const post = {
            ...this.state.post,
            title: data.title,
            tags: data.tags,
            content: data.content,
        }
        request(`/api/v1/admin/posts/${this.props.match.params.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${token}`
            },
            body: JSON.stringify(post)
        }).then((response) => {
            this.props.history.push('/admin/posts');
        }).catch((error) => {
            message.error('submit failed');
        });
    }

    componentDidMount() {
        this.fetchPost();
    }

    render() {
        const editorProps = {
            post: this.state.post,
            handleSubmit: this.handleSubmit,
        }

        return (
            <div>
                <AdminLayout>
                    <h1>Admin Post Update Page</h1>
                    <AdminPostEditor {...editorProps} />
                </AdminLayout>
            </div>
        );
    }
}


export default AdminPostUpdatePage;