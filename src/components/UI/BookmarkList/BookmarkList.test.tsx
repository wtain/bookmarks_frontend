import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import BookmarkList from './BookmarkList';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import BookmarkDto from '../../../domain/dto/BookmarkDto';
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { jestHacks } from '../../../utils/JestUtils';

TimeAgo.addDefaultLocale(en);
jest
  .useFakeTimers()
  .setSystemTime(new Date('2022-09-17T13:47:36.000Z'));

function run_test(bookmarks: BookmarkDto[]) {

  const tree = renderer
  .create(
    <BrowserRouter>
      <AppProvider i18n={translations}>
        <BookmarkList bookmarks={bookmarks}  />
      </AppProvider>
    </BrowserRouter>
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
}

describe('BookmarkList tests', () => {
  beforeAll(() => {
    jestHacks();
  });

  it('BookmarkList renders correctly', () => {
    const bookmarks: BookmarkDto[] = [
      {
        summary: 'Tests',
        contents: 'For UI and server',
        id: '23f69d44-2080-430e-a53d-794689a78754',
        created: new Date("2022-02-06T20:37:07.000Z"),
        tags: [
          { name: 'UI', id: 'c7bd914c-d9ff-49ea-822e-092e95252330' },
          { name: 'Server', id: '59a6fb07-46b0-4e24-9a99-ab3e7a0d4509' },
          {
            name: 'Infrastructure',
            id: '542d0f21-1bfb-4eab-939e-924ca28976da'
          },
          {
            name: 'CodeQuality',
            id: '56ca383f-eff9-4b5f-a1bd-cf8db9a5d4b1'
          }
        ],
        isDone: false,
        updated: new Date("2022-02-13T16:26:45.000Z")
      },
      {
        summary: 'Bookmark - reminder',
        contents: 'Reminder/due date property for bookmark',
        id: '633a089a-1076-4904-8650-4160db0549a9',
        created: new Date("2022-02-13T16:21:02.000Z"),
        tags: [
          {
            name: 'Functionality',
            id: 'c2ea5a69-9e52-4b1e-a6ec-53393452cd35'
          }
        ],
        isDone: false
      },
      {
        summary: 'Edit tags',
        contents: 'Ability to edit tags for existing bookmarks',
        id: 'ab2809a7-de53-4494-8ece-2aeecadce254',
        created: new Date("2022-01-30T20:48:19.000Z"),
        tags: [ { name: 'Task', id: '4b68bb47-c561-4958-8682-ea84ca39773d' } ],
        isDone: true,
        updated: new Date("2022-02-13T14:13:09.000Z")
      }
    ]

    run_test(bookmarks);
  });

  it('BookmarkList renders correctlyempty bookmark list', () => {
    const bookmarks: BookmarkDto[] = [];

    run_test(bookmarks);
  });
});