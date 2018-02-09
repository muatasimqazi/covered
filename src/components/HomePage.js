import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Calendar from './Calendar';
import Spinner from './Spinner';
import PaperCard from './PaperCard';
import { Container, Row, Col } from 'react-grid-system'

class HomePage extends React.Component {
  render() {
    const loading = this.props.loading;
    const authenticated = true;//this.props.authenticated;
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
                <br /><br /><br /><br />
                <Container fluid>
                  <Row>
                    <Col sm={9}>
                      <PaperCard>
                        <Calendar />
                      </PaperCard>
                    </Col>
                    <Col sm={3}>
                      <PaperCard>
                        <h4>This is a smaple card</h4>
                        <p>tesxt</p>
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