import renderer from 'react-test-renderer';
import MockBookmarksRepository from '../domain/repository/bookmarks/MockBookmarksRepository';
import { BrowserRouter } from 'react-router-dom';
import BookmarkPage from './BookmarkPage';
import MockCommentsRepository from '../domain/repository/comments/MockCommentsRepository';
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { jestHacks } from '../utils/JestUtils';

jestHacks();

it('BookmarkPage renders correctly', () => {
  const bookmarksRepository = new MockBookmarksRepository();
  const commentsRepository = new MockCommentsRepository();

  const tree = renderer
    .create(
      <BrowserRouter>
        <AppProvider i18n={translations}>
          <BookmarkPage bookmarksRepository={bookmarksRepository} commentsRepository={commentsRepository} />
        </AppProvider>
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});