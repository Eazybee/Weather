import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, act } from '<mocks>/testUtils';
import Notes, { Props } from '.';
import UpdateNote, { Props as UpdateProps } from './Update';
import { ActionType } from '<contexts>/Cities';


const dispatch = jest.fn();
let props: Props;

jest.mock('./Update');

const MockButton = ({ deleteNote }: UpdateProps) => (
  <button
    type="button"
    onClick={deleteNote}
  >
    Mock Button
  </button>
);

describe('Notes', () => {
  beforeEach(() => {
    props = {
      notes: [{ note: 'hello world!' }],
      cityIndex: 1,
      dispatch,
    };
  });

  afterEach(() => {
    dispatch.mockReset();
  });

  it('should render', () => {
    const firstNote = props.notes.pop() as { note: string };
    const { getByText, queryByText, getByPlaceholderText } = render(<Notes {...props} />);

    expect(getByText('Notes')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
    expect(getByPlaceholderText('New note goes here').nodeName).toEqual('TEXTAREA');
    expect(queryByText(firstNote?.note)).toBeFalsy();
  });

  it('should render existing notes', () => {
    const { getByText } = render(<Notes {...props} />);

    expect(getByText(props.notes[0].note)).toBeTruthy();
  });

  it('should add new note', () => {
    dispatch.mockImplementationOnce((e) => props.notes.push({ note: e.payload.note }));
    const { getByText, getByPlaceholderText } = render(<Notes {...props} />);
    const newNote = 'This is my firstNote';
    act(() => {
      fireEvent.change(
        getByPlaceholderText('New note goes here'),
        { target: { value: newNote } },
      );
    });

    act(() => {
      fireEvent.click(getByText('Add'));
    });

    expect(dispatch).toHaveBeenCalledWith(
      {
        type: ActionType.ADD_NOTE,
        payload: { index: props.cityIndex, note: newNote },
      },
    );
    expect(getByText(newNote)).toBeTruthy();
  });

  it('should delete note', () => {
    const { note } = props.notes[0];
    dispatch.mockImplementationOnce(() => props.notes.pop());
    const { getByText, queryByText } = render(<Notes {...props} />);

    expect(getByText(note)).toBeTruthy();

    act(() => {
      fireEvent.click(getByText('X'));
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.DELETE_NOTE,
      payload: { index: props.cityIndex, noteIndex: 0 },
    });
    expect(queryByText(note)).toBeFalsy();
  });

  it('should show edit card component', () => {
    // @ts-ignore
    UpdateNote.mockImplementationOnce(MockButton);
    const { note } = props.notes[0];
    const { getByText } = render(<Notes {...props} />);
    const edit = getByText(note).parentElement;

    if (edit) {
      act(() => {
        fireEvent.click(edit);
      });
    }

    expect(getByText('Mock Button')).toBeTruthy();
  });

  it('should delete note from update card', () => {
    // @ts-ignore
    UpdateNote.mockImplementationOnce(MockButton);
    const { note } = props.notes[0];
    const { getByText, queryByText } = render(<Notes {...props} />);
    const edit = getByText(note).parentElement;

    if (edit) {
      act(() => {
        fireEvent.click(edit);
      });
    }

    fireEvent.click(getByText('Mock Button'));

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.DELETE_NOTE,
      payload: { index: props.cityIndex, noteIndex: 0 },
    });
    expect(queryByText('Mock Button')).toBeFalsy();
  });

  it('should update new note', () => {
    const MockButton2 = ({ updateNote }: UpdateProps) => (
      <button
        type="button"
        onClick={() => updateNote('hello world!')}
      >
        Mock Button
      </button>
    );
    // @ts-ignore
    UpdateNote.mockImplementationOnce(MockButton2);
    const { note } = props.notes[0];


    const { getByText } = render(<Notes {...props} />);
    const edit = getByText(note).parentElement;

    if (edit) {
      act(() => {
        fireEvent.click(edit);
      });
    }
    fireEvent.click(getByText('Mock Button'));

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.UPDATE_NOTE,
      payload: {
        index: props.cityIndex,
        noteIndex: 0,
        note,
      },
    });
  });
});
