import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Calendar from './Calendar';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Hero />
        <Calendar />
        <Features />
      </div>
    );
  }
}

export default HomePage;