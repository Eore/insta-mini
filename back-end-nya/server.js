const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const setting =require('./configuration/index')
const jwt =require('jsonwebtoken')
const fileUpload = require('express-fileupload');
const path = require('path');


const app = express('')


const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    port: 8889,
    database: "lil_insta",
    user: "root",
    password: "root"
})

db.connect();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/photo', express.static(__dirname + '/photo'));
// Routes

/////////////////////////////////////////////////// POST ////////////////////////////////////////////////////////

app.post('/upload', function (req, res) { //post data into databases
    let imageFile = req.files.file;
    var data = { PhotoName: req.body.filename + '.jpg', Caption: req.body.captiontext, idUser: req.body.idUser };
    var sql = 'insert into photo set ?';

    imageFile.mv(`${__dirname}/photo/${req.body.filename}.jpg`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        db.query(sql, data, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send({
                type: 'POST',
                PhotoName: req.body.filename + '.jpg',
                Caption: req.body.captiontext,
                idUser: req.body.idUser 
            });
        });
        // res.json({ file: `public/${req.body.filename}.jpg` });
    });
});


app.post('/upload/profile', function (req, res) { //post data into databases
    let imageFile = req.files.file;
    var data = { Photop: req.body.filename + '.jpg' };
    var sql = `update userprofile set Photop='${req.body.filename}.jpg' where idUser=${req.body.idUser}`;

    imageFile.mv(`${__dirname}/photo/${req.body.filename}.jpg`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        db.query(sql, data, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send({
                type: 'POST',
                Photop: req.body.filename + '.jpg',
            });
        });
        // res.json({ file: `public/${req.body.filename}.jpg` });
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/register', (req, res) => {
        let data = { Username: req.body.username, Fullname: req.body.fullname, Email: req.body.email, Password:req.body.password}
        let sql = 'insert into user set ?';
        db.query(sql, data, (err, result) => {
            if (err) return res.status(400).send({ success: false, msg: 'Username already exists.' });; 
            console.log(result);
            res.send(result);
    })
})

app.post('/login', (req,res)=>{
    var user = req.body.username.toString();
    var pass = req.body.password.toString();
    var sql = "SELECT * FROM user where Username='"+user+"' and Password='"+pass+"'" ;
    // console.log(sql)
    db.query(sql, (err, res1) => {
        // if (err) throw err;
        if(res1.length === 0){
            return res.status(401).send({ success: false, msg: 'Password salah' });; 
            // res.status(401)
        } else {
            var token = jwt.sign(JSON.stringify(res1),setting.JWT_SECRET);
            res.json({success: true,token: token});
            // res2=JSON.stringify(res1)
            // res.send(res1)
        }
    });
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/userprofil', (req, res) => {
    let data = { Name: req.body.Name, Bio: req.body.Bio, PhoneNumber: req.body.PhoneNumber, idUser: req.body.idUser  }
    let sql = 'insert into userprofile set ?';
    db.query(sql, data, (err, result) => {
        if (err) return res.status(400).send('Error connecting to database.');;
        console.log(result);
        // res.send(result);
    })
})

app.post('/userprofil2', (req, res) => {
    let data = { idUser: req.body.idUser }
    let sql = 'insert into userprofile set ?';
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
})


app.post('/postfollowing/cek', (req, res) => {
    var idUser = req.body.idUser;
    var idUserFollowing = req.body.idUserOrang2;
    let sql = `SELECT * FROM follow where iduser =${req.body.iduser}  and idUserFollowing = ${req.body.idUserOrang2}`;
    // var sql = "SELECT * FROM user where Username='" + idUser + "' and Password='" + idUserFollowing + "'";
    // console.log(sql)
    db.query(sql, (err, res1) => {
        if (err) throw err;
        console.log(res1    );
        res.send(res1);
    });
})

app.post('/postfollowing', (req, res) => {
    let data = { idUser: req.body.idUser, idUserFollowing: req.body.idUserOrang2 }
    let sql = 'insert into follow set ?';
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/postlike', (req, res) => {
    let data = { idUser: req.body.idUser, idPhoto: req.body.idPhoto }
    let sql = 'insert into likes set ?';
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
})

