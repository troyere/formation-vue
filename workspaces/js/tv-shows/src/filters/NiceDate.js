import Moment from "moment";

export default str => {
  return Moment(str, "YYYY-MM-DD", true)
    .locale("fr")
    .format("LL");
};
