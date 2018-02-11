import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { request, time2DateStr } from '../common';
import './PostListPage.css';

function Post(post) {
    return (
        <div>
            <div style={{ "display": "inline-block", width: "100%" }}>
                <span style={{ "float": "left", width: "30%" }}>
                    <span>{time2DateStr(post.createTime)}</span>
                </span>
                <span style={{ "float": "left", width: "70%" }}>
                    <Link to={"/posts/" + post.id}>
                        <h2>{post.title}</h2>
                    </Link>
                </span>
            </div>

        </div>
    );
}

function PostList(posts) {
    const postList = [];
    for (let index in posts) {
        postList.push(
            <li key={index}>
                {Post(posts[index])}
            </li>
        );
    }
    return (
        <ul>
            {postList}
        </ul>
    );
}

class PostListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        request('/api/v1/posts')
            .then(data => this.setState({
                posts: data.data.data
            }));
    }

    render() {
        return (
            <div className="list-main">
                <h1>Archive</h1>
                <div className="list-container">
                    {PostList(this.state.posts)}
                </div>
            </div>
        );
    }
}

export default PostListPage;