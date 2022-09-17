import TimeAgo from "javascript-time-ago";
import { parseDateTimeFromMongo } from "./DateTimeUtils";
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