import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Calendar from './Calendar';
import Spinner from './Spinner';
import PaperCard from './PaperCard';
import RequestForm from './RequestForm/RequestForm';
import { Container, Row, Col } from 'react-grid-system'
class HomePage extends React.Component {
  render() {
    const loading = this.props.loading;
    const authenticated = this.props.authenticated;
    return (
      <div>
        {
          loading
            ?
            <Spinner />
            :
            authenticated
              ?
              <div>
                <Container fluid>
                  <Row>
                    <Col sm={9}>
                      <PaperCard>
                        <Calendar />
                      </PaperCard>
                    </Col>
                    <Col sm={3}>
                      <PaperCard>
                        <h4>Request a Change</h4>
                        <RequestForm />
                      </PaperCard>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={9}>
                      <PaperCard>
                        <h4>Notifications</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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