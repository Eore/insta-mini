import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import SignPage from './components/signIn/sign-page';
import SignUpPage from './components/signUp/signUp-page';
// import Navigasi from './components/Navigasi/navigasi';
import NavBar from './components/navbar/NavBar';
import Profile from './components/profile/profile';
import EditProfile from './components/editProfile/editProfile';
import MainPage from './components/mainPage/mainPage';
import Profilauser from './components/profilauser/profilauser';


ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={MainPage} />
            <Route path='/app' component={App} />            
            <Route path='/signUpPage' component={SignUpPage} />
            <Route path='/signPage' component={SignPage} />
            <Route path='/navbar' component={NavBar} />
            <Route path='/profile' component={Profile} />
            <Route path='/editProfile' component={EditProfile} />
            <Route path='/mainPage' component={MainPage} />
            <Route path='/Pencarian/:id' component={Profilauser} />  
            {/* <Route path='/Pencarian/:id/:idUserOrang' component={Profilauser} />    */}
             
            {/* <Route path='/profilauser' component={Profilauser} />     */}
             
        </div>
    </Router>, document.getElementById('root')
);
registerServiceWorker();

