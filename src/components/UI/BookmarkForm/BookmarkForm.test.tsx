import renderer from 'react-test-renderer';
import BookmarkForm from './BookmarkForm';
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { jestHacks } from '../../../utils/JestUtils';

function run_test(visibility: boolean) {
  const tree = renderer
  .create(
    <AppProvider i18n={translations}>
      <AppProvider i18n={translations}>
        <BookmarkForm visibility={visibility}  />
      </AppProvider>
    </AppProvider>
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
}

describe('BookmarkForm tests', () => {
  beforeAll(() => {
    jestHacks();
  });

  it('BookmarkForm renders correctly visible', () => {
    run_test(true)
  });

  it('BookmarkForm renders correctly hidden', () => {
    run_test(false)
  });
});