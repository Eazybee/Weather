import React, {
  FC, useState, useRef, useEffect,
} from 'react';
import styled, { StyledComponent } from 'styled-components';
import styles from './styled.css';

export type Props = {
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
  ${styles}
`;

export default Update;
