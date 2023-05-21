import renderer from 'react-test-renderer';
import MockTagsRepository from '../../../domain/repository/tags/MockTagsRepository';
import { BrowserRouter } from 'react-router-dom';
import TagCloud from './TagCloud';
import { jestHacks } from '../../../utils/JestUtils';
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";

describe('TagCloud tests', () => {
  beforeAll(() => {
    jestHacks();
  });

  it('TagCloud renders correctly', () => {
    const tagsRepository = new MockTagsRepository();

    const tree = renderer
      .create(
        <BrowserRouter>
          <AppProvider i18n={translations}>
            <TagCloud tagsRepository={tagsRepository} />
          </AppProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});