import React, { Component } from 'react'

import './profilauser.css'
import NavBar from '../../components/navbar/NavBar';
import axios from 'axios'

import { Link } from 'react-router-dom';


class Profilauser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: '',
            photouser: [],
            datauser1: [],
            fotomodal: '',
            idfotomodal: '',
            Username: '',
            website: '',
            profil: [],
            idUser: '',
            idUserOrang: '',
            pencarian: [],
            Username2: '',
            Name: '',
            Bio: '',
            idUserFollowing2: '',
            Usernameorang: '',
            Photop: '',
            post_length: '',
            urlfoto: 'http://localhost:3010/photo/',
            idUserFollowing: '',
            datalikes: [],
            datalikes2: [],
            datafollowing: [],
            idfollowing: '',
            Post: false,
            folbut: 'Follow',
            datafollowing2: [],
            following_length: '',
            followers_length: '',
            like:false,
            follow:false

        };
        this.postlike = this.postlike.bind(this);
        this.deletelike = this.deletelike.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
    }


    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }


    getUser = () => {
        var token = localStorage.getItem('jwtToken')
        if (token === null) {
            this.props.history.push('/signPage')
        } else {
            var splitoken = JSON.parse(atob(token.split('.')[1]))
            var idbytoken = splitoken[0]
            this.setState({ idUser: idbytoken.idUser })
        }

    }


    klik() {
        this.setState({ Username: this.refs.search.value });
    }

    _handleKeyPress = (e) => {

        if (e.key === 'Enter') {
            console.log('haha')
            axios.get(`http://localhost:3010/userProfilPostPhoto/${this.state.Username}`).then((getData) => {
                console.log('getdata', getData.data[0].idUser);
                this.setState({
                    profil: getData.data,
                    idUserOrang: getData.data[0].idUser
                })
            })
        }

    }

    getid = (postuser, idPhoto) => {
        this.setState({
            idfotomodal: idPhoto,
            fotomodal: postuser
        })
        console.log(idPhoto)

        axios.get(`http://localhost:3010/getlikes2/${this.state.idUser}/${idPhoto}`).then((ambilData) => {
            console.log('datalikes2', ambilData)
            this.setState({
                datalikes2: ambilData.data,
            })
        })

    }


   


    componentWillMount() {
        console.log('didmount')
        this.getUser()

        axios.get(`http://localhost:3010/userProfilPostPhoto/${this.props.match.params.id}`).then((ambilData) => {
            console.log(ambilData)
            const adaData = ambilData.data && ambilData.data.length
            this.setState({
                pencarian: ambilData.data,
                Usernameorang: adaData ? ambilData.data[0].Username : '',
                idUserOrang: adaData ? ambilData.data[0].idUser : '',
                Bio: adaData ? ambilData.data[0].bio : '',
                Username2: adaData ? ambilData.data[0].Username : '',
                Name: adaData ? ambilData.data[0].Name : '',
                Photop: adaData ? ambilData.data[0].Photop : '',
                idUserOrang2: adaData ? ambilData.data[0].idUser : '',
                post_length: adaData ? ambilData.data.length : '',
                website: adaData ? ambilData.data[0].Website : '',

            })

        })

    }


    follow(a,b){
        axios.post('http://localhost:3010/postfollowing', {
            idUserOrang2: a,
            idUser: this.state.idUser
        }).then((result) => {
            this.setState({
                follow: true,
                folbut: 'Unfollow'
            })
            console.log('follow')
        })
    }

    unfollow(a,b){
        axios.delete(`http://localhost:3010/unfollow/${this.state.idUser}/${a}`, {
            idUser: this.state.idUser,
            idUserFollowing2: a
        }).then((result) => {
            this.setState({
                follow: false,
                folbut: 'Follow'
            })
            console.log('unfollow');
        })
    }

    postlike(a,b){
        axios.post('http://localhost:3010/postlike', {
            idUser: this.state.idUser,
            idPhoto: b,
        }).then((result) => {
            this.setState({
                like:true
            })
            console.log('like')
        })
    }

    deletelike(a,b) {
        axios.delete(`http://localhost:3010/unlike/${this.state.idUser}/${b}`, {
            idUser: this.state.idUser,
            idPhoto: b
        }).then((result) => {
            this.setState({
                like:false
            })
            console.log('delete');
        })
    }



    render() {



        const photoprofile = this.state.datauser1.map((item, i) => {
            let Photopro = 'http://localhost:3010/photo/' + item.Photop
            return <img className="rounded-circle img-fluid img-right " src={Photopro} alt="d"></img>
        })

        const profilebio = this.state.datauser1.map((item, i) => {
            let Username = item.Username
            return <li><h1 className="pad-but-h1">{Username}</h1></li>
        })


        const postphoto2 = this.state.pencarian.map((item, i) => {
            let idPhoto = item.idPhoto
            let postuser = 'http://localhost:3010/photo/' + item.PhotoName
            return <div className="col-lg-4 col-sm-6 portfolio-item mg-bot-card-photo" key={idPhoto}>
                <div className="card h-100">
                    <a href="#" data-toggle="modal" data-target="#bigfoto" onClick={() => this.getid(postuser, idPhoto)} ><img className="card-img-top size-img-post" src={postuser} alt="" /></a>
                </div>
            </div>

        })

        const userfoll = this.state.pencarian.map((item, i) => {
            let idPhoto = item.idPhoto
            let postuser = 'http://localhost:3010/photo/' + item.PhotoName
            return <li><button className="btn geser-atas-but-edit" onClick={this.follow}>Follow</button></li>
        })

        let likebutton = this.state.like ? <a className="modal-foto-icon-like"
            onClick={() => this.deletelike(this.state.fotomodal, this.state.idfotomodal)}>
            <i className="far fa-heart" ></i>
            </a> : <a className="modal-foto-icon-like"
            onClick={() => this.postlike(this.state.fotomodal, this.state.idfotomodal)}>
                <i className="far fa-heart" ></i>
            </a>

        let follow_button = this.state.follow ? <li><button className="btn btn-info geser-atas-but-edit" style={{color:"#000000"}} onClick={() => this.unfollow(this.state.idUserOrang2, this.state.idUser)}>unfollow</button></li> : 
        <li><button className="btn btn-info geser-atas-but-edit" style={{color:"#000000"}} onClick={() => this.follow(this.state.idUserOrang2, this.state.idUser)}>follow</button></li>

       

        return (
            <div>
                <NavBar />
                <div className=" row bawah-dikit-bang">
                    <div className="col-lg-4 img-right">
                        <img className="rounded-circle img-fluid img-right " src={this.state.urlfoto + this.state.Photop} alt="d"></img>
                    </div>
                    <div className="col-lg-6 pad-left infopr">
                        <ul className="pad-0">
                            <li><h1 className="pad-but-h1">{this.state.Username2}</h1></li>
                            {follow_button}
                            {/* <li><button className="btn  geser-atas-but-edit" onClick={() => this.follow(this.state.idUserOrang2, this.state.idUser)}>{this.state.folbut}</button></li> */}
                            {/* <li><a data-toggle="modal" data-target="#exampleModalCenterlog" className="icon-set icon-log"><i class="fas fa-cog"></i></a></li> */}
                            {/* <h1>{this.state.datalikes.length}</h1> */}
                        </ul>
                        <ul className="pad-0">
                            <li><a ><b>{this.state.post_length}</b>&nbsp;Post</a></li>
                            <li><a data-toggle="modal" data-target="#exampleModalFollowers"><b>{this.state.followers_length}</b>&nbsp;{this.state.website}</a></li>
                            {/* <li><a data-toggle="modal" data-target="#exampleModalFollowers"><b>{this.state.followers_length}</b>&nbsp;followers</a></li> */}
                            {/* <li><a ><b>{this.state.following_length}</b>&nbsp;following</a></li> */}
                        </ul>
                        <b>{this.state.Name}</b> {this.state.Bio}
                    </div>

                    <div className="container tab-photo">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">{this.state.post_length} Posts</a>
                            </li>
                            {/* <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Saved</a>
                            </li> */}
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="row card-photo-post">

                                    {postphoto2}

                                </div>

                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                        </div>
                    </div>

                    <div class="modal fade" id="exampleModalCenterlog" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div className="nav flex-column nav-pills center-a-modal" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <Link to="/signPage" className="log-out-st pad-modal active border-bot-a-modal" onClick={this.logout} >Log Out</Link>
                                        <a className="close pad-modal" data-dismiss="modal" aria-label="Close">Cancel</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="exampleModalFollowers" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered " role="document">
                            <div className="modal-content width-modal-fol">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Followers</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div class="modal-body">
                                    <div className="nav flex-column nav-pills height-modal-followers" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <a className="log-out-st pad-modal-follower active border-bot-a-modal-follower" >
                                            <img style={{ width: 50, height: 50 }} className="rounded-circle img-fluid  " src="http://placehold.it/200x200" alt=""></img>
                                        </a>
                                        <a className="close pad-modal" data-dismiss="modal" aria-label="Close">Cancel</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    {/* ------------------------------MODAL FOTO------------------------------ */}

                    <div className="modal fade " id="bigfoto" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered " role="document">
                            <div className="modal-content width-modal-fol">

                                <div class="modal-body">
                                    <div className="nav flex-column nav-pills height-modal-followers" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <a className="log-out-st pad-modal-follower active border-bot-a-modal-follower" >
                                            <img style={{ width: 1200, height: 700 }} className="img-fluid  " src={this.state.fotomodal} alt=""></img>
                                        </a>
                                        {likebutton}
                                        <h4></h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>




                </div>
            </div>

        )
    }
}

export default Profilauser;