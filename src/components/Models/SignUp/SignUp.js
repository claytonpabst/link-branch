import React from 'react';
import './SignUp.css';

import axios from 'axios';

import Consumer from './../../../GlobalState.js'

class SignUpPopover extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      usernameInput: '',
      emailInput:'',
      passwordInput:'',
      confirmPasswordInput:'',
    }
  }

  comparePasswords = () => {
    if(this.state.passwordInput === this.state.confirmPasswordInput){
      return true;
    } else {
      return false;
    }
  }

  singUp = () => {
    if( !this.comparePasswords() ){
      window.alert('Passwords do not match.')
    } else if (this.state.usernameInput === '' || this.state.emailInput === '' || this.state.passwordInput === ''){
      window.alert('Please make sure the sign-up form is complete with valid entries.')
    } else {
      this.props.global.toggleSignUpModel();
      this.props.global.signUp({email:this.state.emailInput, username:this.state.usernameInput, password:this.state.passwordInput})
    }
  }

  checkIfUsernameIsAvailable = () => {
    axios.post('/api/checkIfUsernameIsAvailable', {username:this.state.usernameInput}).then(res => {
      if(!res.data.usernameAvailable){
        alert("Username is already in use.")
        this.setState({usernameInput:''})
      }
    }).catch(err => {
      console.log(err)
    })
  }

  setUsername = (e) => {
    let usernameInput = e.target.value.replace(/[^a-zA-Z0-9]/g,'_').toLowerCase()
    this.setState({
      usernameInput
    })
  }

  render(){
    const props = this.props;
    console.log(props)
    return (
      <div className='sign-in_wrapper' onClick={() => props.global.toggleSignUpModel()}>
        <div onClick={(e) => e.stopPropagation()} id="sign-in_content-wrapper">
          <div id="sign-in_x-out" onClick={() => props.global.toggleSignUpModel()}>x</div>
          <h2 id="sign-in_header">Get Started! It's Easy!</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{display:'block', width:'90%', margin:' 15px auto'}} className="form-group">
              {/* <label style={{margin:'5px'}} for="exampleInputEmail1">Username:</label> */}
              <small style={{fontSize:'12px', margin:'-5px auto 5px 5px'}} id="emailHelp" className="form-text text-muted">Choose a username.</small>
              <input onBlur={() => this.checkIfUsernameIsAvailable()} value={this.state.usernameInput} style={{padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} onChange={(e) => this.setUsername(e)} className="form-control" placeholder="Username" />
            </div>
            <div style={{display:'block', width:'90%', margin:' 15px auto'}} className="form-group">
              {/* <label style={{margin:'5px'}} for="exampleInputEmail1">E-mail address:</label> */}
              <small style={{fontSize:'12px', margin:'-5px auto 5px 5px'}} id="emailHelp" className="form-text text-muted">We'll never share your email.</small>
              <input value={this.state.emailInput} style={{padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} onChange={(e) => this.setState({emailInput:e.target.value})} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter E-mail" />
            </div>
            <div style={{display:'block', width:'90%',  margin:' 15px auto'}} className="form-group">
              {/* <label style={{margin:'5px'}} for="exampleInputPassword1">Password:</label> */}
              <small style={{fontSize:'12px', margin:'-5px auto 5px 5px'}} id="emailHelp" className="form-text">Choose a strong password.</small>
              <input value={this.state.passwordInput} style={{padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} onChange={(e) => this.setState({passwordInput:e.target.value})} type="password" className="form-control" placeholder="Choose Password" />
              <input value={this.state.confirmPasswordInput} style={{marginTop:'3px', padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} onChange={(e) => this.setState({confirmPasswordInput:e.target.value})} type="password" className="form-control" placeholder="Re-Enter Password" />
            </div>
            <button 
              type="submit" 
              className="btn sign-in_log-in-button"
              onClick={(e) => {
                e.stopPropagation(); 
                this.singUp();
              }}
            >
              Sign Up
            </button>
            <p style={{textAlign:'center', padding:'10px', color:'#777', fontWeight:'bold'}}>_____________ or _____________</p>
            <button 
              className="btn sign-in_log-in-button"
              onClick={(e) => {e.stopPropagation(); props.global.toggleSignUpModel(); props.global.toggleSignInModel()}}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default props => ( 
  <Consumer>
    {(global) => {
      return <SignUpPopover {...props} global={global} />
    }}
  </Consumer>
)