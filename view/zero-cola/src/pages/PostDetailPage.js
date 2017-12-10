import React, { Component } from 'react';

class PostDetailPage extends Component {
    render() {
        return(
            <div>
                <h1>PostDetailPage</h1>
                <p>id : {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default PostDetailPage;