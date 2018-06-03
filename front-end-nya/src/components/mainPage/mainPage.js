
import React, { PureComponent } from 'react';
import classes from './mainPage.css';
import Cockpit from '../../components/Cockpit/Cokcpit'
import NavBar from '../../components/navbar/NavBar';

import axios from 'axios'

class MainContent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            idUser: '',
            data: [],
            coba10:''
        };
    }
    
    togglePersonsHandler = (idPhoto) => {
        // let coba10 = idPhoto
        // const doesShow = this.state.like;
        this.setState({ coba10:idPhoto });
        console.log('ini',this.state.coba10)
    }

    

    componentWillMount() {
        console.log('ini will')
        this.getUser()
    }

    componentDidMount() {
        // axios.get(`http://localhost:3010/homePhoto/${this.state.idUser}`).then((getData) => {
        //     console.log(getData);
        //     this.setState({
        //         data: getData.data
        //     })
        // })
        axios.get(`http://localhost:3010/homePhoto2/${this.state.idUser}`).then((getData) => {
            console.log(getData);
            this.setState({
                data: getData.data
            })
        })
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

    render() {
        let className = 'card-body font like-post1';
        let idUser1 = this.state.idUser
        // if (!this.state.like && idUser1 ) {   
        //     className += ' like-post2';
        // }
      
        // let like_tasya = this.state.like ? <p>tidak bisa</p> : <p>bisa</p>

        var tkn = localStorage.getItem('jwtToken');
        console.log(tkn)

        const cardPhoto = this.state.data.map((item, index) => {
            let idUser = item.idUser;
            let idPhoto = item.idPhoto;
            let PhotoName = 'http://localhost:3010/photo/'+item.PhotoName;
            let Caption = item.Caption;
            let Username = item.Username;
            return  <div className="card card-size mg-bot-card-home" style={{background:"#404040"}}>
                        <div className="card-header bg-ch" style={{background:"#404040"}}>
                            <p className="p-bg-ch" style={{color:"#f2f2f2"}}>{Username}</p>
                        </div>
                            <img className="card-img-top size-photo" src={PhotoName} alt="Card image cap" />
                        <div className={className}>

                        <a className="" 
                        onClick={() => this.togglePersonsHandler(idPhoto)}>
                            <i className="far fa-heart" style={{color:"#f2f2f2"}}></i>
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a className="" 
                        onClick={() => (idPhoto)}>
                            <i className="far fa-comment" style={{color:"#f2f2f2"}} ></i>
                        </a>
                        </div>
                    </div>
        })


        return (
            <div >
                <NavBar />
                <div className="container ep-mg-top mid-big-card " >
                    {cardPhoto}
                </div>
            </div>
        );
    }
}

export default MainContent;
