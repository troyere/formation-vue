export default (str, maxLength) => {
  const ending = "...";
  const enabled = maxLength && -1 !== maxLength;
  if (enabled && str.length > maxLength) {
    return str.substring(0, maxLength - ending.length) + ending;
  } else {
    return str;
  }
};
