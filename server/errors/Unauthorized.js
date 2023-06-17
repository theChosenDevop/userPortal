const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customErrors")

class UnauthorizedError extends CustomAPIError{
    constructor(message) {
        super(message);
        this.statuscodes = StatusCodes.FORBIDDEN
    }
}

module.exports = UnauthorizedError