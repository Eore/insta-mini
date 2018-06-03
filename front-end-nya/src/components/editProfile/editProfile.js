
import React, { Component } from 'react'

import './editProfile.css'
import NavBar from '../../components/navbar/NavBar';
import swal from 'sweetalert'
import axios from 'axios'

class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageURL: '',
            imageProfileURL: '',
            idUser: '',
            upload: false,
            data: [],
            datauser: [],            
            Name:'',
            Username:'',
            Website:'',
            Bio:'',
            Email:'',
            PhoneNumber:''
        };

        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleUploadImageProfile = this.handleUploadImageProfile.bind(this);
    }


    handleUploadImageProfile(ev) {
        ev.preventDefault();

        const data2 = new FormData();
        data2.append('file', this.uploadInputProfile.files[0]);
        data2.append('filename', this.fileNameProfile.value);
        data2.append('idUser', this.state.idUser);

        
        axios.post('http://localhost:3010/upload/profile',
            data2,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(() => {
                swal("Foto sudah tersimpan");
            })  

    }

    handleUploadImage(ev) {

        const doesShow = this.state.upload;
        this.setState({ upload: !doesShow });
        console.log(this.state.upload)

        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);
        data.append('captiontext', this.captiontext.value);
        data.append('idUser', this.state.idUser);


        console.log(this.fileName.value)
        console.log('ini upload input, ' + this.uploadInput.files[0])

        var idUser = this.state.idUser

        axios.post('http://localhost:3010/upload',
            data,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(() => {
                console.log(this.uploadInput.files[0])
                swal("Foto sudah tersimpan");
            })            

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


    handelInputProfile() {
        this.setState({
            Name: this.refs.Name.value,
            // Username: this.refs.Username.value,
            // Website: this.refs.Website.value,
            Bio: this.refs.Bio.value,
            // Email: this.refs.Email.value,
            PhoneNumber: this.refs.PhoneNumber.value,            
        });
    }

    componentDidMount() {
        axios.get(`http://localhost:3010/homePhoto/${this.state.idUser}`).then((getData) => {
            console.log(getData);
            this.setState({
                data: getData.data
            })
        })

    }

    componentDidMount() {
        axios.get(`http://localhost:3010/namadanfotoeditprofile/${this.state.idUser}`).then((getData) => {
            console.log(getData);
            this.setState({
                datauser: getData.data
            })
        })

    }
    
    
    handelSubmitProfile() {
        var intPhone = parseInt(this.state.PhoneNumber)
        var dataku = this.state.datauser
         console.log(dataku.length)
    
        if (dataku.length > 0) {
            axios.put(`http://localhost:3010/userprofileupdate/${this.state.Name}/${this.state.Bio}/${this.state.PhoneNumber}/${this.state.idUser}`, {
                Name: this.state.Name,
                // Website: this.state.Website,
                Bio: this.state.Bio,
                PhoneNumber: intPhone
                // idUser: this.state.idUser
            }).then((result) => {
                console.log(result);
                swal('OKE UPDATE')
                window.location.reload()
            })
        } else if(dataku.length === 0){
            
            axios.post('http://localhost:3010/userprofil', {
                Name: this.state.Name,
                // Website: this.state.Website,
                Bio: this.state.Bio,
                PhoneNumber: intPhone,
                idUser: this.state.idUser
            }).then((result) => {
                console.log(result);
                swal('OKE POST')
                window.location.reload()
            })

        }
    }


    handelRemovePhoto(){
        axios.put(`http://localhost:3010/removepp/${this.state.idUser}`,{
            idUser: this.state.idUser
        }).then((result) => {
            console.log(result);
            swal('Foto Berhasil Dihapus')
            // window.location.reload()
        })
    }
    // C1013614

    render() {
        const photoprofile = this.state.datauser.map((item,i)=>{
            let Photopro = 'http://localhost:3010/photo/'+item.Photop
            return <img className="rounded-circle img-fluid pad-atas-p" src={Photopro} alt=""></img>
        })

        const namauser = this.state.datauser.map((item, i) => {
            let username = item.Username
            return <h1 className="h1-edit-profile">{username}</h1>
        })
        
       
        return (
            <div>
                <NavBar />
                <div className="container ep-mg-top" >
                    <div className="card" style={{background:"#282828"}}>
                        <div className="row">
                            <div className="col-3 border-right tn" style={{background:"#282828"}}>
                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a className=" pad active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true" style={{color:"#ffffff"}}>Edit Profile</a>
                                    <a className=" pad " id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false" style={{color:"#ffffff"}}>Upload Photos</a>
                                    {/* <a className=" pad" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Log Out</a> */}
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="tab-content" id="v-pills-tabContent">

                                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">

                                        <div className="container mg-top pd-left-form">
                                            <div className="row form-group mg-bot">
                                                <div className="mg-right-pp">
                                                {photoprofile}
                                                    {/* <img style={{ width: 60, height:50 }} className="rounded-circle img-fluid  " src="http://placehold.it/200x200" alt=""></img> */}
                                                </div>

                                                <div className="col-lg-6 liedit-p">

                                                    <ul className="liedit-p">
                                                        <li style={{color:"#ffffff"}}>{namauser}</li>
                                                        <li><a href="" data-toggle="modal" data-target="#exampleModalCenter">Edit Profile Photo</a></li>
                                                    </ul>


                                                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                            <div className="modal-content center-1 borad">
                                                                {/* <div className="modal-header center-1">
                                                                    <center><h5 className="modal-title" id="exampleModalCenterTitle">Change Profil Photo</h5></center>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div> */}
                                                                <div className="modal-body" style={{background: "#282828"}}>
                                                                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                                        <h5 className="modal-title pad-modal st1" id="exampleModalCenterTitle" style={{color:"#ffffff"}}>Change Profile Photo</h5>                                                               
                                                                        <a data-toggle="modal" data-target="#exampleModalCenter2" className=" pad-modal st3" href="">Upload Photos</a>                                                                        
                                                                        <a className="pad-modal active st2" href="" onClick={() => { this.handelRemovePhoto(); }}>Remove Current Photo</a>
                                                                        <a className="close pad-modal st4 " data-dismiss="modal" aria-label="Close" style={{color:"#ffffff"}}>Cancel</a>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="modal fade" id="exampleModalCenter2" tabindex="1" role="dialog" aria-labelledby="exampleModalCenterTitle2" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                            <div className="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 className="modal-title" id="exampleModalCenterTitle">Change Profile Photo</h5>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <form onSubmit={this.handleUploadImageProfile}>
                                                                        <div>
                                                                            <input ref={(ref) => { this.uploadInputProfile = ref; }} type="file" />
                                                                        </div>
                                                                        <div>
                                                                            <input ref={(ref) => { this.fileNameProfile = ref; }} type="text" placeholder="Enter the desired name of file" />
                                                                        </div>

                                                                        <br />
                                                                        <div>
                                                                            <button>Upload</button>
                                                                        </div>
                                                                        {/* <img src={this.state.imageURL} alt="img" /> */}
                                                                    </form>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                                {/* {formprofile} */}

                                            <div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label lb-right" style={{color:"#ffffff"}}>Name</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control wd-input"
                                                            ref="Name"
                                                            onInput={() => { this.handelInputProfile(); }}
                                                            // placeholder={item.Name}
                                                        />
                                                    </div>
                                                </div>

                                                {/* <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label lb-right">Website</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control wd-input"
                                                            ref="Website"
                                                            onInput={() => { this.handelInputProfile(); }}
                                                            // placeholder={item.Website}
                                                        />
                                                    </div>
                                                </div> */}

                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label lb-right" style={{color:"#ffffff"}}>Bio</label>
                                                    <div className="col-sm-10">
                                                        <textarea className="form-control wd-input"
                                                            ref="Bio"
                                                            onInput={() => { this.handelInputProfile(); }}
                                                            // placeholder={item.Bio}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label lb-right" style={{color:"#ffffff"}}>Phone Number</label>
                                                    <div className="col-sm-10">
                                                        <input className="form-control wd-input"
                                                            ref="PhoneNumber"
                                                            onInput={() => { this.handelInputProfile(); }}
                                                            // placeholder={item.PhoneNumber}
                                                        
                                                        />

                                                    </div>
                                                </div>
                                            </div>

                                                <div className="mag-but-sub-edit">
                                                    <button className="btn btn-info geser-but" onClick={() => { this.handelSubmitProfile(); }}>submit</button>
                                                 </div>
                                        </div>

                                    </div>

                                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">

                                        <form className="form-signin form-up-p" onSubmit={this.handleUploadImage}>
                                            <input
                                                ref={(ref) => { this.uploadInput = ref; }}
                                                type="file"
                                                className="form-control bg-input-sign"
                                                required />
                                            <input type="text" ref="fullname"
                                                className="form-control bg-input-sign"
                                                placeholder="Enter the desired name of file"
                                                ref={(ref) => { this.fileName = ref; }} type="text"
                                                required />
                                            <input type="text" ref="fullname"
                                                className="form-control bg-input-sign"
                                                placeholder="Caption"
                                                ref={(ref) => { this.captiontext = ref; }} type="text"
                                                required />
                                            <button className="btn btn-lg btn-primary btn-block btn-signIn">Upload</button>
                                        </form>

                                    </div>
                                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">

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

export default EditProfile;

                                // {this.state.dataku.map((item,i)=>{
                                //     <div>
                                //             <div className="form-group row">
                                //                     <label  className="col-sm-2 col-form-label lb-right">Name</label>
                                //                     <div className="col-sm-10">
                                //                         <input type="text" className="form-control wd-input" 
                                //                             ref="Name"
                                //                             onInput={() => { this.handelInputProfile(); }}
                                //                             placeholder={item.Name}
                                //                         />
                                //                     </div>
                                //             </div>

                                //             <div className="form-group row">
                                //                 <label  className="col-sm-2 col-form-label lb-right">Website</label>
                                //                 <div className="col-sm-10">
                                //                     <input type="text" className="form-control wd-input" 
                                //                         ref="Website"
                                //                         onInput={() => { this.handelInputProfile(); }}
                                //                         placeholder={item.Website}
                                //                     />
                                //                 </div>
                                //             </div>

                                //             <div className="form-group row">
                                //                 <label  className="col-sm-2 col-form-label lb-right">Bio</label>
                                //                 <div className="col-sm-10">
                                //                     <textarea className="form-control wd-input" 
                                //                         ref="Bio"
                                //                         onInput={() => { this.handelInputProfile(); }}
                                //                         placeholder={item.Bio}
                                //                     />
                                //                 </div>
                                //             </div>

                                //             <div className="form-group row">
                                //                 <label  className="col-sm-2 col-form-label lb-right">Phone Number</label>
                                //                 <div className="col-sm-10">
                                //                     <input className="form-control wd-input"                                                         
                                //                         ref="PhoneNumber"
                                //                         onInput={() => { this.handelInputProfile(); }}
                                //                         placeholder={item.PhoneNumber}
                                //                     />

                                //                 </div>
                                //             </div>
                                //     </div>              
                                // })}

                                                // <div className="form-group row">
                                                //     <label  className="col-sm-2 col-form-label lb-right">Name</label>
                                                //     <div className="col-sm-10">
                                                //         <input type="text" className="form-control wd-input" 
                                                //             ref="Name"
                                                //             onInput={() => { this.handelInputProfile(); }}
                                                //             value={this.state.Name}

                                                //         />
                                                //     </div>
                                                // </div>

                                                // {/* <div className="form-group row">
                                                //     <label for="inputPassword" className="col-sm-2 col-form-label lb-right">Username</label>
                                                //     <div className="col-sm-10">
                                                //         <input type="password" className="form-control wd-input" 
                                                //             ref="Username"
                                                //             onInput={() => { this.handelInputProfile(); }}

                                                //         />
                                                //     </div>
                                                // </div> */}

                                                // <div className="form-group row">
                                                //     <label  className="col-sm-2 col-form-label lb-right">Website</label>
                                                //     <div className="col-sm-10">
                                                //         <input type="text" className="form-control wd-input" 
                                                //             ref="Website"
                                                //             onInput={() => { this.handelInputProfile(); }}
                                                //             value={this.state.Website}
                                                //         />
                                                //     </div>
                                                // </div>

                                                // <div className="form-group row">
                                                //     <label  className="col-sm-2 col-form-label lb-right">Bio</label>
                                                //     <div className="col-sm-10">
                                                //         <textarea className="form-control wd-input" 
                                                //             ref="Bio"
                                                //             onInput={() => { this.handelInputProfile(); }}
                                                //             value={this.state.Bio}

                                                //         />
                                                //     </div>
                                                // </div>

                                                // {/* <div className="form-group row">
                                                //     <label for="inputPassword" className="col-sm-2 col-form-label lb-right">Email</label>
                                                //     <div className="col-sm-10">
                                                //         <input type="email" className="form-control wd-input" 
                                                //             ref="Email"
                                                //             onInput={() => { this.handelInputProfile(); }}

                                                //         />
                                                //     </div>
                                                // </div> */}

                                                // <div className="form-group row">
                                                //     <label  className="col-sm-2 col-form-label lb-right">Phone Number</label>
                                                //     <div className="col-sm-10">
                                                //         <input className="form-control wd-input"                                                         
                                                //             ref="PhoneNumber"
                                                //             onInput={() => { this.handelInputProfile(); }}
                                                //             value={this.state.PhoneNumber}

                                                //         />

                                                //     </div>
                                                // </div>

                                            