import React, { Component } from 'react'

import gbr1 from './../../assets/img/gambar2.jpg'
import './sign-page.css'

import axios from 'axios'
import swal from 'sweetalert';

import { Link } from 'react-router-dom';

export class SignPage extends Component {

    constructor() {
        super();
        this.state = { username: '',password:'', name:'log in'}
    }

    inputlogin() {
        console.log(this.state.username)
        this.setState({
            username: this.refs.username.value,
            password: this.refs.password.value,            
        });
    }

    checklogin() {
        axios.post('http://localhost:3010/login', {
            username: this.state.username,
            password: this.state.password            
        }).then((result) => {
            console.log(result);
            localStorage.setItem('jwtToken', result.data.token);
            this.props.history.push('/');
            // window.location.reload()
        }).catch(err =>{
            if (err.response.status === 401){
                this.props.history.push('/signPage');
            }
        })

    }

    render() { 
    return (
        <div className="row centerRow">

            {/* <div className="col-lg-6 geser-kanan">
                <img className="img-fluid rounded mb-4" src={gbr1} alt=""></img>
            </div> */}
                {/* {this.state} */}
            <div className="col-lg-6">
                <div className="col-lg-6 mb-6 card-hover">
                    <div className="card h-100 card-hover" style={{background:"#2a2a2a"}}>
                        <div className="card-body card-body-font">

                        
                                <h2 className="form-signin-heading" style={{color:"#fafafa"}}>pupuPuwup</h2>
                                <label htmlFor="inputEmail" className="sr-only">username</label>
                                <input type="text" className="form-control bg-input-sign" 
                                placeholder="Username" 
                                name="username" required 
                                onInput={() => { this.inputlogin(); }}                                
                                ref="username"
                                />
                                <label htmlFor="inputPassword" className="sr-only ">Password</label>
                                <input type="password" className="form-control bg-input-sign" 
                                placeholder="Password" 
                                name="password"  required 
                                onInput={() => { this.inputlogin(); }}                                
                                ref="password"                                
                                />
                                <button className="btn btn-lg btn-primary btn-block btn-signIn"
                                onClick={() => { this.checklogin(); }}                                 
                                type="submit">Sign in</button>  
                  

                            {/* <div className="omni-auth">
                                <p className="or">OR</p>
                                <div className="bti">
                                    <button className="btn btn-lg btn-primary btn-block btn-signIn" type="submit">Log in with Facebook</button>                                  
                                </div>
                            </div> */}
                        </div>                         
                    </div>
                </div>

                <div className="col-lg-6 margin-sign">
                    {/* <div className="card h-100 card-hover"> */}
                        <div className="card-body center-signUp">
                            <p className="mg-bot-1" style={{color:"#fafafa"}}>Don't have an account? <Link to="/signUpPage">Sign up</Link></p>
                        </div>
                    {/* </div> */}
                </div>

            </div>
        </div>
    )
  }
}

export default SignPage;
