var express = require("express");
var mysql = require("mysql");
const nodemailer = require('nodemailer');
var fileupload = require("express-fileupload");
var express = require("express");
var app = express();


var dbConfiguration = {
    host: "localhost",
    user: "root",
    password: "",
    database: "medcare"
}

var refDB = mysql.createConnection(dbConfiguration);
refDB.connect(function (errkuch) {
    if (errkuch) {
        console.log(errkuch);

    }
    else
        console.log("Connected to Server................");
})



//port
app.listen(1213, function () {
    console.log("Serevr Started....");
})

app.use(express.static("public"));
app.use('/uploadpic', express.static('uploadpic'));
app.get("/hlo", function (req, resp) {
    var path = __dirname + "/public/profile.html";
    resp.sendFile(path);

})

app.get("/ind", function (req, resp) {
    var path = __dirname + "/public/index.html";
    resp.sendFile(path);
})

app.get("/hloo", function (req, resp) {
    var path = __dirname + "/public/signup.html";
    resp.sendFile(path);

})

app.get("/ph", function (req, resp) {
    var path = __dirname + "/public/provider.html";
    resp.sendFile(path);

})

app.get("/pn", function (req, resp) {
    var path = __dirname + "/public/profileNeedy.html";
    resp.sendFile(path);

})

app.get("/setting", function (req, resp) {
    var path = __dirname + "/public/settings.html";
    resp.sendFile(path);

})

app.get("/provider", function (req, resp) {
    var path = __dirname + "/public/dash-provider.html";
    resp.sendFile(path);
})

app.get("/needy", function (req, resp) {
    var path = __dirname + "/public/dash-needy.html";
    resp.sendFile(path);
})

app.get("/fetch", function (req, resp) {
    var path = __dirname + "/public/providerList.html";
    resp.sendFile(path);
})

app.get("/fetchmed", function (req, resp) {
    var path = __dirname + "/public/medicinesList.html";
    resp.sendFile(path);
})

app.get("/admin", function (req, resp) {
    var path = __dirname + "/public/dash-admin.html";
    resp.sendFile(path);
})

app.get("/mgoogle", function (req, resp) {
    var path = __dirname + "/public/medicinegoogler.html";
    resp.sendFile(path);
})

app.use(express.urlencoded({ extended: true }));
app.post("/signup-post", function (req, resp) {
    console.log(req.body);

    var { inputEmail4, inputName, inputAddress, inputProfile, inputCity, inputContact, inputCtime, inputProof } = req.body;

    var aryData = [inputEmail4, inputName, inputContact, inputAddress, inputCity, inputProof, inputProfile, inputCtime];
    refDB.query("insert into profileinfo values(?,?,?,?,?,?,?,?)", aryData, function (errkuch) {
        if (errkuch)
            resp.send(errkuch.toString());
        else
            resp.send("saved succesfully.....");
    })



})

app.use(fileupload());
app.post("/profile-process", function (req, resp) {
    //console.log(req.files.profilePic.name);
    console.log(req.body);

    var desPath = process.cwd() + "/public/uploadpic/" + req.files.inputProfile.name;
    req.files.inputProfile.mv(desPath);

    var desPath1 = process.cwd() + "/public/uploadpic/" + req.files.inputProof.name;
    req.files.inputProof.mv(desPath1);

    console.log(req.body);

    var fileName = req.files.inputProfile.name;
    var fileName1 = req.files.inputProof.name;
    console.log(fileName);
    console.log(fileName1);


    var { inputEmail4, inputName, inputAddress, inputProfile, inputCity, inputContact, inputCtime, inputProof } = req.body;

    var aryData = [inputEmail4, inputName, inputContact, inputAddress, inputCity, fileName1, fileName, inputCtime];
    refDB.query("insert into profileinfo values(?,?,?,?,?,?,?,?)", aryData, function (errkuch) {
        if (errkuch)
            resp.send(errkuch.toString());
        else
            resp.send("saved succesfully.....");
    })

})


