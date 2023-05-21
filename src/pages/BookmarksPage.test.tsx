import renderer from 'react-test-renderer';
import BookmarksPage from './BookmarksPage';
import MockBookmarksRepository from '../domain/repository/bookmarks/MockBookmarksRepository';
import MockTagsRepository from '../domain/repository/tags/MockTagsRepository';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { jestHacks } from '../utils/JestUtils';


describe('BookmarksPage tests', () => {
  beforeAll(() => {
    jestHacks();
  });

  it('BookmarksPage renders correctly', () => {
    const bookmarksRepository = new MockBookmarksRepository();
    const tagsRepository = new MockTagsRepository();

    const tree = renderer
      .create(
        <BrowserRouter>
          <AppProvider i18n={translations}>
            <BookmarksPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />
          </AppProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});