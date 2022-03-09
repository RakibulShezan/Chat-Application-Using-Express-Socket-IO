const uploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
  // console.log(req);
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );
  //console.log(typeof upload);
  // call the middleware function
  upload.any()(req, res, (err) => {
    //console.log(req.body);
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}
module.exports = avatarUpload;
