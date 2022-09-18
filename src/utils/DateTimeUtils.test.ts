import TimeAgo from "javascript-time-ago";
import { addMonths, parseDateTimeFromMongo } from "./DateTimeUtils";
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);
// Date.now = jest.fn(() => 1663277045830); // new Date("2022-09-17T13:47:36.000Z").getUTCDate()

jest
  .useFakeTimers()
  .setSystemTime(new Date('2022-09-17T13:47:36.000Z'));

it('DateTimeUtils.parseDateTimeFromMongo should convert ISODate from MongoDB', () => {
  const result = parseDateTimeFromMongo(new Date("2022-02-13T14:13:09.000Z"));
  expect(result).toBe("7 months ago");
});

it('DateTimeUtils.parseDateTimeFromMongo should accept undefined', () => {
  const result = parseDateTimeFromMongo(undefined);
  expect(result).toBeUndefined();
});


it('DateTimeUtils.addMonths should add month', () => {
  const result = addMonths(new Date("2022-02-01")).toISOString();
  expect(result).toBe(new Date("2022-03-01").toISOString());
});

it('DateTimeUtils.addMonths should add month adjusting day of month', () => {
  const result = addMonths(new Date("2022-01-30")).toISOString();
  expect(result).toBe(new Date("2022-03-02").toISOString());
});

it('DateTimeUtils.addMonths should add month spilling thru year', () => {
  const result = addMonths(new Date("2022-12-30")).toISOString();
  expect(result).toBe(new Date("2023-01-30").toISOString());
});