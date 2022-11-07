import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

it('Sidebar renders correctly', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});