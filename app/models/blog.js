const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    authName: {
        type: String,
        required: true
    },
    isPublish: {
        type: Boolean,
        default: false
    },

},
    {
        timestamps: true,
        versionKey: false
    })

const BlogModel = mongoose.model('blog', BlogSchema);
module.exports = BlogModel;