// app.post('/postlike', (req, res) => {
//     var idUser = req.body.idUser
//     var idPhoto = req.body.idPhoto
//     var sql = "SELECT * FROM likes where Username='" + user + "' and Password='" + pass + "'";
//     // console.log(sql)
//     db.query(sql, (err, res1) => {
//         // if (err) throw err;
//         if (res1.length === 0) {
//             return res.status(401).send({ success: false, msg: 'Password salah' });;
//             // res.status(401)
//         } else {
//             var token = jwt.sign(JSON.stringify(res1), setting.JWT_SECRET);
//             res.json({ success: true, token: token });
//             // res2=JSON.stringify(res1)
//             // res.send(res1)
//         }
//     });
// })


/////////////////////////////////////////////////// GET ////////////////////////////////////////////////////////


app.get('/getdatalikes/:idUser/:idPhoto', (req, res) => {
    let sql = `select * from likes where idUser=${req.params.idUser} and idPhoto=${req.params.idPhoto}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

// app.get('/getdatalikes/:idUser', (req, res) => {
//     let sql = `select * from likes where idUser=${req.params.idUser} `;
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send(result);
//     });
// });

app.get('/homePhoto/:idUser', (req, res) => {
    // let sql = `select user.idUser, user.Username, photo.PhotoName, photo.Caption from user join photo on user.idUser = photo.idUser where photo.idUser = ${req.params.idUser} ORDER BY waktu DESC`;        
    // let sql = `select user.idUser, user.Username, photo.PhotoName, photo.Caption, photo.idPhoto from user join photo on user.idUser = photo.idUser where photo.idUser = ${req.params.idUser} ORDER BY waktu DESC`;
    // let sql = `select photo.idUser, photo.PhotoName, photo.waktu, u.idUser, u.PhotoName, photo.waktu from photo inner join following2 f on(f.idUser = photo.idUser) inner join photo u on(u.idUser = f.idUserFollowing) where photo.idUser= ${req.params.idUser} order by waktu desc`;
    // let sql = `select * from following2 where idUser= ${req.params.idUser}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/homePhoto2/:idUser', (req, res) => {
    // let sql = `select * from user u join following2 f on u.idUser = f.idUser join photo p on f.idUserFollowing = p.idUser where u.idUser =${req.params.idUser} `;
    // let sql = `select user.idUser, user.Username, photo.PhotoName, photo.Caption, userprofile.Photop from user join photo on user.idUser = photo.idUser join userprofile on user.idUser = userprofile.idUser where photo.idUser = ${req.params.idUser} ORDER BY waktu DESC`;
    // let sql = `select user.idUser, user.Username, photo.PhotoName, phot  o.Caption from user join photo on user.idUser = photo.idUser where photo.idUser = ${req.params.idUser} ORDER BY waktu DESC`;        
    // let sql = `select user.idUser, user.Username, photo.PhotoName, photo.Caption, photo.idPhoto from user join photo on user.idUser = photo.idUser where photo.idUser = ${req.params.idUser} ORDER BY waktu DESC`;
    // let sql = `select photo.idUser, photo.PhotoName, photo.waktu, u.idUser, u.PhotoName, photo.waktu from photo inner join following2 f on(f.idUser = photo.idUser) inner join photo u on(u.idUser = f.idUserFollowing) where photo.idUser= ${req.params.idUser} order by waktu desc`;
    // let sql = `select photo.idUser, photo.PhotoName, photo.waktu, following2.idUserFollowing from photo join following2 on photo.idUser = following2.idUser where photo.idUser = 5 order by waktu desc;`
    // let sql =`select * from user u join following2 f on u.idUser = f.idUser join photo p on f.idUserFollowing = p.idUser join userprofile s on p.idUser = s.idUser where u.idUser = ${req.params.idUser}`;
    let sql =`select * from user u join follow f on u.idUser = f.idUser join photo p on f.idUserFollowing = p.idUser join userprofile s on p.idUser = s.idUser where u.idUser = ${req.params.idUser} order by time desc`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/photouser/:idUser', (req, res) => {
    let sql = `select * from photo where photo.idUser = ${req.params.idUser} ORDER BY time DESC`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/userProfilPostPhoto/:Username', (req, res) => { 
    // let sql = `select user.Username, user.idUser, photo.PhotoName, photo.waktu from user join photo on user.idUser = photo.idUser where user.Username = "${req.params.Username}"  ORDER BY waktu DESC`;
    // let sql =`select user.Username, user.idUser, photo.PhotoName, photo.waktu, userprofile.bio from user join photo on user.idUser = photo.idUser join userprofile on user.idUser = userprofile.idUser where user.Username = "${req.params.Username}"  ORDER BY waktu DESC`;
    // let sql = `select user.Username, user.idUser,photo.PhotoName from user join photo on user.idUser = photo.idUser where user.Username="${req.params.Username}"`;
    // let sql = `select * from photo where photo.idUser = ${req.params.idUser}`
    // let sql = `select user.Username, user.idUser, photo.PhotoName, photo.waktu, userprofile.bio, userprofile.Website, userprofile.Photop, userprofile.Name from user join photo on user.idUser = photo.idUser join userprofile on user.idUser = userprofile.idUser where user.Username = "${req.params.Username}"  ORDER BY waktu DESC`;       
    let sql = `select user.Username, user.idUser, photo.PhotoName, photo.time, photo.idPhoto, userprofile.bio, userprofile.Photop, userprofile.Name from user join photo on user.idUser = photo.idUser join userprofile on user.idUser = userprofile.idUser where user.Username = "${req.params.Username}"  ORDER BY time DESC`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/userprofilorang/:idUser', (req, res) => {
    let sql = `select user.idUser, user.Username, userprofile.Name, userprofile.Bio, userprofile.PhoneNumber, userprofile.Photop from user join userprofile on user.idUser = userprofile.idUser where userprofile.idUser =${req.params.idUser};`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/namadanfotoeditprofile/:idUser', (req, res) => {
    let sql = `select user.idUser, user.Username, userprofile.Name, userprofile.Bio, userprofile.PhoneNumber, userprofile.Photop from user join userprofile on user.idUser = userprofile.idUser where userprofile.idUser =${req.params.idUser};`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/userProfilPostPhoto2/:Username', (req, res) => {
    let sql = `select user.Username, user.idUser, photo.PhotoName, photo.time, userprofile.bio from user join photo on user.idUser = photo.idUser join userprofile on user.idUser = userprofile.idUser where user.Username = "${req.params.Username}"  ORDER BY time DESC`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});


