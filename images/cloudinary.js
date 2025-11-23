const cloudinary = require('cloudinary').v2;

cloudinary.config({
     cloud_name : `${process.env.CLOUDINAR_CLOUD_NAME}`,
     api_key : `${process.env.CLOUDINAR_API_KEY}`,
     api_secret : `${process.env.CLOUDINAR_API_SECRET}`
});

module.exports = cloudinary;