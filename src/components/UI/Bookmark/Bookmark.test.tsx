import TimeAgo from 'javascript-time-ago';
import renderer from 'react-test-renderer';
import Bookmark from './Bookmark';
import en from 'javascript-time-ago/locale/en.json';
// import { render, screen } from '@testing-library/react';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

TimeAgo.addDefaultLocale(en);

it('Bookmark renders correctly', () => {

  Date.now = jest.fn(() => 1663277045830);

  const bookmark = {
    summary: 'Edit tags',
    contents: 'Ability to edit tags for existing bookmarks\nSecond line\nThird line',
    id: 'ab2809a7-de53-4494-8ece-2aeecadce254',
    created: '30.01.2022, 20:48:19',
    tags: [ { name: 'Task', id: '4b68bb47-c561-4958-8682-ea84ca39773d' } ],
    isDone: true,
    updated: '13.02.2022, 14:13:09'
  }

  const tree = renderer
    .create(
      <Bookmark bookmark={bookmark} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});