// utils/validator.js

exports.validateUser = (user) => {
  const errors = [];

  if (!user.name || typeof user.name !== 'string') {
    errors.push('Tên không hợp lệ');
  }

  if (
    !user.email ||
    typeof user.email !== 'string' ||
    !user.email.includes('@')
  ) {
    errors.push('Email không hợp lệ');
  }

  if (user.age && typeof user.age !== 'number') {
    errors.push('Tuổi phải là số');
  }

  return errors;
};
