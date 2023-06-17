const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createToken');
// const checkPermissions = require('./checkPermissions');
const sendVerificationEmail = require('./sendVerification')
// const sendResetPasswordEmail = require('./sendResetPasswordEmail')
// const createHash = require('./createHash')

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,

  sendVerificationEmail,
  
};
