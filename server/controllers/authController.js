const User = require("../models/User")
// const Token 
const { StatusCodes } = require('http-status-codes')
const CustomError = require("../errors")

const crypto = require('crypto')

const register = async (req, res) => {
    res.send('register')
}