const Note = require('../models/noteModel');


exports.get_all_notes = async (req , res)=>{
    try{
        
        const notes = await Note.find({user: req.user._id});
       
        
        res.status(200).json({
            status: "success",
            notes
        });
    }catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        });
    }
};

exports.create_note = async (req , res)=>{
    try{
        const note = await Note.create({
            user: req.user._id,
            title: req.body.title,
            note: req.body.note,
        });
        res.status(200).json({
            status: "success",
            note
        });
    }catch(err){
        console.log(err.message);
        res.status(404).json({
            status: "failed",
            message: err.message
        });
    }
};


exports.delete_note = async (req , res)=>{
    try{
        const note = await Note.findById(req.params.id);
        if (!note){
            return res.status(400).json({
                status: "failed",
                message: "this note is not found"
            });
        }
        await Note.findByIdAndRemove(req.params.id);
        res.status(200).json({
            status: "success",
            message: "deleted"
        });
    }catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        });
    }
};

exports.update_note = async (req , res)=>{
    try{
        const note = await Note.findOne({slug: req.params.slug});
        if (!note){
            return res.status(400).json({
                status: "failed",
                message: "this note is not found"
            });
        }
        const updated = await Note.findByIdAndUpdate(note._id, req.body , {new: true});
        res.status(200).json({
            status: "success",
            note: updated
        });
    }catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        });
    }
};