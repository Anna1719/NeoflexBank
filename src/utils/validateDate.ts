export const validateDate = (value: string | Date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  const dateString =
    typeof value === "string" ? value : value.toLocaleDateString("en-US");
  if (!dateRegex.test(dateString)) {
    return "Date must be in the format YYYY-MM-DD.";
  }

  const birthDate = new Date(value);

  if (isNaN(birthDate.getTime())) {
    return "Invalid date";
  }

  const today = new Date();
  const ageLimit = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  if (birthDate > ageLimit) {
    return "You must be at least 18 years old.";
  }

  return true;
};
