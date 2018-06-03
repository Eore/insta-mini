import React, { Component } from 'react'
import './NavBar.css';

import { Link } from 'react-router-dom';
import axios from 'axios';

// import Coba from '../profilauser/c';
var _ = require('lodash');

// import 'semantic-ui/dist/semantic.min.css'

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBackground1: 'navbar heightnav nav-bg fixed-top navbar-expand - lg navbar-light border-bottom ',
            navBackground2: 'navbar heightnav2 nav-bg fixed-top navbar-expand - lg navbar-light border-bottom ',
            h1style1: 'brandH1',
            h1style2: 'brandH12',
            inputstyle1: "tengahin-dikit-bang-input",
            inputstyle2: "tengahin-dikit-bang-input2",
            Username: '',
            profil: [],
            idUser: '',
            datauser: [],
            isTop: true,
        };
    }

    componentWillMount() {
        console.log('ini will')
        this.getUser()
    }

    getUser = () => {
        var x = localStorage.getItem('jwtToken')
        if (x===null) {
            this.props.history.push('/signPage')
        } else {
            var m = JSON.parse(atob(x.split('.')[1]))
            var z = m[0]
            this.setState({ idUser: z.idUser })
        }
    }


    componentDidMount() {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 100;
            if (isTop !== this.state.isTop) {
                this.setState({ isTop, })
            }
        });
    }

    klik() {
        this.setState({ Username: this.refs.search.value });
    }

    componentDidMount() {
        axios.get(`http://localhost:3010/userprofil/${this.state.idUser}`).then((getData) => {
            console.log(getData);
            this.setState({
                datauser: getData.data
            })
        })

    }


    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('haha')
            axios.get(`http://localhost:3010/userProfilPostPhoto/${this.state.Username}`).then((getData) => {
                console.log(getData);
                this.setState({
                    profil: getData.data
                })
            })

            window.location.href = `/Pencarian/${this.state.Username}`
            console.log('do validate');
        }
    }



    render() {
        const coba = this.state.datauser.map((item,i)=>{
            let nama = item.Username
            return <h1>{nama}</h1>
        })

        return (
            <div>
            <nav className={this.state.navBackground1} style={{background:'#2a2a2a'}}>
                <div className="container">
                    {/* <Link to="/" className="nav-link cart" href="#">
                        <i class="fab fa-instagram inst-logo"></i>
                    </Link> */}
                    <a className="navbar-brand geser-dikit-bang" ><h1 className={this.state.h1style1} style={{color:'#ffffff', fontFamily:'chalkduster'}}>pupuPuwup</h1></a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={this.state.inputstyle1}>

                        <input type="text"
                            className='form-control bg-input'
                            placeholder="Search"
                            ref="search"
                            onInput={() => { this.klik() }}
                            onKeyPress={this._handleKeyPress}
                        />
                        
                            {/* <Link to ={`/Pencarian/${this.state.Username}`}>
                                <button className="btn btn-danger" style={{ width: 40 }}>
                                <i className="fas fa-search"></i>
                            </button>
                            </Link> */}
                    </div>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item dropdown gedein-icon-dikit-bang">
                                <a href="#Store" className="nav-link cart" href="#">
                                <Link to="/" className="" href="#">                
                                    <i className="fas fa-home" style={{color:"#fafafa"}}></i>
                                </Link>
                                </a>
                            </li>

                            <li className="nav-item dropdown gedein-icon-dikit-bang" >
                                <Link to="/profile" className="nav-link cart" href="#" onClick={() => { this.postid(); }} >
                                    <i class="fas fa-user" style={{color:"#fafafa"}}></i>
                                </Link>
                            </li>

                            {/* <div class="dropdown-menu sizedrop" aria-labelledby="dropdownMenuLink">
                                <div className="nav flex-column " >
                                    <a className="log-out-st pad-modal-follower active border-bot-a-modal-follower" >
                                        <img style={{ width: 50, height: 50 }} className="rounded-circle img-fluid  " src="http://placehold.it/200x200" alt=""></img>
                                    </a>
                                    <a className="close pad-modal" data-dismiss="modal" aria-label="Close">Cancel</a>
                                </div>
                            </div> */}

                            <li className="nav-item dropdown gedein-icon-dikit-bang" >
                                <Link to="/signPage" className="nav-link cart" href="#" onClick={() => { this.postid(); }} >
                                    <i class="fas fa-sign-out-alt" style={{color:"#fafafa"}}></i>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            </div>
        )
    }
}

export default NavBar;