app.get('/percobaannih', (req, res) => {
    let sql = 'select * from follow'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/getlikes', (req, res) => {
    let sql = 'select * from likes'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/getlikes2/:idUser/:idfotomodal', (req, res) => {
    let sql = `select * from likes where idUser=${req.params.idUser} and idPhoto=${req.params.idfotomodal}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});


// app.get('/getallfollowing', (req, res) => {
//     let sql = `select * from following2`
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send(result);
//     });
// });

 app.get('/getallfollowing', (req, res) => {
    let sql = `select * from follow`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//////////////////////////////////////Profil User///////////////////////////////////////////////

app.get('/getallfollowing/following/:idUser', (req, res) => {
    let sql = `select * from follow where idUser=${req.params.idUser}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/getallfollowing/followers/:idUser', (req, res) => {
    let sql = `select * from follow where idUserFollowing=${req.params.idUser}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});


app.get('/getfollowing/:idUser/:idUserFollowing', (req, res) => {
    let sql = `select * from follow where idUser=${req.params.idUser} and idUserFollowing=${req.params.idUserFollowing}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});


app.get('/coba/:idUser', (req, res) => {
    let sql = `select * from likes where idUser=${req.params.idUser}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/getallfollowing/followers2/:idUserOrang2', (req, res) => {
    let sql = `select * from follow where idUserFollowing=${req.params.idUserOrang2}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/getallfollowernavbar/:idUser', (req, res) => {
let sql =`select userprofile.Photop, follow.idUser, follow.idUserFollowing, user.Username from userprofile join follow on userprofile.idUser = follow.idUser join user on follow.idUser = user.idUser where idUserFollowing =${req.params.idUser}`;
db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
});
});

