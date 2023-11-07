const { l } = require("../common/logger");
exports.manageError = (err, uniqueKeysMapList = []) => {
  l.error(err);
  let errObject = {
    message: "Error in operation",
    code: 400,
    errors: [],
    ...err,
  };

  const code = err.code || err.statusCode;
  if (Array.isArray(err.errors)) {
    let msg = "";
    err.errors.forEach(function (err) {
      if (msg) msg += " ,";
      msg += err.message;
    });

    errObject.message = msg;

    //Set default status code to 422
    errObject.code = 422;
  }

  //User generated errors, like duplicate email, token expired

  if (err.message && code) {
    if (code === 11000) {
      let message = "";
      errObject.code = 400;
      errObject.errors = [];
      for (const prop in err.keyValue) {
        errObject.errors.push({
          [prop]: `${err.keyValue[prop]} already exists`,
        });
        if (message) {
          message += ", ";
        }
        message += `${prop} with ${err.keyValue[prop]} already exists!`;
      }
      errObject.message = message;
      // uniqueKeysMapList.forEach((uniqueKeyMap) => {
      //   if (err.message.includes(uniqueKeyMap.searchable)) {
      //     errObject[uniqueKeyMap.key] = {
      //       message: `${uniqueKeyMap.key} already exists`,
      //     };
      //   }
      // });
    } else {
      errObject.message = err.message;
      errObject.code = code;
    }
  }
  //Uncaught exception
  else if (err.message && err.name == "TypeError") {
    errObject.message = err.message;
    errObject.code = 422;
  } else if (err.message) {
    errObject.message = err.message;
    errObject.code = 422;
  }

  // Handle server errors
  if (
    typeof errObject.code !== "number" ||
    errObject.code > 500 ||
    errObject.code < 400
  ) {
    errObject.code = 400;
    errObject.message = "Please contact with admin for this issue!";
  }
  return errObject;
};

exports.generateErrorObject = (errorCode, message, errors = []) => {
  return {
    code: errorCode,
    message,
    errors,
  };
};
