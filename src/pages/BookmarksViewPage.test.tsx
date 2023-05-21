import renderer from 'react-test-renderer';
import MockBookmarksRepository from '../domain/repository/bookmarks/MockBookmarksRepository';
import MockTagsRepository from '../domain/repository/tags/MockTagsRepository';
import { BrowserRouter } from 'react-router-dom';
import BookmarksViewPage from './BookmarksViewPage';
import { jestHacks } from '../utils/JestUtils';
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";

describe('BookmarksViewPage tests', () => {
  beforeAll(() => {
    jestHacks();
  });

  it('BookmarksViewPage renders correctly', () => {
    const bookmarksRepository = new MockBookmarksRepository();
    const tagsRepository = new MockTagsRepository();

    const tree = renderer
      .create(
        <BrowserRouter>
          <AppProvider i18n={translations}>
            <BookmarksViewPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />
          </AppProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});