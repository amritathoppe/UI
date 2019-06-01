const UserProfileModel = require("../models/UserProfileModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const session = require("express-session");

const MONGO_URL = "mongodb://localhost/mean";
const MONGO_USERNAME = "matchMaker";
const MONGO_PASSWORD = "p@ssw0rd";

mongoose.connect(MONGO_URL, {
    auth: {
        user: MONGO_USERNAME,
        password: MONGO_PASSWORD
    },
    useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);
let meanSchema = require("../schemas/mean_schema.js").meanSchema;
//hashing a password before saving it to the database
/*meanSchema.pre('save', function (next) {
    bcrypt.hash(newUser.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        newUser.password = hash;
        next();
    })
}); */
const User = mongoose.model("User", meanSchema);
//let newUser = new User();

mongoose.connection.once("open", function () {
    console.log("Open connection!");
});

class UserService
{
    static create(data)
    {
        //newUser.userName = data.username;
        //newUser.password = data.password;

        return new Promise(function(resolve, reject) {

            bcrypt.hash(data.password, 10, function (err, hash){
                if (err) {
                    reject(err);
                    //return next(err);
                }
                let newUser = new User({
                    userName: data.username,
                    password: hash
                });



                newUser.save({},function (err, doc) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log("\nSaved document: " + doc);
                    let user = new UserProfileModel(doc._id, doc.userName, doc.password, "", "", "", "");
                    console.log("Returning user: " + user);
                    console.log(user);
                    resolve(user);
                }
            });
        });
        });
    }
    static verify(data) {
        return new Promise(function(resolve, reject) {
            User.findOne({ userName: data.username })
                .exec(function (err, user) {
                    if (user == null) {
                        var err = new Error("User not found");
                        console.log(err);
                        return reject(err);
                    }
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    console.log(user);
                    bcrypt.compare(data.password, user.password, function (err, result) {
                        if (result === true) {
                            console.log("Authentication successful!");
                            // Saving _id from MongoDB to Session
                            // req.session.userId = user._id;
                            console.log(user);
                            let loggedInUser = new UserProfileModel(user._id, user.userName, user.password, user.firstName, user.lastName, user.interests, user.state);
                            console.log("Returning user: " + loggedInUser);
                            resolve(loggedInUser);
                        } else {
                            return reject(err);
                        }
                    })
                });
        });
    }

    static retrieve(id)
    {
        User.findOne({ _id: id })
            .exec(function (err, user) {
                if (err) {
                    console.log(err);
                    throw new Error(err);
                } else if (!user) {
                    var err = new Error("User not found.");
                    throw new Error(JSON.stringify(err));
                }
                console.log(user);
                let foundUser = new UserProfileModel(user._id, user.userName, user.password, user.firstName, user.lastName, user.interests, user.state);
                console.log("Returning user: " + foundUser);
                return foundUser;
            });
    }

    static update(uid, data)
    {

    }

    static delete(uid)
    {

    }
}

module.exports = UserService;
