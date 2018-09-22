import React from 'react';
import './SignIn.css';

import Consumer from './../../../GlobalState.js'

class LoginModel extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      emailInput:'',
      passwordInput:'',
    }
  }

  render(){
    
    // let props = this.props;
    return (
      <Consumer>
        {(global) => (
          <div className='sign-in_wrapper' onClick={global.toggleSignInModel}>
            <div onClick={(e) => e.stopPropagation()} id="sign-in_content-wrapper">
              <div id="sign-in_x-out" onClick={global.toggleSignInModel}>x</div>
              <h2 id="sign-in_header">Sign In To Your Account!</h2>
              <form>
                <div style={{display:'block', width:'90%', margin:' 15px auto'}} className="form-group">
                  <small style={{fontSize:'12px', lineHeight:"18px", padding:"4px"}} id="emailHelp" className="form-text text-muted">E-mail:</small>
                  <input style={{padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} value={this.state.emailInput} onChange={(e) => this.setState({emailInput:e.target.value})} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter E-mail" />
                </div>
                <div style={{display:'block', width:'90%',  margin:' 15px auto'}} className="form-group">
                  <small style={{fontSize:'12px', lineHeight:"18px", padding:"4px"}} id="emailHelp" className="form-text text-muted">Password:</small>
                  <input style={{padding:'6px', fontSize:'20px', width:'95%', margin:'0 auto', display:'block'}} value={this.state.passwordInput} onChange={(e) => this.setState({passwordInput:e.target.value})} type="password" className="form-control" placeholder="Enter Password" />
                </div>
                <button 
                  type="submit" 
                  className="btn sign-in_log-in-button"
                  onClick={
                    (e) => {
                      e.preventDefault();
                      e.stopPropagation(); 
                      global.signIn({email:this.state.emailInput, password:this.state.passwordInput}); 
                      this.setState({emailInput:'', passwordInput:''});
                      global.toggleSignInModel()
                    }
                  }
                >
                  Log In
                </button>
                <small id="sign-in_forgot-password" className="form-text">Forgot Password?</small>
                <p style={{textAlign:'center', padding:'10px', color:'#777', fontWeight:'bold'}}>_____________ or _____________</p>
                <button  
                  className="btn sign-in_log-in-button"
                  onClick={(e) => {e.preventDefault(); e.stopPropagation(); global.toggleSignInModel(); global.toggleSignUpModel()}}
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        )}
      </Consumer>
    )
  }
}

export default LoginModel