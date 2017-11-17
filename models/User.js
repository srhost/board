// models/User.js

var mongoose = require('mongoose');

// schema
var userSchema = mongoose.Schema({
    username: { type: String, required:[true, 'Username is required!'], unique: true },
    password: { type: String, required:[true, 'Password is required!'], select: false},
    name: { type: String, require:[true, 'Name is required!']},
    email: { type: String }
}, { toObject: { virtuals: true }});

// virtuals
userSchema.virtual('passwordConfirmation')
.get(function() { return this._passwordConfirmation; })
.set(function(value) { this._passwordConfirmation=value; });

userSchema.virtual('originalPassword')
.get(function() { return this._originalPassword; })
.set(function(value) { return this._originalPassword=value; });

userSchema.virtual('currentPassword')
.get(function() { return this._currentPassword; })
.set(function(value) { return this._currentPassword=value; });

userSchema.virtual('newPassword')
.get(function() { return this._newPassword })
.set(function(value) { return this._newPassword=value; });

// password validation
userSchema.path('password').validate(function(v) {
    var user = this;

    // create user
    if(user.isNew)
    {
        if(!user.passwordConfirmation)
        {
            user.invalide('passwordConfirmation', 'Password Confirmation is required!');
        }
        if(user.password !== user.passwordConfirmation)
        {
            user.invalide('passwordConfirmation', 'Password Confirmation does not matched!');
        }
    }

    // update user
    if(!user.isNew)
    {
        if(!user.currentPassword)
        {
            user.invalide('currentPassword', 'Current Password is required!');
        }
        if(user.currentPassword && user.currentPassword != user.originalPassword)
        {
            user.invalide('currentPassword', 'Current Password is invalid!');
        }
        if(user.newPassword !== user.passwordConfirmation)
        {
            user.invalide('passwordConfirmation', 'Password Confirmation does not matched!');
        }
    }
});

// model & export
var User = mongoose.model('user', userSchema);
module.exports = User;