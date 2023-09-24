import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import Header from './components/Header';
import RecipeContainer from './components/RecipeContainer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './components/Contact';
import Profile from './components/Profile';
import LoginModal from './components/LoginModal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loginModalPreview: false,
      isDemoAccount: false,
      demoUser: {
        picture: 'https://place-hold.it/400x400&text=DEMO&bold&fontsize=20',
        nickname: 'Demo User',
        email: 'demo_user@email.com',
      },
    };
  }

  toggleLoginModal = () => {
    this.setState({
      loginModalPreview: !this.state.loginModalPreview,
    });
  };

  handleDemoAccount = () => {
    this.setState({
      isDemoAccount: !this.state.isDemoAccount,
      user: this.state.demoUser,
    });
  };

  handleDemoLogout = () => {
    this.setState({
      isDemoAccount: !this.state.isDemoAccount,
      user: '',
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <Header
            user={this.state.user}
            isDemoAccount={this.state.isDemoAccount}
            handleDemoAccount={this.handleDemoAccount}
            handleDemoLogout={this.handleDemoLogout}
            toggleLoginModal={this.toggleLoginModal}
          />
          <LoginModal
            handleDemoAccount={this.handleDemoAccount}
            loginModalPreview={this.state.loginModalPreview}
            toggleLoginModal={this.toggleLoginModal}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                isAuthenticated ? (
                  <RecipeContainer />
                ) : (
                  <h2 style={{ display: 'flex', justifyContent: 'center' }}>
                    {' '}
                    Please log in to view recipes{' '}
                  </h2>
                )
              }
            ></Route>
            <Route exact path="/Contact" element={<Contact />}></Route>
            <Route
              exact
              path="/Profile"
              element={isAuthenticated ? <Profile /> : null}
            ></Route>
          </Routes>
        </Router>
      </>
    );
  }
}

const namedComp = withAuth0(App);

export default namedComp;
