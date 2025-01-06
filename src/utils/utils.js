function toDateString(date = "") {
  if (date == "") {
    return "";
  }

  let string = new Date(date);

  return string.toLocaleDateString("en-GB");
}

export { toDateString };
