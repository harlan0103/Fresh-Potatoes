import '../../static/style.css';
import banner from '../../static/gallery_banner.jpg';
import React from 'react';
import { connect } from 'react-redux';
import { createAccount, loginUser, logOut } from '../../actions';
import Cookies from 'universal-cookie';
import GalleryList from './GalleryList';

class Gallery extends React.Component {

  state = {
    btn: null,
    username: null,
    password: null
  };

  componentDidMount() {
    const cookies = new Cookies();
    // If we have username stored in cookie
    if(cookies.get('username')) {
      this.props.loginUser(cookies.get('username'), cookies.get('password'));
    }
  }

  // Logout current user
  onLogout = () => {
    this.props.logOut();
  }

  checkUserStatus = () => {
    // When user is create a new username or log in
    if(this.props.auth.isSignedIn === true) {
      return (
        <div>
          <div className="user-form ui segment">
            <p>Hi There! { this.props.auth.userId }</p>
            <button className="ui negative button" onClick={this.onLogout}>LOGOUT</button>
          </div>
          <div className="ui segment">
            <GalleryList username={ this.props.auth.userId }/>
          </div>
        </div>
      );
    }
    else{
      return (
        <div>
          <div className="user-form ui segment">
            {this.showErrorMessage()}
            {this.renderLoginForm()}
          </div>
        </div>
      );
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.username === null || this.state.password === null) {
      alert('Please enter your username and password');
    }
    else{
      if(this.state.btn==="login"){
        // This will check username and password and get return from database
        this.props.loginUser(this.state.username, this.state.password);
      }
      else{
        // This is the create username and password logic
        this.props.createAccount(this.state.username, this.state.password);
      }
    }
  }

  // Set clicked button as Login
  loginSubmit = () => {
    this.setState({ btn: 'login' });
  }

  // Set clicked button as Signup
  signupSubmit = () => {
    this.setState({ btn: 'signup' });
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password:  event.target.value });
  }

  showErrorMessage = () => {
    // If failed to login or signup show error message
    if(this.props.auth.isSignedIn === false) {
      return (
        <div className="ui error message">
          <div className="header">
          An error occured!
          </div>
          <p>{this.props.auth.message}</p>
        </div>
      );
    }
  }

  renderLoginForm = () => {
    return(
      <div>
        <form className="ui form" name="form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>Username</label>
            <input type="text" placeholder="Username" onChange={this.onUsernameChange} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={this.onPasswordChange} />
          </div>
          <button className="ui primary button" onClick={this.loginSubmit}>Login</button>
          <button className="ui green button" onClick={this.signupSubmit}>Signup</button>
        </form>
      </div>
    );
  }

  render() {
    return(
      <div>
        <img className="ui image" alt="boxoffice_banner" src={banner} />
        <div><br/></div>
        {this.checkUserStatus()}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { createAccount, loginUser, logOut })(Gallery);
