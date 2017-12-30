import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider } from 'antd';
import { request } from '../../common';
import { tokenKey } from '../../config';
import AdminLayout from '../../components/AdminLayout';

class AdminPostListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            pagination: {},
        };
        this.fetchPosts = this.fetchPosts.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    fetchPosts(page, pageSize) {
        page = page ? page : 1;
        pageSize = pageSize ? pageSize : 10;
        const token = window.localStorage.getItem(tokenKey);
        request(`/api/v1/admin/posts?page=${page}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: new Headers({
                "Authorization": `${token}`
            })
        })
            .then(data => this.setState({
                posts: data.data.data,
                pagination: {
                    current: data.data.pageIndex,
                    total: data.data.totalNumber,
                }
            }));
    }

    componentDidMount() {
        this.fetchPosts(1, 10);
    }

    handleTableChange(pagination, filters, sorter) {
        this.fetchPosts(pagination.current, pagination.pageSize);
    }

    render() {
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href={`/admin/posts/edit/${record.id}`}>Edit</a>
                    <Divider type="vertical" />
                    <a href="#">Close</a>
                </span>
            )
        }]

        return (
            <div>
                <AdminLayout>
                    <h1>AdminPostListPage</h1>
                    <Link to="/admin/posts/new">
                        <button>new</button>
                    </Link>
                    <Table columns={columns} dataSource={this.state.posts} pagination={this.state.pagination} onChange={this.handleTableChange} />
                </AdminLayout>
            </div>
        );
    }
}

export default AdminPostListPage;