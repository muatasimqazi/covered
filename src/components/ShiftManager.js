import React from 'react';
import { Link } from 'react-router-dom';
import PaperCard from './PaperCard';
import { Row, Col } from 'react-grid-system'
export default class ShiftManager extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm={9}>
                        <PaperCard
                            slug={<Link to='/'>Return to home</Link>}
                            title="Quick Add Shifts"
                        >
                        </PaperCard>
                    </Col>
                    <Col sm={3}>
                        <PaperCard
                            slug={<Link to='/'>Home</Link>}
                            title="Shifts?"
                        >
                        </PaperCard>
                    </Col>
                </Row>
                <Row>
                    <Col cm={12}>
                        <PaperCard
                            title="Words"
                        >
                        </PaperCard>
                    </Col>
                </Row>
            </div >
        );
    }
}