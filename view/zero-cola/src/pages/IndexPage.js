import React, { Component } from 'react';
import logo from '../logo.svg';
import './IndexPage.css';
import { Link } from 'react-router-dom';

class IndexPage extends Component {
    render() {
        return (
            <div className={"IndexPage"}>
                <img className={"IndexPage-logo"} src={logo} />
                <p>blablabla...</p>
                <hr className={"IndexPage-separator"} />
                <ul className={"IndexPage-ul"}>
                    <li>
                        <Link to="/posts/1">
                            <h2>This is Title</h2>
                        </Link>
                        <p>2017-12-05</p>
                    </li>
                    <li>
                        <h2>This is Title</h2>
                        <p>2017-12-05</p>
                    </li>
                    <li>
                        <h2>This is Title</h2>
                        <p>2017-12-05</p>
                    </li>
                </ul>
                <Link to="/posts">
                    <button>More</button>
                </Link>
            </div>
        );
    }
}

export default IndexPage;