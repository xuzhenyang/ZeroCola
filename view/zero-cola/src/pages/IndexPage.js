import React, { Component } from 'react';
import logo from '../logo.png';
import './IndexPage.css';
import { Link } from 'react-router-dom';
import { request, time2DateStr } from '../common';

function Post(post) {
    return (
        <div style={{"margin": 20}}>
            <Link to={"/posts/" + post.id}>
                <h2 style={{"margin": 10}}>{post.title}</h2>
            </Link>
            <p>{time2DateStr(post.createTime)}</p>
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
        <ul className={"IndexPage-ul"}>
            {postList}
        </ul>
    );
}

class IndexPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        request('/api/v1/posts?page=1&pageSize=3').then(response => this.setState({
            posts: response.data.data
        }));
    }

    render() {
        return (
            <div className={"IndexPage"}>
                <img className={"IndexPage-logo"} src={logo} />
                <p>blablabla...</p>
                <hr className={"IndexPage-separator"} />
                {PostList(this.state.posts)}
                <Link to="/posts">
                    <a>More</a>
                </Link>
            </div>
        );
    }
}

export default IndexPage;