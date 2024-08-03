const { response } = require('express');
const mongoose = require('mongoose');
const Game = mongoose.model(process.env.MODEL_NAME);

const bcrypt = require('bcryptjs');

const User = mongoose.model("User");

const callbackify = require('util').callbackify;

const _sendResponse = function (res, response) {
    res.status(response.status).json(response);
}

const registerUserWithAsync = function (req, res) {
    const response = {
        status: 201,
        message: ""
    }
    //let passwordHash = "";

    // bcrypt.hash(req.body.password, bcrypt.genSaltSync(10))
    //     .then(hash => {
    //         passwordHash = hash;
    //     }).catch(error => {
    //         console.log(error);
    //         response.status = 500;
    //         response.message = error;
    //     })

    // console.log(passwordHash);

    const newUser = {
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }

    User.create(newUser)
        .then((createduser) => {
            response.message = createduser
        })
        .catch((error) => {
            response.status = 500;
            response.message = error
        })
        .finally(_sendResponse(res, response));
}

// const registerUser = function (req, res) {
//     const response = {
//         status: 201,
//         message: ""
//     }

//     const newUser = {
//         name: req.body.name,
//         username: req.body.username,
//         password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
//     }

//     User.create(newUser)
//         .then((createduser) => {
//             response.status = 200;
//             response.message = createduser;
//         })
//         .catch((error) => {
//             response.status = 500;
//             response.message = error;
//         })
//         .finally(() => _sendResponse(res, response));
// }
const __createDashedPwd = function (req, hashedPwd, response) {
    return new Promise((resolve, reject) => {
        const newUser = {
            name: req.body.name,
            username: req.body.username,
            password: hashedPwd
        }
        if (!newUser.username && newUser.username === "") {
            reject("Phurpa demanding more ");
            return;
        }
        resolve(newUser);
    })
}

const createUserAndSettingResponse = function (newUser, response) {
    return User.create(newUser)
        .then((createduser) => {
            response.status = 200;
            response.message = createduser;
            console.log(createduser)
        })
}


const _passwordandSalt = function (salt, req, response) {
    return bcrypt.hash(req.body.password, salt)
}

const registerUser = function (req, res) {
    const response = {
        status: 201,
        message: ""
    }

    bcrypt.genSalt(10)
        .then(salt => _passwordandSalt(salt, req, response))
        .then(hashedPassword => __createDashedPwd(req, hashedPassword, response))
        .then(user => createUserAndSettingResponse(user, response))
        .catch(error => {
            response.status = 500;
            response.message = error;
        }).finally(() => _sendResponse(res, response));
}

const _setResponseInternalError = function (response, error) {

}
const _createResponseObject = function () {
    return {
        status: 201,
        message: ''
    }
}


const __checkIfUserExistThenCompareHashedAndUpdateResponse = function (databaseUser, response, req) {
    if (!databaseUser) {
        response.status = 401;
        response.message = "Unauthorized";
    } else {
        bcrypt.compare(req.body.password, databaseUser.password)
            .then((passwordMatch) => _doesPasswordMatche(passwordMatch)//_checkIfPasswordMatchedANdUpdateResponse(passwordMatch, response))
                .then(() => /*send success response*/ { })
                .catch(() => {

                }));
    }
}

const _checkIfPasswordMatchedANdUpdateResponse = function (passwordMatch, response) {
    if (!passwordMatch) {
        response.status = 401;
        response.message = "Pasword not matching";
    } else {
        response.status = 200;
        response.message = "Success";
    }
}


const _doesPasswordMatche = function (passwordMatch, response) {
    return new Promise((resolve, reject) => {
        if (!passwordMatch) {
            reject()
            // response.status = 401;
            // response.message = "Pasword not matching";
        } else {
            resolve();
            // response.status = 200;
            // response.message = "Success";
        }
    })

}

const login = function (req, res) {
    if (req.body) {
        let username = req.body.username;
        let password = req.body.password;

        let response = _createResponseObject(200);

        User.findOne({ 'username': username }).exec()
            .then((databaseUser) => __checkIfUserExistThenCompareHashedAndUpdateResponse(databaseUser, response, req))
            .catch((error) => {
                console.log("Failed")
                _setResponseInternalError(response, error);
                _sendResponse(res, response);
            })
            .finally(() => _sendResponse(res, response));
    } else {
        _setResponseInternalError(response, { message: "Missing field" });
        _sendResponse(res, response);
    }
}



const old_login = function (req, res) {
    if (req.body) {
        let username = req.body.username;
        let password = req.body.password;

        let response = _createResponseObject(200);

        User.findOne({ 'username': username }).exec()
            .then((databaseUser) => {
                if (!user) {
                    response.status = 401;
                    response.message = "Unauthorized";
                } else {
                    // console.log(req.body.username);
                    // const passwordMatch = bcrypt.compareSync(req.body.password, databaseUser.password);

                    const passwordMatch = bcrypt.compare(req.body.password, databaseUser.password)
                        .then((passwordMatch) => {
                            if (!passwordMatch) {
                                response.status = 401;
                                response.message = "Pasword not matching";
                            } else {
                                response.status = 200;
                                response.message = "Success";
                            }
                        })
                        .catch((error) => {
                            _setResponseInternalError(error);
                            _sendResponse(res, response);
                        });
                    _sendResponse(res, response);
                }
            })
            .catch((error) => {
                console.log("Failed")
                _setResponseInternalError(response, error);
                _sendResponse(res, response);
            });
    } else {
        _setResponseInternalError(response, { message: "Missing field" });
        _sendResponse(res, response);
    }
    _sendResponse(req, response);
}

module.exports = { registerUser, login }