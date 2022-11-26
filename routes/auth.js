const express = require('express');
const passport = require('passport');
// creation of router 
const router = express.Router()

// @desc  auth withgoogle 
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc  google with callback  
// @route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard')
    }
)


// @desc  logout user 
// @route GET /auth/logout
// change: passport 0.6 requires logout to be async
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        res.redirect('/')
    })
})

module.exports = router



