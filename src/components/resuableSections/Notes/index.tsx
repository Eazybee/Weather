/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { FC, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';
import UpdateNote from './Update';
import { ActionType } from '<contexts>/Cities';
import styles from './styled.css';

export type Props = {
  notes: {
    note: string;
  }[];
  cityIndex: number;
  dispatch: React.Dispatch<{
    type: ActionType;
    payload: any;
  }>;
};

type State = {
  toggle: boolean;
  current?: number;
};

const Notes: FC<Props> & {
  Styled: StyledComponent<'div', any, {}, never>;
} = ({ notes, cityIndex, dispatch }: Props) => {
  const [state, setState] = useState<State>({ toggle: false });
  const [newNote, setNewNote] = useState('');
  const { toggle, current } = state;

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newNote.trim() !== '') {
      dispatch({ type: ActionType.ADD_NOTE, payload: { index: cityIndex, note: newNote } });
      setNewNote('');
    }
  };

  const goBack = () => setState({ toggle: false });

  const deleteNote = (
    noteIndex: number,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event?.stopPropagation();
    dispatch({ type: ActionType.DELETE_NOTE, payload: { index: cityIndex, noteIndex } });
    goBack();
  };

  const updateNote = (note: string) => {
    dispatch({
      type: ActionType.UPDATE_NOTE,
      payload: {
        index: cityIndex,
        noteIndex: current,
        note,
      },
    });
  };

  const showUpdateCard = (key: number) => () => setState({ toggle: true, current: key });

  return (
    <Notes.Styled>
      <h1>Notes</h1>
      {!toggle ? (
        <div className="container">
          <div className="main">
            <div className="add">
              <form onSubmit={addNote}>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="New note goes here"
                />
                <button type="submit">Add</button>
              </form>
            </div>

            {notes.length ? (
              <div className="notes">
                {notes.map((note, key) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={key}
                    role="button"
                    tabIndex={0}
                    onClick={showUpdateCard(key)}
                    onKeyPress={showUpdateCard(key)}
                    aria-label="Edit"
                  >
                    <p>{note.note}</p>
                    <button type="button" aria-label="Delete" onClick={(e) => deleteNote(key, e)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        current !== undefined && (
          <UpdateNote
            deleteNote={() => deleteNote(current)}
            updateNote={updateNote}
            goBack={goBack}
            note={notes[current].note}
          />
        )
      )}
    </Notes.Styled>
  );
};

Notes.Styled = styled.div`
  ${styles}
`;

export default Notes;
