

import React, { Component } from 'react';

import { Link, Route } from 'react-router-dom';
import axios from 'axios';

import SignPage from './components/signIn/sign-page';
import SignUpPage from './components/signUp/signUp-page';
import NavBar from './components/navbar/NavBar';
import Profile from './components/profile/profile';
import EditProfile from './components/editProfile/editProfile';
import MainPage from './components/mainPage/mainPage';
import Profilauser from './components/profilauser/profilauser';


class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     navBackground1: 'navbar heightnav nav-bg fixed-top navbar-expand - lg navbar-light border-bottom ',
  //     navBackground2: 'navbar heightnav2 nav-bg fixed-top navbar-expand - lg navbar-light border-bottom ',
  //     h1style1: 'brandH1',
  //     h1style2: 'brandH12',
  //     inputstyle1: "tengahin-dikit-bang-input",
  //     inputstyle2: "tengahin-dikit-bang-input2",
  //     Username: '',
  //     profil: [],
  //     idUser: '',
  //     datauser: [],
  //     isTop: true,
  //     coba1: 'haha'
  //   };
  // }

  // componentWillMount() {
  //   console.log('ini will')
  //   this.getUser()
  // }

  // getUser = () => {
  //   var x = localStorage.getItem('jwtToken')
  //   var m = JSON.parse(atob(x.split('.')[1]))
  //   var z = m[0]
  //   this.setState({ idUser: z.idUser })
  // }


  // componentDidMount() {
  //   document.addEventListener('scroll', () => {
  //     const isTop = window.scrollY < 100;
  //     if (isTop !== this.state.isTop) {
  //       this.setState({ isTop, })
  //     }
  //   });
  // }

  // klik() {
  //   this.setState({ Username: this.refs.search.value });
  // }

  // componentDidMount() {
  //   axios.get(`http://localhost:3010/userprofil/${this.state.idUser}`).then((getData) => {
  //     console.log(getData);
  //     this.setState({
  //       datauser: getData.data
  //     })
  //   })

  // }

  // postid() {
  //   var dataku = this.state.datauser
  //   if (dataku.length === 0) {
  //     axios.post('http://localhost:3010/userprofil2', {
  //       idUser: this.state.idUser
  //     }).then((result) => {
  //       console.log(result);
  //       window.location.reload()
  //     })
  //   }

  // }

  // _handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     console.log('haha')
  //     axios.get(`http://localhost:3010/userProfilPostPhoto/${this.state.Username}`).then((getData) => {
  //       console.log(getData);
  //       this.setState({
  //         profil: getData.data
  //       })
  //     })

  //     // this.props.history.push('/profilauser');
  //     window.location.href = '/profilauser'
  //     console.log('do validate');
  //     // console.log(this.state.cari)
  //   }
  // }
  render() {
    return (
      <div>
       
        {/* <nav className={this.state.navBackground1}>
          <div className="container">
            <Link to="/" className="nav-link cart" href="#">
              <i class="fab fa-instagram inst-logo"></i>
            </Link>
            <a className="navbar-brand geser-dikit-bang" href="index.html"><h1 className={this.state.h1style1}>Indogram</h1></a>
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

            </div>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown gedein-icon-dikit-bang">
                  <a href="#Store" className="nav-link cart" href="#">
                    <i class="far fa-compass"></i>
                  </a>
                </li>

                <li className="nav-item dropdown  gedein-icon-dikit-bang" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <a href="#Store" className="nav-link cart" href="#">
                    <i class="far fa-heart"></i>
                  </a>
                </li>

                <div class="dropdown-menu sizedrop" aria-labelledby="dropdownMenuLink">
                  <div className="nav flex-column " >
                    <a className="log-out-st pad-modal-follower active border-bot-a-modal-follower" >
                      <img style={{ width: 50, height: 50 }} className="rounded-circle img-fluid  " src="http://placehold.it/200x200" alt=""></img>
                    </a>
                    <a className="close pad-modal" data-dismiss="modal" aria-label="Close">Cancel</a>
                  </div>
                </div>

                <li className="nav-item dropdown gedein-icon-dikit-bang">
                  <Link to="/profile" className="nav-link cart" href="#" onClick={() => { this.postid(); }} >
                    <i class="far fa-user"></i>
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </nav> */}


        {/* <Route exact path='/' component={MainPage} />
        <Route path='/signUpPage' component={SignUpPage} />
        <Route path='/signPage' component={SignPage} />
        <Route path='/navigasi' component={Navigasi} />
        <Route path='/profile' component={Profile} />
        <Route path='/editProfile' component={EditProfile} />
        <Route path='/profilauser' component={Profilauser} /> */}
      </div>
    )
  }
}

export default App;

