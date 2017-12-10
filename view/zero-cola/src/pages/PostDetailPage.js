import React, { Component } from 'react';
import marked3 from 'marked3';

const source = "# hello";
const html = marked3(source);

class PostDetailPage extends Component {
    render() {
        return(
            <div>
                <h1>PostDetailPage</h1>
                <p>id : {this.props.match.params.id}</p>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        );
    }
}

export default PostDetailPage;