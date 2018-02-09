import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Calendar from './Calendar';
import Spinner from './Spinner';

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
              <Calendar />
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