import renderer from 'react-test-renderer';
import Filter from './Filter';
import MockTagsRepository from '../../../domain/repository/tags/MockTagsRepository';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { jestHacks } from '../../../utils/JestUtils';

describe('Filter tests', () => {
  beforeAll(() => {
    jestHacks();
  });

  it('Filter renders correctly', () => {
    const tagsRepository = new MockTagsRepository();

    const tree = renderer
      .create(
        <BrowserRouter>
          <AppProvider i18n={translations}>
            <Filter tagsRepository={tagsRepository} />
          </AppProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});