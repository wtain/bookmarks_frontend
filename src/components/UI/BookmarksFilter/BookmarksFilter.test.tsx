import renderer from 'react-test-renderer';
import MockTagsRepository from '../../../domain/repository/tags/MockTagsRepository';
import { BrowserRouter } from 'react-router-dom';
import BookmarksFilter from './BookmarksFilter';
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { jestHacks } from '../../../utils/JestUtils';

describe('TagCloud tests', () => {
  beforeAll(() => {
    jestHacks();
  });

  it('BookmarksFilter renders correctly', () => {
    const tagsRepository = new MockTagsRepository();

    const tree = renderer
      .create(
        <BrowserRouter>
          <AppProvider i18n={translations}>
            <BookmarksFilter tagsRepository={tagsRepository} />
          </AppProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});