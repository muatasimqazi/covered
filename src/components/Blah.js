import React from 'react';
import covfefe from '../Covfefe';
import { observer } from 'mobx-react';

@observer
class Blah extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    covfefe.LogIn('lisa@leslie.com', 'covered');
    // app.database().ref('users').on('value', (snapshot, error) => {
    //   if (error) {
    //     console.log('Error:', error);
    //     return;
    //   }
    //   // const val = snapshot.val() || {};
    //   // const keys = Object.keys(val);
    //   // const users = [];
    //   // keys.forEach(key => {
    //   //   users.push(val[key]);
    //   //   console.log(val, key, val[key]);
    //   // });
    //   // console.log(users);
    //   // this.setState({ users });
    // });
  }
  
  render() {
    return (
      <div>
        <h1>User!</h1>
        {covfefe.isLoggedIn? 'Logged in' : 'Logged out'}
        {/* <ul>
          {this.state.users.map(user => 
            <li key={user.email}>{user.firstName} {user.lastName}</li>
          )}
        </ul> */}
      </div>
    );
  }
}

export default Blah;