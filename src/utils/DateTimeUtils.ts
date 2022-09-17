// import TimeAgo from "javascript-time-ago";
import moment from "moment";
// import moment from "moment";

export function parseDateTimeFromMongo(datetime: Date | undefined) {
  if (datetime === undefined) {
    return undefined;
  }
  //const timeAgo = new TimeAgo('en-US');
  // example: "2022-02-13T14:13:09.000Z"
  // const localFormat = "YYYY-MM-DD[T]HH:mm:ss[.000Z]";
  // console.log("***: " + moment(datetime, localFormat).toDate());
  // return timeAgo.format(moment(datetime, localFormat).toDate());
  //return timeAgo.format(datetime);
  // console.log("*** DEBUG - Date: " + datetime.toISOString());
  // console.log("*** DEBUG = moment: " + moment(datetime.toISOString()));
  return moment(datetime.toISOString()).fromNow();
}