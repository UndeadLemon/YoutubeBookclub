const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema({
    time: {Type:Number},
    text: {Type:String},
}, {timestamps: true});
const VideoSchema = new mongoose.Schema({
    title: { type: String},
    url: { type: String},
    description: { type: String},
    messages: [MessageSchema]
}, {timestamps: true});
module.exports.Video = mongoose.model('Video', VideoSchema)