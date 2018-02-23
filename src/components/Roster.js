import React from 'react';
import { Link } from 'react-router-dom';

export default class Roster extends React.Component {
    render() {
        return (
            <div>
                <Link to='/'>Home</Link>
                <h1>Roster</h1>
            </div>
        );
    }
}