const express = require('express');
const router = express.Router();
const {checkAuth} = require('../controller/user');
const noteController = require('../controller/note');

router.get('/' , checkAuth , noteController.get_all_notes);
router.post('/' , checkAuth ,noteController.create_note );
router.delete('/:id' , checkAuth , noteController.delete_note);
router.patch('/:slug' , checkAuth , noteController.update_note);

module.exports = router;