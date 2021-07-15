const mongoose = require('mongoose')

let noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    created_At: { type: Date, default: Date.now },
    updated_At: { type: Date, defulta: Date.now },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

noteSchema.index({ 'title': 'text', 'body': 'text' })

module.exports = mongoose.model('Note', noteSchema)