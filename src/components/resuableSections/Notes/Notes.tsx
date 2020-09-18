/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { FC, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';
import UpdateNote from './Update';
import { ActionType } from '<contexts>/Cities';

type Props = {
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

  return (
    <Notes.Styled>
      <h1>Notes</h1>
      {!toggle ? (
        <div className="container">
          <div className="main">
            <div className="add">
              <form onSubmit={addNote}>
                <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                <button type="submit">Add</button>
              </form>
            </div>

            {notes.length ? (
              <div className="notes">
                {notes.map((note, key) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={key} role="button" onClick={() => setState({ toggle: true, current: key })}>
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
  button {
    background: linear-gradient(to right, #00d2ff 0%, #3a7bd5 51%);
    color: white;
    font-weight: bold;
    transition: 0.5s linear;
    position: relative;
  }
  button:hover {
    opacity: 0.8;
    top: -1px;
  }

  h1 {
  }

  .container {
    min-width: 60%;
    display: flex;
    flex-flow: column;

    .main div.add {
      margin-bottom: 2rem;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      padding: 1rem;
      border-radius: 5px;

      form {
        display: flex;
        flex-flow: row;
        justify-content: space-between;

        align-items: center;
      }

      & textarea {
        width: 85%;
        margin-right: 1rem;
        resize: vertical;
        border-bottom: 1px solid #ced4da;
        min-height: 5rem;
        padding: 1rem;
      }
      & button {
        padding: 0.5rem 1rem;
        max-height: 2rem;
        border-radius: 5px;
      }
    }

    .main > .notes {
      display: flex;
      flex-flow: column;
      padding: 1rem;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      border-radius: 5px;
    }

    .notes div {
      display: flex;
      flex-flow: row;
      align-items: center;
      padding: 1rem 0.5rem;
      width: 100%;
      border-radius: 5px;
      background: #f5f5f5;

      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }

      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      button {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background: red;
        color: white;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.7rem;
      }
    }
  }
`;

export default Notes;
