import TimeAgo from 'javascript-time-ago';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import CalendarPage from './CalendarPage';
import en from 'javascript-time-ago/locale/en.json';
import MockDatesRepository from '../domain/repository/dates/MockDatesRepository';
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { jestHacks } from '../utils/JestUtils';

TimeAgo.addDefaultLocale(en);
jest
  .useFakeTimers()
  .setSystemTime(new Date('2022-09-17T13:47:36.000Z'));

describe('CalendarPage test', () => {

  beforeAll(() => {
    jestHacks();
  });

  it('CalendarPage renders correctly', () => {

    const datesRepository = new MockDatesRepository();

    const tree = renderer
      .create(
        <BrowserRouter>
          <AppProvider i18n={translations}>
            <CalendarPage datesRepository={datesRepository} />
          </AppProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});