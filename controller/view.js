const Note = require('../models/noteModel');

exports.get_all_notes = async (req , res)=>{
    let notes = [];
    if (req.user){
        notes = await Note.find({user: req.user._id});
    }
    res.status(200).render('index',{
        user: req.user,
        notes,
        title: "home"
    });
};

exports.login = (req , res)=>{
    res.status(200).render('login' , {
        title: "login page"
    });
};

exports.register =  (req , res)=>{
    res.status(200).render('register', {
        title: "register"
    });
};


exports.logout = (req , res)=>{
    res.cookie('jwt' , 'loggingout');
    res.redirect('/');
};


exports.remove_note = async (req , res)=>{
    await Note.findByIdAndRemove(req.params.id);
    res.status(200).redirect('/');
};


exports.get_add_new_note_page = (req , res)=>{
    res.status(200).render('add' , {
        user: req.user,
        title: "add new note"
    });
};


exports.create_new_note =  async (req , res)=>{
    const note = await Note.create({
        user: req.user._id,
        title: req.body.title,
        note: req.body.note,
    });
    res.status(200).redirect('/');
};


exports.get_update_page = async (req , res)=>{
    const note = await  Note.findById( req.params.id);
    res.status(200).render('update' , {
        user: req.user,
        title: "update note",
        note
    });
};


exports.update_function = async (req , res)=>{
    await Note.findByIdAndUpdate(req.params.id, {
        user: req.user._id,
        title: req.body.title,
        note: req.body.note,
    }, {new: true});
    res.status(200).redirect(`/update/${req.params.id}`);
};