import React, { Component } from 'react';
import Layout from './components/Layout/Layout.jsx';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
