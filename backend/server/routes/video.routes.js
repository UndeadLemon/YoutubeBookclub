
const VideoController = require('../controllers/video.controller');
module.exports = app => {
    app.get('/api/video/', VideoController.getAllVideo)
    app.get('/api/video/:id', VideoController.getOneVideo)
    app.post('/api/video/', VideoController.createVideo)
    app.put('/api/video/:id', VideoController.updateOneVideo)
    app.delete('/api/video/:id', VideoController.deleteOneVideo)
    app.post('/api/video/:id', VideoController.createMessage)
}   