app.get("/jsonFetchProfile", function (req, resp) {
    console.log(req.query);
    var { emailx } = req.query;
    //var x=req.query.nEmail;
    //resp.send("Welcme:"+x+"  Password="+y);
    var ary = [emailx];
    refDB.query("select * from profileinfo where email=?", ary, function (err, tableJSON) {
        if (err)
            resp.send(err.toString());
        else
            resp.send(tableJSON);
        //  console.log(tableJSON);
    });

})



app.post("/profile-updation", function (req, resp) {
    //console.log(req.files.profilePic.name);
    console.log(req.body);

    var desPath = process.cwd() + "/public/uploadpic/" + req.files.inputProfile.name;
    req.files.inputProfile.mv(desPath);

    var desPath1 = process.cwd() + "/public/uploadpic/" + req.files.inputProof.name;
    req.files.inputProof.mv(desPath1);

    console.log(req.body);

    var fileName = req.files.inputProfile.name;
    var fileName1 = req.files.inputProof.name;
    console.log(fileName);
    console.log(fileName1);


    var { inputEmail4, inputName, inputAddress, inputProfile, inputCity, inputContact, inputCtime, inputProof } = req.body;

    var aryData = [inputName, inputContact, inputAddress, inputCity, fileName1, fileName, inputCtime, inputEmail4,];
    refDB.query("update profileinfo set name=?,contact=?,address=?,city=?,idpic=?,profilepic=?,ctime=? where email=?", aryData, function (errkuch) {
        if (errkuch)
            resp.send(errkuch.toString());
        else
            resp.send("updated succesfully.....");
    })

})



app.post("/provider-process", function (req, resp) {
    //console.log(req.files.profilePic.name);
    console.log(req.body);

    var desPath = process.cwd() + "/public/uploadpic/" + req.files.inputmpic.name;
    req.files.inputmpic.mv(desPath);


    console.log(req.body);

    var fileName = req.files.inputmpic.name;

    console.log(fileName);



    var { inputEmail, inputMedicine, inputCompany, inputExpiry, inputPacking, inputQty, inputMp, inputmpic, inputtarea } = req.body;

    var aryData = [inputEmail, inputMedicine, inputCompany, inputExpiry, inputPacking, inputQty, inputMp, fileName, inputtarea];
    refDB.query("insert into medicines values(?,?,?,?,?,?,?,?,?,current_date())", aryData, function (errkuch) {
        if (errkuch)
            resp.send(errkuch.toString());
        else
            resp.send("saved succesfully.....");
    })

})

// =========================================================== 
app.post("/needy-process", function (req, resp) {
    //console.log(req.files.profilePic.name);
    console.log(req.body);

    var desPath = process.cwd() + "/public/uploadpic/" + req.files.inputipic.name;
    req.files.inputipic.mv(desPath);


    console.log(req.body);

    var fileName = req.files.inputipic.name;

    console.log(fileName);



    var { inputEmail, inputName, inputCity, inputAddress, inputContact, inputipic, inputtarea } = req.body;

    var aryData = [inputEmail, inputName, inputCity, inputAddress, inputContact, fileName, inputtarea];
    refDB.query("insert into needyprofile values(?,?,?,?,?,?,?,current_date())", aryData, function (errkuch) {
        if (errkuch)
            resp.send(errkuch.toString());
        else
            resp.send("saved succesfully.....");
    })

})
// ============================================================== 

app.get("/update-process", function (req, resp) {
    console.log(req.query);

    var { xEmail, yPwd, znpwd } = req.query;

    var aryData = [znpwd, xEmail, yPwd];
    console.log(aryData);
    refDB.query("update userinfo set password=? where email=? and password=?", aryData, function (errkuch) {
        if (errkuch)
        {
            resp.send(errkuch.toString());
        }
        else
        {
            resp.send("saved succesfully.....");
            // resp.send("saved succesfully.....");
            let mailTransporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: '',
                  pass: ''
              }
            });
  
            let mailDetails = {
              from: 'eknoorgreat001@gmail.com',
              to: xEmail,
              subject: 'Give Help Take Help',
              text: 'Hello ' + xEmail + 'Your changes occur successfully, Your New Password is ' + znpwd
  
  
          };
  
          mailTransporter.sendMail(mailDetails, function (err, data) {
              if (err) {
                  console.log('Error Occurs');
              } else {
                  console.log('Email sent successfully');
              }
          });
        }
    })

})

