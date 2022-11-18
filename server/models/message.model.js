const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema({
    time: {Type:Number},
    text: {Type:String},
}, {timestamps: true});
module.exports.Message = mongoose.model('Message', MessageSchema)