import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import SignUp from './components/SignUp.js';
import Employee from './components/Employee.js';
import Manager from './components/Manager.js';
import registerServiceWorker from './registerServiceWorker';

class Blah extends React.Component {
    // checkLoggedIn(nextState, replace) {
    //     if (!loginStore.isLoggedIn) {
    //         replace({
    //             pathname: '/'
    //         });
    //     }
    // }
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/employee" component={Employee}/>
                        <Route path="/manager" component={Manager}/>
                        <Route path="/" component={App}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(<Blah />, document.getElementById('root'));
registerServiceWorker();
