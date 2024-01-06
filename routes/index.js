var express = require('express');
var router = express.Router();
const upload = require('./multer');
const postModel = require('./posts');
const pdfThumbnail = require('pdf-thumbnail');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const posts = await postModel.find();
  const filteredPosts = await postModel.find();
  res.render('index', { posts, filteredPosts });
});

router.get('/add', function(req, res, next) {
  res.render('add');
});


router.post('/upload', upload.single('file'), async (req, res, next) => {
  const postData = new postModel({
    subject: req.body.oldsubject !== ""? req.body.oldsubject : req.body.newsubject,
    filename: req.file.filename,
    unitname: req.body.unitname,
    thumbnail: 'xyz',
  })

  await postData.save();
  res.redirect('/');
})

router.get('/download/:id', async (req, res, next) => {
  const pdf = await postModel.findOne({ _id: req.params.id });
  console.log(pdf);
  res.download(`public/uploads/${pdf.filename}`);
})

router.get('/filter/:subject', async (req, res, next) => {
  var subject = req.params.subject;
  const filteredPosts = await postModel.find({ subject: subject });
  const posts = await postModel.find();
  res.render('index', {filteredPosts: filteredPosts, posts: posts});
})

module.exports = router;
