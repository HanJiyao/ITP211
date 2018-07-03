var fs = require('fs');
var mime = require('mime');
var gravatar = require('gravatar');
var image_type = ['image/jpg','image/jpeg', 'image/png'];

exports.uploadImage = function(req,res){
    var src;
    var dest;
    var targetPath;
    var targetName;
    var tempPath = req.file.path;
    console.log(req.file);
}
var type = mime.lookup(req.file.mimetype);
var extension = req.file.path.split(/[. ]+/).pop();
if (image_type.indexOf(type) == -1) {
    return res.status(415).send('Supported image formats: jpeg, jpg, jpe, png');
}
targetPath = './public/images/' + req.file.originalname;

src = fs.createReadStream(tempPath);

dest = fs.createWriteStream(targetPath);
src.pipe(dest); 

src.on('error', function (err) {
    if (err) {
        return res.status(500).send({
            message: error
        });     
    }
});

src.on('end',function () {
     //create a new instance of the Images model with request body
     var imageData = {
        title: req.body.title,
        imageName: req.file.originalname,
        user_id: req.user.id
    }

    Images.create(imageData).then((newImage, created) => {
        if (!newImage) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect('/productsmanager');
    })

    fs.unlink(tempPath, function (err) {
        if (err) {
            return res.status(500).send('Something bad happened here');
        }
        // Redirect to gallery's page
        res.redirect('images-gallery');
    });
});
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};  