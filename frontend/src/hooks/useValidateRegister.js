const useValidateRegister = (values) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.userName) {
    errors.userName = "User name is required!";
  }

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Enter valid Email";
  }

  if (!values.password) {
    errors.password = "Password is required!";
  } else if (values.password.length < 6) {
    errors.password = "Password should be above 6 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Password is required!";
  } else if (values.password.length < 6) {
    errors.confirmPassword = "Password should be above 6 characters";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Enter same password in both fields";
  }

  return errors;
};

export default useValidateRegister;
