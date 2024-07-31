const validateUserUpdate = (values) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.userName) {
    errors.userName = "User name is required";
  }

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Enter valid Email";
  }

  if (!values.oldPassword) {
    errors.oldPassword = "Password is required!";
  } else if (values.oldPassword.length < 6) {
    errors.oldPassword = "Password should be above 6 characters";
  }

  if (!values.password) {
    errors.password = "Password is required!";
  } else if (values.password.length < 6) {
    errors.password = "Password should be above 6 characters";
  } else if (values.oldPassword === values.password) {
    errors.password = "Old password can't be your new password";
  }

  return errors;
};

export default validateUserUpdate;
