import React, { Component } from 'react';
import logo from '../logo.svg';
import './IndexPage.css';

class IndexPage extends Component {
    render() {
        return (
            <div className={"IndexPage"}>
                <img className={"IndexPage-logo"} src={logo} />
                <p>blablabla...</p>
                <hr className={"IndexPage-separator"} />
                <ul className={"IndexPage-ul"}>
                    <li>
                        <h2>This is Title</h2>
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
                <button>More</button>
            </div>
        );
    }
}

export default IndexPage;