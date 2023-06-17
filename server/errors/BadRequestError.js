const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customErrors");

class BadRequestError extends CustomAPIError{
    constructor(message) {
        super(message);
        this.statuscode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError