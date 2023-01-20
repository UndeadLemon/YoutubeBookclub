const { response } = require('express');
const { Video } = require('../models/video.model')

module.exports.createVideo = (req, res) => {
    const { title, url, description } = req.body;
    Video.create({ title, url, description })
        .then(video => res.json(video))
        .catch(err => res.json(err));
}
module.exports.getAllVideo = (req, res) => {
    Video.find({})
        .then(allVideos => res.json(allVideos))
        .catch(err => res.json(err));
}
module.exports.getOneVideo = (req, res) => {
    Video.findOne({ _id: req.params.id })
        .then(video => res.json(video))
        .catch(err => res.json(err));
}
module.exports.updateOneVideo = (req, res) => {

    Video.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(updatedVideo => res.json(updatedVideo))
        .catch(err => res.json(err))
}
module.exports.deleteOneVideo = (req, res) => {

    Video.findOneAndDelete({ _id: req.params.id })
        .then(deletedVideo => res.json(deletedVideo))
        .catch(err => res.json(err))
}

module.exports.getAllVideoMessages = (req, res) => {
    Video.findById(req.params.id)
        .then((video) => {
            res.json(video.messages)
        })
        .catch(err => res.json(err))
}

module.exports.createMessage = (req, res) => {
    Video.findByIdAndUpdate(req.params.id, {
        $push: {messages: req.body}
    }, {
        new: true
    })
    .then(video => {
        res.json(video)
    })
    .catch(err => res.json(err))
    }
    
