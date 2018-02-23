import React from 'react';
import { Link } from 'react-router-dom';
import PaperCard from './PaperCard';
import { Row, Col } from 'react-grid-system'
export default class Roster extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm={9}>
                        <PaperCard
                            slug={<Link to='/'>Home</Link>}
                            title="Roster"
                        >
                        </PaperCard>
                    </Col>
                    <Col sm={3}>
                        <PaperCard
                            slug={<Link to='/'>Home</Link>}
                            title="Roster"
                        >
                        </PaperCard>
                    </Col>
                </Row>
            </div >
        );
    }
}