import React from 'react';
import { Container, Row, Col } from 'react-grid-system'
import PaperCard from './PaperCard';
class SignUp extends React.Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col sm={9}>
              <PaperCard>
                <h1>Manager's Dashboard</h1>
                <h1>Manager's Dashboard</h1>
                <h1>Manager's Dashboard</h1>
                <h1>Manager's Dashboard</h1>
              </PaperCard>
            </Col>
            <Col sm={3}>
              <h4>Text</h4>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SignUp;