/////////////////////////////////////////////////// PUT ////////////////////////////////////////////////////////


// app.put('/userprofileupdate/:Name/:Website/:Bio/:PhoneNumber/:idUser', (req, res) => {
//     let sql = `UPDATE userprofile SET Name='${req.params.Name}', Website='${req.params.Website}',Bio='${req.params.Bio}' ,PhoneNumber='${req.params.PhoneNumber}' WHERE idUser = '${req.params.idUser}'`;
//     db.query(sql, (err, res1) => {
//         if (err) throw err;
//         console.log(res);
//         res.send(res1);
//     });
// });

// app.put('/userprofileupdate/:idUser', (req, res) => {
//     let sql = `UPDATE userprofile SET Name='${req.body.Name}', Website='${req.body.Website}',Bio='${req.body.Bio}' ,PhoneNumber='${req.body.PhoneNumber}' WHERE idUser = '${req.body.idUser}'`;
//     db.query(sql, (err, res1) => {
//         if (err) throw err;
//         console.log(res);
//         res.send(res1);
//     });
// });

app.put('/userprofileupdate/:idUser', (req, res) => {
    let data = { Name: req.body.Name, Bio: req.body.Bio, PhoneNumber: req.body.PhoneNumber }
    let sql = `UPDATE userprofile SET ? where idUser =${req.params.idUser} `;
    db.query(sql,data, (err, res1) => {
        if (err) throw err;
        console.log(res1);
        res.send(res1);
    });
})


// app.post('/register', (req, res) => {
//     let data = { Username: req.body.username, Fullname: req.body.fullname, Email: req.body.email, Password: req.body.password }
//     let sql = 'insert into user set ?';
//     db.query(sql, data, (err, result) => {
//         if (err) return res.status(400).send({ success: false, msg: 'Username already exists.' });;
//         console.log(result);
//         res.send(result);
//     })
// })




app.put('/removepp/:idUser',(req,res)=>{
    let sql = `UPDATE userprofile SET Photop = NULL WHERE idUser = '${req.params.idUser}'`;
    db.query(sql, (err, res1) => {
        if (err) throw err; 
        console.log(res);
        res.send(res1);
    });
})


// app.put('/removefoto/:idPhoto', (req, res) => {
//     let sql = `UPDATE photo SET PhotoName = NULL WHERE idPhoto = '${req.params.idPhoto}'`;
//     db.query(sql, (err, res1) => {
//         if (err) throw err;
//         console.log(res);
//         res.send(res1);
//     });
// })

/////////////////////////////////////////////////// DELETE ////////////////////////////////////////////////////////


app.delete('/removefoto/:idPhoto', (req, res) => {
    let sql = `DELETE from photo WHERE idPhoto = '${req.params.idPhoto}'`;
    db.query(sql, (err, res1) => {
        if (err) throw err;
        console.log(res);
        res.send(res1);
    });
})

app.delete('/unfollow/:idUser/:idUserFollowing2', (req, res) => {
    let sql = `DELETE from follow WHERE idUser='${req.params.idUser}' and idUserFollowing = '${req.params.idUserFollowing2}'`;
    db.query(sql, (err, res1) => {
        if (err) throw err;
        console.log(res);
        res.send(res1);
    });
})

app.delete('/unlike/:idUser/:idPhoto', (req, res) => {
    let sql = `DELETE from likes WHERE idUser='${req.params.idUser}' and idPhoto = '${req.params.idPhoto}'`;
    db.query(sql, (err, res1) => {
        if (err) throw err;
        console.log(res);
        res.send(res1);
    });
})



// Start the server
const port = 3010;
app.listen(port, () => {
console.log(`Server listening at ${port}`);
});