import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, act } from '<mocks>/testUtils';
import Update, { Props } from '.';


const action = jest.fn();
let props: Props;


describe('Update', () => {
  beforeEach(() => {
    props = {
      note: 'hello world!',
      deleteNote: action,
      updateNote: action,
      goBack: () => action,
    };
  });

  afterEach(() => {
    action.mockReset();
  });

  it('should render', () => {
    const { getByText } = render(<Update {...props} />);

    expect(getByText('Update')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
    expect(getByText('<')).toBeTruthy();
    expect(getByText(props.note)).toBeTruthy();
    expect(getByText(props.note)).toHaveFocus();
    expect(getByText(props.note).nodeName).toEqual('TEXTAREA');
  });

  it('should update', () => {
    action.mockImplementationOnce((newNote: string) => { props.note = newNote; });
    const newNote = 'I am an updated note';
    const prevNote = props.note;

    const { getByText, queryByText } = render(<Update {...props} />);

    expect(getByText(prevNote)).toBeTruthy();
    expect(queryByText(newNote)).toBeFalsy();

    act(() => {
      fireEvent.change(getByText(props.note), { target: { value: newNote } });
    });

    fireEvent.click(getByText('Update'));

    expect(props.note).toEqual(newNote);
    expect(getByText(newNote)).toBeTruthy();
    expect(queryByText(prevNote)).toBeFalsy();
  });
});
