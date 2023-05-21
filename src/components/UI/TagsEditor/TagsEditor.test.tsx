import renderer from 'react-test-renderer';
import TagDto from '../../../domain/dto/TagDto';
import TagsEditor from './TagsEditor';
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { jestHacks } from '../../../utils/JestUtils';

describe('TagsEditor tests', () => {
  beforeAll(() => {
    jestHacks();
  });

  it('TagsEditor renders correctly', () => {

    const tags: TagDto[] = [
      {
        name: "tag1",
        id: "tag1-id"
      },
      {
        name: "tag2",
        id: "tag2-id"
      },
      {
        name: "tag3",
        id: "tag3-id"
      }
    ]

    const tree = renderer
      .create(
        <AppProvider i18n={translations}>
          <TagsEditor tags={tags} />
        </AppProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});