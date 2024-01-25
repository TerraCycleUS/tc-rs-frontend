export default function forUpdateUser(user) {
  const userFields = user;
  if (userFields.retailerId === "") userFields.retailerId = null;
  delete userFields.status;
  delete userFields.id;
  delete userFields.role;
  delete userFields.lastLogin;
  delete userFields.lastLogout;
  delete userFields.isTwoFaEnabled;
  return userFields;
}
