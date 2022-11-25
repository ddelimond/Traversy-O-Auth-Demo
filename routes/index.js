const express = require('express');

// creation of router 
const router = express.Router()

// @desc  login/landing page 
// @route GET / 
router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

// @desc  Dashboard 
// @route GET /dashboard 
router.get('/dashboard', (req, res) => {
    res.render('dashboard.hbs')
})





module.exports = router