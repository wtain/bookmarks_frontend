import moment from "moment";

export function parseDateTimeFromMongo(datetime: Date | undefined) {
  if (datetime === undefined) {
    return undefined;
  }
  return moment(datetime.toISOString()).fromNow();
}

export function addOneMonth(date: Date): Date {
  const result = new Date(date);
  if (result.getMonth() == 12) {
    result.setFullYear(result.getFullYear()+1, 1);
  } else {
    result.setMonth(result.getMonth() + 1)
  }
  return result;
}

export function range(start: number, end: number): number[] {
  return Array(end - start + 1).fill(0).map((_, idx) => start + idx + 1)
}

export function firstDayOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setDate(1)
  return result;
}

function days(n: number): number {
  return n * 24 * 60 * 60 * 1000;
}

export function lastDayOfMonth(date: Date): Date {
  const firstDay1 = firstDayOfMonth(date);
  const firstDay2 = addOneMonth(firstDay1);
  return new Date(firstDay2.valueOf() - days(1));
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