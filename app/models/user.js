const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const moment   = require('moment');

const userSchema = mongoose.Schema({
    isAdmin          : { type: Boolean, default: false },
    local            : {
        createdAt       : String,
        profileImageUrl : String,
        username        : String,
        email           : String,
        phoneNumber     : String,
        password        : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.createdFromNow = function() {
    return moment(this.local.createdAt).fromNow();
};

module.exports = mongoose.model('User', userSchema);