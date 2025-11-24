const router = require('express').Router();
const productModel = require('../model/productModel');
const categoryModel = require('../model/categoryModel');
const upload = require('../images/multer');
const cloudinary = require('../images/cloudinary');
const messageModel = require('../model/messageModel');

router.get('/ping', async (req, res) => {
  res.send('Server Running....');
});

router.post('/post-product', upload.array('images', 4), async (req, res) => {

  const productData = req.body;
  // console.log("body ",productData, "files ",req.file);
  if (productData) {
    try {
      const imageurl = [];
      for (const file of req.files) {
        const baseData = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(baseData, {
          resource_type: 'image',
          folder: 'sk-images'
        })

        imageurl.push(result.secure_url);
      }

      const product = new productModel({
        name: productData.name,
        discription: productData.discription,
        category: productData.category,
        price: productData.price,
        offerPrice: productData.offerPrice,
        image: imageurl,
        link: productData.link
      });

      await product.save();

      const temp = await productModel.find();
      // console.log(temp);


      return res.status(201).json({
        success: true,
        message: "Product uploaded successfully",
        products: temp
      });

    } catch (e) {
      return res.status(500).json({
        success: false,
        message: e.message
      });
    }
  } else {
    res.status(201).json({
      success: false,
      message: "All fields are required"
    });
  }
});


router.post('/add-category', upload.single('image'), async (req, res) => {

  const categoryData = req.body;
  const file = req.file;

  if (categoryData) {
    try {

      const baseData = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      const result = await cloudinary.uploader.upload(baseData, {
        resource_type: 'image',
        folder: 'sk-images'
      })

      const category = new categoryModel({
        name: categoryData.name,
        image: result.secure_url
      });

      await category.save();

      const temp = await categoryModel.find();

      return res.status(201).json({
        success: true,
        message: "category created",
        categories: temp
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "All fields are required"
    });
  }

});



router.get('/get-category', async (req, res) => {
  const category = await categoryModel.find();
  res.status(200).json({
    success: true,
    category
  });
});



router.patch('/update-product', async (req, res) => {
  const { data } = req.body;
  const { id, name, category, price, offerPrice, link } = data;

  if (id) {
    try {

      await productModel.findByIdAndUpdate(id, { name, category, price, offerPrice, link });

      const products = await productModel.find();

      res.status(200).json({
        success: true,
        message: "Product Updated",
        products
      });

    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "Id required"
    });
  }

});


router.delete('/delete-product', async (req, res) => {
  const { id } = req.body;

  if (id) {
    try {

      await productModel.findByIdAndDelete(id);

      const products = await productModel.find();

      res.status(200).json({
        success: true,
        message: "Product Deleted",
        products
      });

    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "Id required"
    });
  }

});


router.get('/get-product', async (req, res) => {

  try {

    const products = await productModel.find();

    res.status(200).json({
      success: true,
      products
    });

  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message
    });
  }
});


router.get('/get-message', async (req, res) => {

  let message = await messageModel.find();
  message = message[0];

  res.status(200).json({
    success: true,
    message: message.message
  })
});


router.post('/set-message', async (req, res) => {
  const { messageInput } = req.body;

  const messageArray = await messageModel.find();

  try {

    if (!messageArray[0]) {
      new messageModel.create({
        message: messageArray
      });
    } else {
      const id = messageArray[0]._id;
      await messageModel.findByIdAndUpdate(id, { message: messageInput },);
    }

    res.status(200).json({
      success: true
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
});


router.post('/check-admin', async (req, res) => {
  const { name, email, password } = req.body;
  if (name === 'sk' && email === 'sk@gmail.com' && password === 'sk') {
    return res.status(200).json({
      success: true,
      message: "username and password are correct"
    })
  } else {
    return res.status(200).json({
      success: false,
      message: "Incorrect username or password"
    })
  }
})

module.exports = router;