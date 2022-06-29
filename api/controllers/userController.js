var mongoose = require("mongoose");
var Users = mongoose.model("Users");
const bcrypt = require("bcrypt");
//fetch all users account from db
exports.GetAllUser = (req, res) => {
    Users.find({}, (err, users) => {
            if (err) {
                return res.status(400).json({error:"User record not found!"});
            }
            return res.status(200).json(users);
        })
        .select("-__v -password -created_at -updated_at");
};


//create new account for new user
exports.CreateUser = (req, res) => {
    var newUser = new Users(req.body);
    console.log("new User ",newUser)
    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let phoneRegx = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    const username = newUser.username;
    //first name and last name must not be left empty
    if (newUser.first_name ==null | newUser.last_name==null){
        return res.status(400).json({error:"First Name or Last Name is required field!"});
    }
    //username and password must not left empty
    if (newUser.username==null | newUser.password==null){
        return res.status(400).json({error:"Username or password is required field!"});
    }
    //valid password e.g prtev43535ff
    if (newUser.password.length <=8){
        return res.status(400).json({error:"Passwod must be atleast eight charactors!"});
    }
    //valid email e.g email@gmail.com
    console.log("===>",newUser.email)
    if (!newUser.email.match(emailRegex)){
        return res.status(400).json({error:"Invalid email address found!"});
    }
    //phone length is 10 e.g 0934578879
    if (!newUser.phone.match(phoneRegx) &&(newUser.phone.length>=10 &&newUser.phone.length<=13)){
        return res.status(400).json({error:"Invalid phone number found!"});
    }

    Users.findOne({ username }).exec((err, user) => {
        console.log("user==>", user,"err==>",err);
        if (err) {
            return res.status(409).json({error:"Unable to register this User!"});
        }
        if (user) {
            return res.status(409).json({message:"User Already Exist!"});
        }

        //Encrypt user password
        var pass = newUser.password.toString();
        var numOfRounds = 10;
        console.log(pass, numOfRounds);
        bcrypt.hash(pass, numOfRounds, function(err, hash) {
            console.log("error ", err, hash);
            if (err) {
                return res
                    .status(400)
                    .send({ error: "Hashing password credential failed!" });
            }

            newUser.password = hash;
            console.log("User Creation started!");
            newUser.save((e, user) => {
                console.log("error =>",e)
                if (err) {
                    return res.status(400).json({message:"User creation failed!"});
                }
                return res.status(201).json(newUser);
            });
        });
    });
};
//get user by id param
exports.GetUserByID = (req, res) => {
    Users.findById(req.params.id, (err, user) => {
             console.log("user =>",user)
            if (err | user==null) {
                return res.status(400).json({message:"User record not found!"});
            }
            return res.json(user);
        })
        .select("-__v -password -created_at -updated_at");

};
//update user account
exports.UpdateUser = (req, res) => {
    const filter = { _id: req.params.id, };
    Users.findOneAndUpdate(filter, req.body, { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({message:"Unable to edit  user data!"});
            }
            return res.status(200).json(user);
        }
    );
};
//delete user account from db
exports.DeleteUser = (req, res) => {
    Users.remove({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({message:"Unable to delete  user record!"});
        }
        return res.json({ message: "User is deleted successfully" });
    });
};