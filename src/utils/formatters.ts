export const formatDate = (value: string): string => {
  let formatted = value.replace(/\D/g, "");
  if (formatted.length > 4) {
    formatted = `${formatted.slice(0, 4)}-${formatted.slice(4)}`;
  }
  if (formatted.length > 7) {
    formatted = `${formatted.slice(0, 7)}-${formatted.slice(7, 9)}`;
  }
  return formatted;
};

export const formatDivisionCode = (value: string): string => {
  let formatted = value.replace(/\D/g, "");
  if (formatted.length > 3) {
    formatted = `${formatted.slice(0, 3)}-${formatted.slice(3, 6)}`;
  }
  return formatted;
};
