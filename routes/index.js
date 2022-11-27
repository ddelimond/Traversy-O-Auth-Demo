const express = require('express');
// creation of router 
const router = express.Router()
// Auth middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')



// @desc  login/landing page 
// @route GET / 
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

// @desc  Dashboard 
// @route GET /dashboard 
router.get('/dashboard', ensureAuth, (req, res) => {
    console.log(req.user)
    res.render('dashboard')
})





module.exports = router


