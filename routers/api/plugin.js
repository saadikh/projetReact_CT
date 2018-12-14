const express = require('express');
const router = express.Router();
const Plugin = require('../../models/Plugin');
const path = require('path');
const multer = require('multer');
const imagePath = 'storage/images';
const authentication = require('../../middlewares/auth');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagePath)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    Plugin
        .find()
        .then(plugins => res.json(plugins));
});

router.get('/:id',(req,res) => {
    Plugin
        .findById(req.params.id)
        .then(plugin => {
            res.json(plugin);
        })
})

router.get('/tag/:tag',(req,res) => {
    Plugin
        .find({tag : {$in:[ { "id" : req.params.tag, "text" : req.params.tag }]}})
        .then(plugin => {
            res.json(plugin);
        })
})
router.get('/search/:keyword',(req,res) => {
    console.log(req.params.keyword);
    
    Plugin
        .find({
            $text:{$search: req.params.keyword}},
            {score:{$meta:'textScore'}
        })
        .sort({score:{$meta:'textScore'}})
        .exec( (err, results) => {
            if(!err){
                res.json(results);
            }else{
                console.log(err);
            }
        }) 
})

// router.post('/upload', upload.single('image'), (req, res) => {
//     console.log(req.file);
// })

router.post('/', upload.single('imageFile'), (req, res) => {
    console.log(JSON.parse(req.body.tag));
    console.log("post method called");
    const newPlugin = new Plugin({
        sellerName: req.body.sellerName,
        siteSellerUrl: req.body.siteSellerUrl,
        creator: req.body.creator,
        // imageUrl: imagePath+'/'+req.file.filename,
        imageUrl: '/images/'+req.file.filename,
        description: req.body.description,
        tag: JSON.parse(req.body.tag),
        parametres: JSON.parse(req.body.parametres)
    });
    newPlugin.save().then(plugin => res.json(plugin));
});

router
    .delete('/:id', (req, res) => {
        Plugin
            .findById(req.params.id)
            .then(plugin => plugin.remove().then(() => res.json({ success: true })))
            .catch(err => res.status(404).json({ err }));
    })





module.exports = router;