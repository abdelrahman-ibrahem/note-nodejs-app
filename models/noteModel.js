const mongoose = require('mongoose');
const slugify = require('slugify');

const noteSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 25
    },
    note:{
        type: String,
        required: true
    },
    slug: String
});

noteSchema.pre('save', function(next){
    this.slug = slugify(this.title, { lower: true });
    next();
});

const Note = mongoose.model('Note' , noteSchema);
module.exports = Note;