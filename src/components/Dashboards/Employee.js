//@ts-check
import React from 'react';
import PaperCard from '../PaperCard';
import RequestForm from '../RequestForm/RequestForm';
import Calendar from '../Calendar';
import { Row, Col } from 'react-grid-system';
import { observer } from 'mobx-react';
import ColorKey from '../ColorKey';
import { dataStore } from '../../DataStore';

@observer
class Employee extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm={9}>
                        <PaperCard
                          slug={`${dataStore.currentUser.firstName} ${dataStore.currentUser.lastName}`}
                          title="Employee Calendar"
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
                            slug="Color Key"
                        >
                            <ColorKey />
                        </PaperCard>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Employee;