// ====================================================================================

app.get("/signup-process", function (req, resp) {
    console.log(req.query);

    var { xEmail, yPwd, zType } = req.query;




    var aryData = [xEmail, yPwd, zType];
    refDB.query("insert into userinfo values(?,?,?,current_date(),1)", aryData, function (errkuch) {
        if (errkuch)
          { resp.send(errkuch.toString());}
        else
        {

            resp.send("saved succesfully.....");
          let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
          });

          let mailDetails = {
            from: 'bhavneetjoshi909@gmail.com',
            to: xEmail,
            subject: 'Give Help Take Help',
            text: 'Hello ' + xEmail + 'Thanks for registering in our website. Your Password is ' + yPwd


        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
    }

     })


})




app.get("/login-process", function (req, resp) {
    console.log(req.query);
    var { xEmail1, yPwd1 } = req.query;
    //var x=req.query.nEmail;
    //resp.send("Welcme:"+x+"  Password="+y);
    var ary = [xEmail1, yPwd1];
    refDB.query("select * from userinfo where email=? and password=? and status=1", ary, function (err, tableJSON) {
        if (err)
            resp.send(err.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);


    });

})


app.get("/fetchAll", function (req, resp) {

    refDB.query("select * from profileinfo", function (err, tableJSON) {
        if (err)
            resp.send(err.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    });

})

// =========================================================================

app.get("/fetchAllll", function (req, resp) {

    refDB.query("select * from userinfo where status=0", function (err, tableJSON) {
        if (err)
            resp.send(err.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    });

})
// ========================================================

app.get("/give-permission", function (req, resp) {

    var { email } = req.query;
    //var x=req.query.nEmail;
    //resp.send("Welcme:"+x+"  Password="+y);
    var ary = [email];
    refDB.query("update userinfo set status=1 where email=?", ary, function (err) {
        if (err)
            resp.send(err.toString());
        else
            resp.send("Updated");

    });
})

// =============================================================================

app.get("/delete-record", function (req, resp) {

    var { email } = req.query;
    //var x=req.query.nEmail;
    //resp.send("Welcme:"+x+"  Password="+y);
    var ary = [email];
    refDB.query("delete from profileinfo where email=?", ary, function (err) {
        if (err)
            resp.send(err.toString());
        else
            resp.send("Deleted");

    });
})

app.get("/fetchAlll", function (req, resp) {

    refDB.query("select * from medicines", function (err, tableJSON) {
        if (err)
            resp.send(err.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    });

})


app.get("/delete-recordd", function (req, resp) {

    var { email } = req.query;
    //var x=req.query.nEmail;
    //resp.send("Welcme:"+x+"  Password="+y);
    var ary = [email];
    refDB.query("delete from medicines where email=?", ary, function (err) {
        if (err)
            resp.send(err.toString());
        else
            resp.send("Deleted");

    });
})

// =============================================== 

app.get("/fetch-Cities", function (req, resp) {

    refDB.query("select distinct city from profileinfo", function (err, tableJSON) {
        if (err)
            resp.send(err.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    });

})

// =============================================== 

app.get("/fetch-Medicines", function (req, resp) {

    refDB.query("select distinct med from medicines", function (err, tableJSON) {
        if (err)
            resp.send(err.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    });

})
// ============================================== 
//inner join 
app.get("/fetchmedicine", function (req, resp) {

    console.log(req.query);

    var { xcity, ymedi } = req.query;


    var aryData = [xcity, ymedi];

    refDB.query("select * from medicines inner join profileinfo on profileinfo.email=medicines.email where profileinfo.city=? and medicines.med=?", aryData, function (err, tableJSON) {
        if (err)
            resp.send(err.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    });

})
// =============================================================== 

app.get("/fetch-provider-details", function (req, resp) {

    var { xEmail } = req.query;
    var ary = [xEmail];

    refDB.query("select * from profileinfo where email=?", ary, function (err, tableJSON) {
        if (err)
            resp.send(err.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    });

})