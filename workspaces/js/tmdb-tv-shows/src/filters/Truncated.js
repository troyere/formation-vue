export default (str, maxLength) => {
  const enabled = maxLength && -1 !== maxLength;
  if (enabled && str.length > maxLength) {
    const ending = "...";
    const rough = str.substring(0, maxLength);
    return (
      rough.substring(0, Math.min(rough.length, rough.lastIndexOf(" "))) +
      ending
    );
  } else {
    return str;
  }
};
