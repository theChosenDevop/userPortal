const User = require("../models/User")
const Token = require("../models/Token")
const { StatusCodes } = require('http-status-codes')
const CustomError = require("../errors")
const { createTokenUser, sendVerificationEmail, attachCookiesToResponse } = require('../utils')

const crypto = require('crypto')

const register = async (req, res) => {
    const { email, name, password } = req.body

    const emailAlreadyExists = await User.findOne({ email })
    
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError("Email ALready Exists")
    }
    const isFirstAccout = (await User.countDocuments({})) === 0

    const role = isFirstAccout ? "admin" : "user"

    const verificationToken = crypto.randomBytes(40).toString("hex")

    const user = await User.create({name, email, password, verificationToken})

    const origin = "http://localhost:3000/user_portal/"

    await sendVerificationEmail({
        name: user.name,
        email: user.email,
        verificationToken: user.verificationToken,
        origin,
        role
    })

    // res.status(StatusCodes.CREATED).json({msg: 'Success! Please check your email to verify account'})
    res.status(StatusCodes.CREATED).json({user})
}

const verifyEmail = async (req, res) => {
    const { verificationToken, email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw new CustomError.UnauthenticatedError("verification failed")
    }
    if(user.verificationToken !== verificationToken) {
        throw new CustomError.UnauthenticatedError("verification failed")
    }
    user.isVerified = true;
    user.verifiedDate = Date.now()
    user.verificationToken = ""

    await user.save()
    
    res.status(StatusCodes.OK).json({ msg: "Email verified" })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        throw new CustomError.BadRequestError("Please provide email and password")
    }
    const user = await User.findOne({ email })

    if (!user) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials")
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid password')
    }

    if (!user.isVerified) {
        throw new CustomError.UnauthenticatedError("Please verify your email")
    }
    const tokenUser = createTokenUser(user)
    // create refresh token 
    let refreshToken = ""
    // create  for existing token
    const existingToken = await Token.findOne({ user: user._id })
    if (existingToken) {
        const { isValid } = existingToken
        if(!isValid) {
            throw new CustomError.UnauthenticatedError("Invalid Credentials")
        }
        refreshToken = existingToken.refreshToken
        attachCookiesToResponse({ res, user: tokenUser, refreshToken })
        res.status(StatusCodes.OK).json({ user: tokenUser });
        return;
    }

    refreshToken = crypto.randomBytes(40).toString("hex")
    const userAgent = req.headers["user-agent"]
    const ip = req.ip
    const userToken= { refreshToken, ip, userAgent, user: user._id }

    await Token.create(userToken)

    attachCookiesToResponse({ res, user: tokenUser, refreshToken })

    res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
    await Token.findOneAndDelete({ user: req.user.userId})

    res.cookie("refreshToken", "logout", {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.cookie("accessToken", "logout", {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    // find userIs
    res.status(StatusCodes.OK).json({ msg: "user logged out!" })
}

const forgotPassword = async (req, res) => {
    res.send('forgot password')
}

const resetPassword = async (req, res) => {
    res.send('reset Password')
}

module.exports = {
    resetPassword,
    forgotPassword,
    login,
    logout,
    register,
    verifyEmail
}