//@ts-check
/* eslint-disable no-unused-vars */
import React from 'react';
import PaperCard from '../PaperCard';
import RequestForm from '../RequestForm/RequestForm';
import Calendar from '../Calendar';
import { Row, Col } from 'react-grid-system';
import { observer } from 'mobx-react';
import NotificationMessages from '../NotificationMessages';

@observer
class Supervisor extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm={9}>
                        <PaperCard
                            slug="Manager Dashboard"
                            title="Today's Shifts"
                        >
                            <br />
                            <Calendar />
                        </PaperCard>
                    </Col>
                    <Col sm={3}>
                        <PaperCard>
                            <h4>Request a Change</h4>
                            <RequestForm />
                        </PaperCard>
                        <PaperCard
                            slug="New Requests"
                            titl="Notifications">
                            <NotificationMessages />
                        </PaperCard>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Supervisor;