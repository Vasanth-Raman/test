const useValidateLogin = (values) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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

  return errors;
};

export default useValidateLogin;
