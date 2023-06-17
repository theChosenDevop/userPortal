const BadRequestError = require('./BadRequestError')
const UnauthenticatedError  = require('./UnauthenticatedError')
const UnauthorizedError = require('./Unauthorized')
const NotFoundError = require ('./notFound')
const CustomAPIError = require('./customErrors')

module.exports = {
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  };