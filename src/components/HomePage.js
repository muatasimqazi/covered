import React from 'react';
import Hero from './Hero';
import Features from './Features';


class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Hero />
        <Features />
      </div>
    );
  }
}

export default HomePage;