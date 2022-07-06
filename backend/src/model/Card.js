const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');
const Card = new Schema(
    {
        name: {
            type: String,
        },
        avatar: { type: String },
        description: { type: String },
        image: { type: String },
        heart: { type: String },
    },
    {
        timestamps: true,
    },
    // status : 1  ==> 2 , 2 ==> 1
);

Card.plugin(mongoose_delete);
module.exports = mongoose.model('Card', Card);
