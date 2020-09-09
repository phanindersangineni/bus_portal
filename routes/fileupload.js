var multer  = require('multer')
exports.upload = function(req, res) {

   var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './app/myRequestImages/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

	 var upload = multer({ //multer settings
        storage: storage
    }).single('file');
};
/*var fs = require('fs');
exports.upload = function(req, res) {
	
	var image = req.body.file;
	var imageName = "image-"+Date.now()+".jpg";
	var base64Data = image.substring(image.indexOf(','),image.length);
	var imagePath = __dirname.substring(0, __dirname.lastIndexOf('\\')) + '\\public\\app\\myRequestImages\\';
	
	res.status(200);
	res.end();
	
	fs.writeFile(imagePath + imageName, base64Data,'base64', function(err) {
	      console.log(err);
	});
};
*/