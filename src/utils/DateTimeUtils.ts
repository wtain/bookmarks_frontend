import moment from "moment";

export function parseDateTimeFromMongo(datetime: Date | undefined) {
  if (datetime === undefined) {
    return undefined;
  }
  return moment(datetime.toISOString()).fromNow();
}

export function addOneMonth(date: Date): Date {
  let result = new Date(date);
  result.setMonth(result.getMonth() + 1)
  return result;
}

export function firstDayOfMonth(date: Date): Date {
  let result = new Date(date);
  result.setDate(1)
  return result;
}

export function getDatePortion(date: Date): string {
  const dateCopy = new Date(date);
  dateCopy.setUTCHours(0);
  dateCopy.setMinutes(0);
  const momentForDate = moment(dateCopy);
  return momentForDate.format('YYYY-MM-DD');
}

export function datesEqual(date1: Date, date2: Date): boolean {
  return getDatePortion(date1) === getDatePortion(date2);
}