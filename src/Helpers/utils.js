export const formatDate = (dateStr = "") => dateStr.slice(0, 10);

export const shortStr = (str = "", length = 0) =>
  (!length || length >= str.length) ? str : str.slice(0, length) + "...";

