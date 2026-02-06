module.exports = function (req, res, next) {
  res.generateResponse = (res, data, statusCode, message, errors = []) => {
    let responseObject = {};
    responseObject.data = data || "";
    responseObject.message = message || "";
    if (errors.length) {
      responseObject.errors = errors;
    }
    return res.status(statusCode).json(responseObject);
  };
  next();
};
