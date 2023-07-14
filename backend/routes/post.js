const router = require('express').Router();
const Post = require('../models/post');

router.get('/posts', async (req, res) => {
    Post.find()
        .then(posts => res.json(posts));       // get for us all the posts from mongDb atles database, and returns it in json format
})

//add post
router.post('/', (req, res) => {

    const text = req.body.text;
    const tags = req.body.tags;
    const img = req.body.img;
    const userName = req.body.userName;

    const newPost = new Post({
        text,
        tags,
        img,
        userName,
    })

    newPost.save();
    res.json('post published successfully');
})

//like and dislike post 
router.put('/:id/like', async (req, res) => {
    try {
        console.log('the post has been liked successfully!!');
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userName)) {
            await post.updateOne({ $push: { likes: req.body.userName } });
            // res.status(200).json('post liked');
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userName } });
            // res.status(200).json('post has been disliked');
        }
        // res.json(post.likes.length);
    } catch (err) {
        res.status(500).json(err)
    }
})

//add comment
router.put('/:id/comment', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = {
            text: req.body.text,
            commentedBy: req.body.userName,
        }
        await post.updateOne({ $push: { comments: comment } })
        console.log(comment);

        res.status(200).json('post has been commented successfully')

    } catch (err) {
        res.status(500).json(err)
    }
})



//get user posts by name
router.get('/posts/:name', (req, res) => {
    Post.find({ userName: req.params.name }, (err, obj) => {
        if (err) {
            res.status(400).json('ERROR ' + err)
        }
        else {
            res.status(200).json(obj);
        }
    })
})

//get post by post id
router.get('/:id', (req, res) => {
    Post.find({ _id: req.params.id }, (err, obj) => {
        if (err) {
            res.status(400).json('ERROR ' + err)
        }
        else {
            res.status(200).json(obj);
        }
    })
})

//delete post
router.delete('/delete/:id', (req, res) => {
    Post.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json('post deleted successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;