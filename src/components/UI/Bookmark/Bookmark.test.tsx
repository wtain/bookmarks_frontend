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
jest
  .useFakeTimers()
  .setSystemTime(new Date('2022-09-17T13:47:36.000Z'));

it('Bookmark renders correctly', () => {

  const bookmark = {
    summary: 'Edit tags',
    contents: 'Ability to edit tags for existing bookmarks\nSecond line\nThird line',
    id: 'ab2809a7-de53-4494-8ece-2aeecadce254',
    created: new Date("2022-01-30T20:48:19.000Z"),
    tags: [ { name: 'Task', id: '4b68bb47-c561-4958-8682-ea84ca39773d' } ],
    isDone: true,
    updated: new Date("2022-02-13T14:13:09.000Z")
  }

  const tree = renderer
    .create(
      <Bookmark bookmark={bookmark} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});