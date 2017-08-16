/**
 * Created by vinhdv on 8/26/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// set up a mongoose model
var UsersSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    status:{
        type: Number
    },
    position:{
        type: String
    },
    isLogged:{
        type: Boolean
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {type: Date, default: Date.now, index: true},
    updateAT: {type: Date, default: Date.now, index: true},
});

UsersSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UsersSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Users', UsersSchema);