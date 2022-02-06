const express = require('express');
const router = express.Router();
const {checkAuthView, checkAuth} = require('../controller/user');
const viewController = require('../controller/view');



router.get('/' , checkAuthView , viewController.get_all_notes);
router.get('/login'  , viewController.login);
router.get('/register' ,viewController.register);
router.get('/logout', viewController.logout);
router.get('/delete/:id', viewController.remove_note);
router.get('/add', checkAuthView , viewController.get_add_new_note_page);
router.post('/add' ,checkAuthView , viewController.create_new_note);
router.get('/update/:id' ,  checkAuthView, viewController.get_update_page);
router.post('/update/:id' , checkAuthView , viewController.update_function);
module.exports = router;