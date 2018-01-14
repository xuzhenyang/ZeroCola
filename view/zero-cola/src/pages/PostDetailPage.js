import React, { Component } from 'react';
import marked3 from 'marked3';
import hljs from 'highlight.js';
import '../rainbow.css';

function Post(post) {
    if (post && post.id) {
        return (
            <div>
                <h1>{post.title}</h1>
                <p>{post.createTime}</p>
                <div dangerouslySetInnerHTML={{
                    __html: marked3(post.content, {
                        highlight: (code => hljs.highlightAuto(code).value)
                    })
                }} />
            </div>
        );
    }
    return (
        <div>
            loading...
        </div>
    );
}

class PostDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {},
        };
    }

    componentDidMount() {
        const api = '/api/v1/posts/' + this.props.match.params.id;
        fetch(api)
            .then(res => res.json())
            .then(res => this.setState({
                post: res.data
            }));
    }

    render() {
        return (
            Post(this.state.post)
        );
    }
}

export default PostDetailPage;