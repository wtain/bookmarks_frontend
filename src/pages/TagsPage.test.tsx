import renderer from 'react-test-renderer';
import MockTagsRepository from '../domain/repository/tags/MockTagsRepository';
import { BrowserRouter } from 'react-router-dom';
import TagsPage from './TagsPage';
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { jestHacks } from '../utils/JestUtils';

describe('TabsPage tests', () => {
  beforeAll(() => {
    jestHacks();
  });

  it('TagsPage renders correctly', () => {
    const tagsRepository = new MockTagsRepository();
  
    const tree = renderer
      .create(
        <BrowserRouter>
          <AppProvider i18n={translations}>
            <TagsPage tagsRepository={tagsRepository} />
          </AppProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});