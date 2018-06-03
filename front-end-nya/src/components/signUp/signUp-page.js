import React, { Component } from 'react'

import gbr1 from './../../assets/img/gambar3.jpg'
import './signUp-page.css'
import axios from 'axios'
import swal from 'sweetalert';

import { Link } from 'react-router-dom';


export class SignPage extends Component {

    constructor() {
        super();
        this.state = { username: '', fullname: '', email: '', password: '' }
    }

    input() {
        console.log(this.state.username)
        this.setState({
            username: this.refs.username.value,
            fullname: this.refs.fullname.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
        });
    }

    save() {
        axios.post('http://localhost:3010/register', {
            username: this.state.username,
            fullname: this.state.fullname,
            email: this.state.email,
            password: this.state.password
        }).then((result) => {
            console.log(result);
            swal('Selamat akun anda sudah terdaftar, silahkan login')
            this.props.history.push('/signPage');            
            // window.location.reload()
        }) 
       
    }

    render() {
        return (
        <div >            
            <div className="row centerRow-signUp ">
                {/* <div className="col-lg-6 geser-kanan">
                    <img style={{width:300}} className="img-fluid rounded mb-4" src={gbr1} alt=""></img>
                </div> */}
                <div className="col-lg-6" >
                    <div className="col-lg-6 mb-6 card-hover" >
                        <div className="card h-100 card-hover" style={{background:"#2a2a2a"}}>
                            <div className="card-body card-body-font" >
                                <h2 className="form-signin-heading" style={{color:"#fafafa"}}>pupuPuwup</h2>
                                {/* <div className="center-p">
                                    <p className="p-see">Sign up to see photos and videos from your friends.</p>
                                </div>
                                <div className="bti">
                                    <button className="btn btn-lg btn-primary btn-block btn-signIn" type="submit">Log in with Facebook</button>
                                </div>
                                <div className="omni-auth">
                                    <p className="or">OR</p>
                                </div> */}

                                {/* <form className="form-signin" > */}
                                <div className="form-reg-mgbot">
                                    <label htmlFor="inputEmail" className="sr-only">username</label>
                                        <input 
                                        type="text" ref="username" 
                                        className="form-control bg-input-sign" 
                                        placeholder="Username" name="username" 
                                        onInput={() => { this.input(); }}
                                        required />
                                    <label htmlFor="inputPassword" className="sr-only">Fullname</label>
                                        <input type="text" ref="fullname" 
                                        className="form-control bg-input-sign" 
                                        placeholder="Fullname" name="fullname" 
                                        onInput={() => { this.input(); }}
                                        required />
                                    <label htmlFor="inputPassword" className="sr-only">Email</label>
                                        <input type="text" ref="email" 
                                        className="form-control bg-input-sign" 
                                        placeholder="Email" name="email" 
                                        onInput={() => { this.input(); }}
                                        required />
                                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                                        <input type="password" ref="password" 
                                        className="form-control bg-input-sign" 
                                        placeholder="Password" name="password" 
                                        onInput={() => { this.input(); }}
                                        required />
                                    <button className="btn btn-lg btn-primary btn-block btn-signIn" 
                                    onClick={() => { this.save(); }}
                                    type="submit" >Sign Up</button>
                                {/* </form> */}
                                </div>
                                
                                {/* <div className="center-p">
                                    <p className="p-policy">By signing up, you agree to our Terms, Data Policy and Cookies Policy.</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 margin-sign">
                        {/* <div className="card h-100 card-hover"> */}
                            <div className="card-body center-signUp">
                                <p className="mg-bot-1" style={{color:"#fafafa"}}>Have an account?<Link to="/signPage"> Log in</Link></p>
                            </div>
                        {/* </div> */}
                    </div>

                </div>

                </div>
            </div>
        )
    }
}

export default SignPage;
