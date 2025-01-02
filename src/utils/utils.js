function toDateString(date = "") {
  if (date == "") {
    return "";
  }

  let string = new Date(date);

  return string.toLocaleDateString("en-GB");
}

function promiseResolver(promises) {
  try {
    return Promise.all([...promises]);
  } catch (err) {}
}

export { toDateString };
