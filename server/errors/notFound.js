const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customErrors");

class NotFound extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statuscode = StatusCodes.NotFound
    }
}

module.exports = NotFound