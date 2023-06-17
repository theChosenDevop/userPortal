const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getAllUsers = async (req,res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json({users})
}
const getSingleUser = async (req,res) => {
  const user = await User.findOne({ _id: req.params.id})
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : $req.params.id`)
  }
  res.status(StatusCodes.OK).json({ user })

}
const updateUser = async (req,res) => {
    const { email, name } = req.body
    if (!email || !name) {
        throw new CustomError.BadRequestError('Please provide all values')
    }
    const user = await User.findOneAndUpdate(
       {user: req.params.id},
        { email, name },
        { new: true, runValidators: true }
    )
        res.status(StatusCodes.OK).json({ user })
}
const showCurrentUser = async (req,res) => {
   res.status(StatusCodes.OK).json({ user: req.user })
}
const updateUserPassword = async (req,res) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values')
    }
    const user = await User.findOne({_id: req.user._id})

    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    user.password = newPassword

    await user.save()
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' })
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}