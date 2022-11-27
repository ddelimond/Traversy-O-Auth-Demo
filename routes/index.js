const express = require('express');
// creation of router 
const router = express.Router()
// Auth middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')
// Stories
const story = require('../models/Story')



// @desc  login/landing page 
// @route GET / 
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

// @desc  Dashboard 
// @route GET /dashboard 
router.get('/dashboard', ensureAuth, async (req, res) => {
    console.log(req.user)
    try {
        const stories = await story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')

    }
})





module.exports = router


