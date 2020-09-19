import React, {
  FC, useState, useRef, useEffect,
} from 'react';
import styled, { StyledComponent } from 'styled-components';

type Props = {
  deleteNote: () => void;
  updateNote: (note: string) => void;
  goBack: () => any;
  note: string;
};

const Update: FC<Props> & {
  Styled: StyledComponent<'div', any, {}, never>;
} = ({
  goBack, deleteNote, updateNote, note,
}: Props) => {
  const [state, setState] = useState(note);
  const update = () => {
    if (state.trim() !== '') {
      updateNote(state);
      goBack();
    }
  };
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return (
    <Update.Styled>
      <button type="button" aria-label="Go Back" onClick={goBack}>
        &lt;
      </button>
      <textarea value={state} onChange={(e) => setState(e.target.value)} ref={ref} />
      <div>
        <button type="button" className="upd" onClick={update}>
          Update
        </button>
        <button type="button" className="del" onClick={deleteNote}>
          Delete
        </button>
      </div>
    </Update.Styled>
  );
};

Update.Styled = styled.div`
  width: 100%;
  border-radius: 5px;
  flex-flow: column;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  > *:not(:last-child) {
    margin-bottom: 1rem;
  }

  > button {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  textarea {
    width: 100%;
    resize: vertical;
    border-bottom: 1px solid #ced4da;
    min-height: 10rem;
    padding: 1rem;
  }

  & > div:last-child {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

    button {
      padding: 0.8rem 1.5rem;
      border-radius: 5px;

      &.del {
        background: red;
        margin-left: 3rem;
      }
    }
  }
`;

export default Update;
