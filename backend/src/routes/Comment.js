const router = require('express').Router();
const Comment = require('../model/Comment');

router.post('/add', async (req, res) => {
    const newComment = new Comment(req.body);
    console.log(newComment);
    await newComment
        .save()
        .then((data) => {
            // res.status(201)
            res.send({
                message: 'Card created successfully!!',
                newComment: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating user',
            });
        });
});
router.get('/:cardId', async (req, res) => {
    try {
        const getAllComment = await Comment.find({
            cardId: req.params.cardId,
        });
        return res.status(200).json(getAllComment);
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
        });
    }
});

module.exports = router;
