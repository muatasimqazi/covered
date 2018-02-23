/* eslint-disable no-unused-vars */
//@ts-check
import React from 'react';
import { observer } from 'mobx-react';
import { dataStore } from '../DataStore'
import { Container, Row, Col } from 'react-grid-system'
import Hero from './Hero';
import Features from './Features';
import Spinner from './Spinner';
import PaperCard from './PaperCard';
import TableCard from './TableCard';
import NotificationMessages from './NotificationMessages';
import Dashboard from './Dashboards/Dashboard';

@observer
class HomePage extends React.Component {
  render() {
    return (
      <div>
        {
          dataStore.isBusy
            ?
            <Spinner size={80} style={{ top: 200 }} />
            :
            dataStore.isLoggedIn
              ?
              <div>
                <Container fluid>
                  <Dashboard />
                  <Row>
                    <Col sm={12}>
                      <PaperCard
                        slug="New Requests"
                        titl="Notifications">
                        <NotificationMessages />
                      </PaperCard>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6}>
                      <PaperCard
                        slug="Card Category"
                        title="Sample Card"
                      >
                        <TableCard showCheck={false} />
                      </PaperCard>
                    </Col>
                    <Col sm={6}>
                      <PaperCard
                        slug="Tables"
                        title="New Card"
                      >
                        <TableCard id={true} />
                      </PaperCard>
                    </Col>
                  </Row>
                </Container>
              </div>
              :
              <div>
                <Hero />
                <Features />
              </div>
        }
      </div>
    );
  }
}

export default HomePage;