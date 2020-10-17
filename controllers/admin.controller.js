const jwt = require('jsonwebtoken');
const admin = require('../models/Admin.model')
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = {

    authentication(req, res, next) {
        console.log(req.body)

        admin.findOne({ userId: req.body.userId }, (err, user) => {
            console.log(user)
            if (!user) {
                return res.status(400).json({ message: "Invalid Credentials..you got no access" })
            }
            else if (!user.verifyPassword(req.body.password))
                return res.status(400).json({ message: "Wrong Password .. No Access" })
            else {
                var payload = {
                    _id: user._id,
                    userId: user.userId
                }
                var newToken = jwt.sign(payload, process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXP,
                    });
                var obj = {
                    userId: user.userId,
                    roleId: user.roleId,
                    firstTimeLogin: user.firstTimeLogin,
                    token: newToken,
                }
                return res.status(200).json({ message: "LoggedIn successfully", obj });
            }
        });
    },

    async getadmindata(req, res) {
        admin.find({ _id: req._id })
            .then((result) => {
                res.status(200).json({ message: "got admin", result });
            })
            .catch((err) => { res.status(400).json({ message: "something went wrong", err }); })
    },

    async updateAdmin(req, res) {
        admin.update({ _id: req._id },
            {
                $set: {
                    fullname: req.body.fullname,
                    email: req.body.email
                }
            })
            .then((result) => { res.status(200).json({ message: "updated admin", result }); })
            .catch((err) => { res.status(400).json({ message: "something went wrong", err }); })
    }

}

module.exports.PasswordConfirm = (req, res, next) => {
    // let encodedpass = bcrypt.hash(req.body.password)
    // console.log(encodedpass);
    if (req.body.password == req.body.confirmPassword) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                req.body.password = hash
                console.log(req.body.password);
                admin.updateOne({ userId: req.body.userId },
                    {
                        $set: { password: req.body.password, firstTimeLogin: 'N' }
                    })
                    .then((result) => {
                        result = null;
                        res.status(200).send({ message: "customer registration succesfully done!", result });
                    })
                    .catch((err) => { res.status(400).send({ message: "Invalid userId", }); })
            });
        });
    }
    else {
        return res.status(200).send({ message: "password didnot match" })
    }

};

module.exports.ChangePassword = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware

        if (err) return res.status(400).json(err);
        // registered user

        else if (user) {
            console.log("inside else if of admion controller")
            if (req.body.newPassword = req.body.confirmPassword) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        req.body.password = hash
                        console.log(req.body.password);
                        admin.updateOne({ userId: req.body.userId },
                            {
                                $set: { password: req.body.password, firstTimeLogin: 'N' }
                            })
                            .then((result) => {
                                result = null;
                                res.status(200).send({ message: "customer registration succesfully done!", result });
                            })
                            .catch((err) => { res.status(400).send({ message: "Invalid userId", }); })
                    });
                });

            }
            else {
                return res.status(200).send({ message: "password didnot match" })
            }

        }
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
};

module.exports.register = (req, res, next) => {

    var adm = new admin();
    adm.userId = req.body.userId;
    adm.username = req.body.username;
    adm.password = req.body.password;
    adm.save((err, doc) => {
        if (!err) res.status(200).send({ message: "admin created successfully", doc });
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else return next(err);
        }
    });
};

