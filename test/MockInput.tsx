import React, { useState } from 'react';

const MockInput = ({ loadOptions, onChange, placeholder }: any) => {
  const [state, setState] = useState<any>();
  const [word, setWord] = useState<any>('');
  const handleSelect = () => {
    onChange(state);
  };

  const handleChange = async ({ target }: any) => {
    const res = await loadOptions(target.value);
    setState(res[0] || null);
    setWord(target.value);
  };

  return (
    <>
      <input
        type="input"
        placeholder={placeholder}
        onChange={handleChange}
        value={word}
      />
      {state ? <div tabIndex={0} role="button" onClick={handleSelect} onKeyPress={handleSelect}>{state.label}</div> : null}
    </>
  );
};

export default MockInput;
