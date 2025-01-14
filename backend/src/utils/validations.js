function validatePassword(password) {
  const error = [];
  //length check
  if (password.length < 8) {
    error.push("Password must be at least 8 characters long");
  }

  // lowercase check
  if (!/[a-z]/.test(password)) {
    error.push("Password must contain at least one lowercase character");
  }

  // uppercase check
  if (!/[A-Z]/.test(password)) {
    error.push("Password must contain at least one uppercase character");
  }

  // number check
  if (!/[0-9]/.test(password)) {
    error.push("Password must contain at least one number");
  }

  // special character check
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    error.push("Password must contain at least one special character");
  }

  return {
    isValid: error.length === 0,
    error,
  };
}

const validateUpdate = (req) => {
  const validUpdatesFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
    "occupation",
    "location",
  ];
  const requestedUpdates = req.body;
  const isValidUpdate = Object.keys(requestedUpdates).every((field) =>
    validUpdatesFields.includes(field)
  );
  return isValidUpdate;
};

module.exports = {
  validatePassword,
  validateUpdate,
};
