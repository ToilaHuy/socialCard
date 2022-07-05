const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = new Schema(
    {
        cardId: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Comments', Comment);
