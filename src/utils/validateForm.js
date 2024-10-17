export const validateLoginForm = (formData) => {
  let errors = {};
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }
  if (!formData.password.trim()) {
    errors.password = "Password is required";
  } else if (formData.password.length < 5) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const validateSignupForm = (formData) => {
  let errors = {};

  if (!formData.fullname.trim()) {
    errors.fullname = "Fullname name is required";
  }
  if (!formData.username.trim()) {
    errors.username = "username is required";
  }
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }
  if (!formData.password.trim()) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (formData.phone.length < 11) {
    errors.phone = "Phone must be 11 characters long";
  }
  if (!formData.role.trim()) {
    errors.role = "role is required";
  }
  return errors;
};

export const validateCampaignForm = (formData) => {
  let errors = {};
  if (!formData.title.trim()) {
    errors.title = "Title is required";
  }
  if (!formData.goalAmount.trim()) {
    errors.goalAmount = "Goal Amount is required";
  }
  if (!formData.description.trim()) {
    errors.description = "Description is is required";
  }
  if (!formData.endDate.trim()) {
    errors.endDate = "endDate is is required";
  }

  return errors;
};

export const validateOrganizationForm = (formData) => {
  let errors = {};
  if (!formData.organizationName.trim()) {
    errors.organizationName = "Organization name is required";
  }
  if (!formData.missionStatement.trim()) {
    errors.missionStatement = "Mission statement is required";
  }
  return errors;
};
