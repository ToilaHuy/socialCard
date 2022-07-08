const router = require('express').Router();
const { findById } = require('../model/Card');
const Card = require('../model/Card');

router.post('/add', async (req, res) => {
    const newCard = new Card(req.body);
    console.log(newCard);
    await newCard
        .save()
        .then((data) => {
            // res.status(201)
            res.send({
                message: 'Card created successfully!!',
                newCard: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating user',
            });
        });
});

//Get all card
router.get('/', async (req, res) => {
    try {
        const getAllCard = await Card.find();
        console.log(getAllCard);
        return res.status(200).json(getAllCard);
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
        });
    }
});

//Get detail card
router.get('/:id', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        res.status(200).json(card);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/add/:id', async (req, res) => {
    try {
        const comment = await comment.create(req.body.body);
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update card
router.put('/:id', async (req, res) => {
    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true },
        );
        res.status(200).json(updatedCard);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.put('/heart/:id', async (req, res) => {
    const card = await Card.findById(req.params.id);
    try {
        const updatedHeart = await Card.findByIdAndUpdate(
            req.params.id,
            {
                $set: { heart: card.heart + 1 },
            },
            { new: true },
        );
        console.log('card', card.heart);
        res.status(200).json(updatedHeart);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const cardDelete = await Card.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json(cardDelete);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/destroy/:id', async (req, res) => {
    try {
        const cardDelete = await Card.delete({ _id: req.params.id });
        res.status(200).json(cardDelete);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/revert/:id', async (req, res) => {
    const card = await Card.findById(req.params.id);
    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            {
                // $set: req.body,
                deleted: card.deleted === false ? true : false,
            },
            { new: true },
        );
        res.status(200).json(updatedCard);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.patch('/restore/:id', async (req, res) => {
    try {
        const cardDelete = await Card.restore({ _id: req.params.id });
        res.status(200).json(cardDelete);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
