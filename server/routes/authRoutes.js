const express = require('express')
const router = express.Router()

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/verify-email').post(verifyEmail)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)
router.route('/logout').delete(logout)

module.exports = router