import Moment from "moment";

export default str => {
  if (!str) return str;
  return Moment(str, "YYYY-MM-DD", true)
    .locale("fr")
    .format("LL");
};
