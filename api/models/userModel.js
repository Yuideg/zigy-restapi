const mongoose = require("mongoose");
var Schema = mongoose.Schema;


const UserSchema = new Schema({
    first_name: { type: String, trim: true, maxlength: 30, required: "first_name is required", default: null },
    last_name: { type: String, trim: true, maxlength: 30, required: "last_name is required", default: null },
    username: { type: String, trim: true, required: "username is required", unique: true },
    password: { type: String, trim: true, required: "password is required", },
    email: { type: String, trim: true, unique: true, required: "email is required", },
    phone: { type: String, trim: true, maxlength: 15, unique: true, required: "phone is required", },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Users", UserSchema);