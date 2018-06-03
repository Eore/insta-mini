import React, { Component } from 'react'

import './profile.css'
import NavBar from '../../components/navbar/NavBar';
import axios from 'axios'
import swal from 'sweetalert'

import { Link } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: '',
            photouser: [],
            datauser1: [],
            fotomodal: '',
            idfotomodal: '',
            following_length:'',
            follower_length:'',
            photo_length:''
        };
    }

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }

    componentWillMount() {
        console.log('ini will')
        this.getUser()
    }

    getUser = () => {
        var x = localStorage.getItem('jwtToken')
        if (x === null) {
            this.props.history.push('/signPage')
        } else {
            var m = JSON.parse(atob(x.split('.')[1]))
            var z = m[0]
            this.setState({ idUser: z.idUser })
        }
    }


    componentDidMount() {
        axios.get(`http://localhost:3010/userprofilorang/${this.state.idUser}`).then((getData) => {
            // console.log(this.state.datauser1);
            this.setState({
                datauser1: getData.data,
            })
        }).then(
            axios.get(`http://localhost:3010/photouser/${this.state.idUser}`).then((getData) => {
                this.setState({
                    photouser: getData.data,
                })
            })
        )
    }

    componentDidMount() {
        axios.get(`http://localhost:3010/userprofilorang/${this.state.idUser}`).then((getData) => {
            // console.log(this.state.datauser1);
            this.setState({
                datauser1: getData.data,
            })
        }).then(
            axios.get(`http://localhost:3010/photouser/${this.state.idUser}`).then((getData) => {
                const adaData = getData.data && getData.data.length            
                this.setState({
                    photouser: adaData ? getData.data:[],
                    photo_length:adaData ? getData.data.length:'0'
                })
            })
        ).then(
            axios.get(`http://localhost:3010/getallfollowing/following/${this.state.idUser}`).then((ambilData) => {
                console.log('datafoll', ambilData)
                const adaData = ambilData.data && ambilData.data.length
                this.setState({
                    // datafollowing2: ambilData.data,
                    following_length: adaData ? ambilData.data.length : '0',
                    // idfollowing:  ambilData.data[0].idfollowing2     
                })
            })
        ).then(
            axios.get(`http://localhost:3010/getallfollowing/followers/${this.state.idUser}`).then((ambilData) => {
                console.log('datafoll', ambilData)
                const adaData = ambilData.data && ambilData.data.length
                this.setState({
                    // datafollowing3: ambilData.data,
                    follower_length: adaData ? ambilData.data.length : '0',
                    // idfollowing:  ambilData.data[0].idfollowing2     
                })
            })
        )
    }

    getid = (postuser, idPhoto) => {
        let fotomodal1 = postuser
        this.setState({
            idfotomodal: idPhoto,
            fotomodal: postuser
        })
        console.log(this.state.fotomodal)
    }


    deletephoto(a, b) {

        swal({
            title: "Are You Sure !",
            // text: "yowes lah",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // const data = new FormData();
                    // data.append('idimage', idimage);


                    axios.delete(`http://localhost:3010/removefoto/${b}`, {
                        idPhoto: b
                    }).then((result) => {
                        console.log(result);
                        alert('Foto Berhasil Dihapus')
                    })

                    // fetch(`http://localhost:1000/image/${idimage}`, {
                    //     method: 'DELETE',
                    //     body: data,
                    // })
                    window.location.reload()
                    swal("Poof! Your data has been DELETED!", {
                        icon: "success",
                    });
                } else {
                    swal("Your data is safe!");
                }
            });




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

        const profilebio2 = this.state.datauser1.map((item, i) => {
            let Name = item.Name
            let Bio = item.Bio
            return <p>{Bio}</p>
        })

        const postphoto = this.state.photouser.map((item, i) => {
            let idPhoto = item.idPhoto
            // console.log(idPhoto)
            let postuser = 'http://localhost:3010/photo/' + item.PhotoName
            return <div className="col-lg-4 col-sm-6 portfolio-item mg-bot-card-photo" key={idPhoto}>
                <div className="card h-100">
                    <a href="#" data-toggle="modal" data-target="#bigfoto" onClick={() => this.getid(postuser, idPhoto)} ><img className="card-img-top size-img-post" src={postuser} alt="" /></a>
                </div>

            </div>



        })
        console.log(this.state.datauser1)

        return (
            <div>
                <NavBar />
                <div className=" row bawah-dikit-bang">
                    <div className="col-lg-4 img-right">
                        {photoprofile}
                        {/* <img className="rounded-circle img-fluid img-right " src="http://placehold.it/200x200" alt=""></img>*/}
                    </div>
                    {/* {profilebio} */}
                    <div className="col-lg-6 pad-left infopr">
                        <ul className="pad-0">
                            <li style={{ color: "#fafafa" }}>{profilebio}</li>
                            {/* <li><h1 className="pad-but-h1">{this.state.coba}</h1></li> */}
                            <li><Link to="/editProfile"><button className="btn btn-primary geser-atas-but-edit" style={{color:"#000000"}}>Edit Profile</button></Link></li>
                            {/* <li><a data-toggle="modal" data-target="#exampleModalCenterlog" className="icon-set icon-log"><i class="fas fa-cog"></i></a></li> */}
                        </ul>
                        {/* <ul className="pad-0">
                            <li><a href=""><b></b>&nbsp;post</a></li>
                            <li><a data-toggle="modal" data-target="#exampleModalFollowers"><b></b>&nbsp;followers</a></li>
                            <li><a href=""><b></b>&nbsp;following</a></li>
                        </ul> */}
                       <ul className="pad-0" style={{color:"#fafafa"}}>
                        {/* <li><a><b>{this.state.photo_length}</b>&nbsp;post</a></li> */}
                        <li><a><b>{this.state.follower_length}</b>&nbsp;Followers</a></li>
                        <li><a><b>{this.state.following_length}</b>&nbsp;Following</a></li>
                       </ul>
                        
                        <div style={{ color: "#fafafa" }}>
                            {profilebio2}
                        </div>
                        {/* <p><b>Latihan</b> Latihan membuat tampilan instagram dengan menggunakan html,css dan jquery hanya pada efek navigasi ketika di scroll. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, nulla!</p> */}
                    </div>

                    <div className="container tab-photo">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Posts</a>
                            </li>
                            {/* <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Saved</a>
                            </li> */}
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="row card-photo-post">

                                    {postphoto}
                                    {/* <div className="col-lg-4 col-sm-6 portfolio-item">
                                        <div className="card h-100">
                                                <a href="#"><img className="card-img-top" src="http://placehold.it/700x800" alt="" /></a>
                                        </div>
                                    </div> */}


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

                    <div className="modal fade " id="bigfoto" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered " role="document">
                            <div className="modal-content width-modal-fol">

                                <div class="modal-body">
                                    <div className="nav flex-column nav-pills height-modal-followers" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <a className="log-out-st pad-modal-follower active border-bot-a-modal-follower" >
                                            <img style={{ width: 1200, height: 700 }} className="img-fluid  " src={this.state.fotomodal} alt=""></img>
                                        </a>

                                        <a className="modal-foto-icon-like"
                                            onClick={() => this.deletephoto(this.state.fotomodal, this.state.idfotomodal)
                                            }>
                                            {/* <i class="fas fa-trash-alt"></i> */}
                                            <p style={{cursor:"pointer"}}>&nbsp;&nbsp;&nbsp;delete</p>
                                        </a>

                                        {/* <a className="close pad-modal" data-dismiss="modal" aria-label="Close">Cancel</a> */}
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

export default Profile;





// class Profile extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             idUser: '',
//             photouser: [],
//             datauser1: [],
//             fotomodal: ''
//         };
//     }
//     logout = () => {
//         localStorage.removeItem('jwtToken');
//         window.location.reload();
//     }

//     componentWillMount() {
//         console.log('ini will')
//         this.getUser()
//     }

//     getUser = () => {
//         var x = localStorage.getItem('jwtToken')
//         if (x===null) {
//             this.props.history.push('/signPage')
//         } else {
//             var m = JSON.parse(atob(x.split('.')[1]))
//             var z = m[0]
//             this.setState({ idUser: z.idUser })
//         }
//     }


//     componentDidMount() {
//         axios.get(`http://localhost:3010/userprofilorang/${this.state.idUser}`).then((getData) => {
//             // console.log(this.state.datauser1);
//             this.setState({
//                 datauser1: getData.data,
//             })
//         }).then(
//             axios.get(`http://localhost:3010/photouser/${this.state.idUser}`).then((getData) => {
//                 this.setState({
//                     photouser: getData.data,
//                 })
//             })
//         )

//     }

//     getid = (postuser, idPhoto) => {
//         let fotomodal1 = postuser
//         this.setState({
//             fotomodal: postuser
//         })
//         console.log(this.state.fotomodal)
//     }


//     render() {
//         const photoprofile = this.state.datauser1.map((item, i) => {
//             let Photopro = 'http://localhost:3010/photo/' + item.Photop
//             return <img className="rounded-circle img-fluid img-right " src={Photopro} alt="d"></img>
//         })

//         const profilebio = this.state.datauser1.map((item, i) => {
//             let Username = item.Username
//             return <li><h1 className="pad-but-h1">{Username}</h1></li>
//         })

//         const profilebio2 = this.state.datauser1.map((item, i) => {
//             let Name = item.Name
//             let Bio = item.Bio
//             return <p> <b>{Name}</b> {Bio}</p>
//         })

//         const postphoto = this.state.photouser.map((item, i) => {
//             let idPhoto = item.idPhoto
//             // console.log(idPhoto)
//             let postuser = 'http://localhost:3010/photo/' + item.PhotoName
//             return <div className="col-lg-4 col-sm-6 portfolio-item mg-bot-card-photo" key={idPhoto}>
//                 <div className="card h-100">
//                     <a href="#" data-toggle="modal" data-target="#bigfoto" onClick={() => this.getid(postuser, idPhoto)} ><img className="card-img-top size-img-post" src={postuser} alt="" /></a>
//                 </div>

//             </div>



//         })
//         console.log(this.state.datauser1)

//         return (
//             <div>
//                 <NavBar />
//                 <div className=" row bawah-dikit-bang">
//                     <div className="col-lg-4 img-right">
//                         {photoprofile}
//                         {/* <img className="rounded-circle img-fluid img-right " src="http://placehold.it/200x200" alt=""></img>*/}
//                     </div>
//                     {/* {profilebio} */}
//                     <div className="col-lg-6 pad-left infopr">
//                         <ul className="pad-0">
//                             <li style={{ color: "#fafafa" }}>{profilebio}</li>
//                             {/* <li><h1 className="pad-but-h1">{this.state.coba}</h1></li> */}
//                             <li><Link to="/editProfile">Edit Profile</Link></li>
//                             {/* <li><a data-toggle="modal" data-target="#exampleModalCenterlog" className="icon-set icon-log"><i class="fas fa-cog"></i></a></li> */}
//                         </ul>
//                         {/* <ul className="pad-0">
//                         <li><a href=""><b>327</b>&nbsp;post</a></li>
//                         <li><a data-toggle="modal" data-target="#exampleModalFollowers"><b>127</b>&nbsp;followers</a></li>
//                         <li><a href=""><b>427</b>&nbsp;following</a></li>
//                     </ul> */}
                        // <div style={{ color: "#fafafa" }}>
                        //     {profilebio2}
                        // </div>
//                         {/* <p><b>Latihan</b> Latihan membuat tampilan instagram dengan menggunakan html,css dan jquery hanya pada efek navigasi ketika di scroll. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, nulla!</p> */}
//                     </div>

//                     <div className="container tab-photo">
//                         <ul class="nav nav-tabs" id="myTab" role="tablist">
//                             <li class="nav-item">
//                                 <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Posts</a>
//                             </li>
//                             {/* <li class="nav-item">
//                                 <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Saved</a>
//                             </li> */}
//                         </ul>
//                         <div class="tab-content" id="myTabContent">
//                             <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

//                                 <div className="row card-photo-post">

//                                     {postphoto}
//                                     {/* <div className="col-lg-4 col-sm-6 portfolio-item">
//                                         <div className="card h-100">
//                                                 <a href="#"><img className="card-img-top" src="http://placehold.it/700x800" alt="" /></a>
//                                         </div>
//                                     </div> */}


//                                 </div>

//                             </div>
//                             <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
//                             <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
//                         </div>
//                     </div>

//                     <div class="modal fade" id="exampleModalCenterlog" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//                         <div class="modal-dialog modal-dialog-centered" role="document">
//                             <div class="modal-content">
//                                 <div class="modal-body">
//                                     <div className="nav flex-column nav-pills center-a-modal" id="v-pills-tab" role="tablist" aria-orientation="vertical">
//                                         <Link to="/signPage" className="log-out-st pad-modal active border-bot-a-modal" onClick={this.logout} >Log Out</Link>
//                                         <a className="close pad-modal" data-dismiss="modal" aria-label="Close">Cancel</a>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>

//                     <div className="modal fade" id="exampleModalFollowers" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//                         <div className="modal-dialog modal-dialog-centered " role="document">
//                             <div className="modal-content width-modal-fol">
//                                 <div className="modal-header">
//                                     <h5 className="modal-title" id="exampleModalCenterTitle">Followers</h5>
//                                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                                         <span aria-hidden="true">&times;</span>
//                                     </button>
//                                 </div>

//                                 <div class="modal-body">
//                                     <div className="nav flex-column nav-pills height-modal-followers" id="v-pills-tab" role="tablist" aria-orientation="vertical">
//                                         <a className="log-out-st pad-modal-follower active border-bot-a-modal-follower" >
//                                             <img style={{ width: 50, height: 50 }} className="rounded-circle img-fluid  " src="http://placehold.it/200x200" alt=""></img>
//                                         </a>
//                                         <a className="close pad-modal" data-dismiss="modal" aria-label="Close">Cancel</a>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>

//                     <div className="modal fade " id="bigfoto" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//                         <div className="modal-dialog modal-lg modal-dialog-centered " role="document">
//                             <div className="modal-content width-modal-fol">

//                                 <div class="modal-body">
//                                     <div className="nav flex-column nav-pills height-modal-followers" id="v-pills-tab" role="tablist" aria-orientation="vertical">
//                                         <a className="log-out-st pad-modal-follower active border-bot-a-modal-follower" >
//                                             <img style={{ width: 1200, height: 700 }} className="img-fluid  " src={this.state.fotomodal} alt=""></img>
//                                         </a>
//                                         {/* <a className="close pad-modal" data-dismiss="modal" aria-label="Close">Cancel</a> */}
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>




//                 </div>
//             </div>

//         )
//     }
// }

// export default Profile;




