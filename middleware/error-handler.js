const { StatusCodes } = require('http-status-codes')
const { MongoServerError } = require('mongodb')
const { ValidationError, CastError } = require('mongoose').Error


const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later'
  }
  if (err instanceof ValidationError) {
    customError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
    customError.statusCode = 400
  }
  if (err instanceof MongoServerError) {
    if (err.code === 11000) {
      customError.msg = `Duplicated value entered for ${Object.keys(err.keyValue)} field. Try another one`
      customError.statusCode = 400
    }
  }
  if (err instanceof CastError) {
    customError.msg = `No item found with ID ${err.value._id}`
    customError.statusCode = 404
  }
  return res.status(customError.statusCode).json({ msg: customError.msg })
  // return res.status(customError.statusCode).json({ err })
}


module.exports = errorHandlerMiddleware
