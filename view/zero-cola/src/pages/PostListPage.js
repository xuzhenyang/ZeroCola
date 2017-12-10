import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Post(post) {
    return (
        <div>
            <Link to={"/posts/" + post.id}>
                <h2>{post.title}</h2>
            </Link>
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
        fetch('/api/v1/posts')
            .then(res => res.json())
            .then(res => this.setState({
                posts: res.data.data
            }));
    }

    render() {
        return (
            <div>
                <h1>PostListPage</h1>
                {PostList(this.state.posts)}
            </div>
        );
    }
}

export default PostListPage;