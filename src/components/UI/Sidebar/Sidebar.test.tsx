import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import AuthServiceMock from '../../../services/AuthServiceMock';

it('Sidebar when logged in renders correctly', () => {
  testSideBarSnapshot(true);
});

it('Sidebar when not logged in renders correctly', () => {
  testSideBarSnapshot(false);
});

function testSideBarSnapshot(isLoggedIn: boolean) {
  const authService = new AuthServiceMock(isLoggedIn);

  const tree = renderer
    .create(
      <BrowserRouter>
        <Sidebar authService={authService} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
}
