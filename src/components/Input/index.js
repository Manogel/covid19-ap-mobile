import React, { useRef, useEffect } from 'react';

import { useField } from '@unform/core';

import { Container, Error, Label, InputMask } from './styles';

function Input({ name, label, type, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
      getValue(ref) {
        return ref._lastNativeText || '';
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        ref._lastNativeText = value;
      },
      clearValue(ref) {
        ref.setNativeProps({ text: '' });
        ref._lastNativeText = '';
      },
    });
  }, [fieldName, registerField]);
  return (
    <>
      {label && <Label>{label}</Label>}

      <Container ref={inputRef} defaultValue={defaultValue} {...rest} />

      {error && <Error> {error} </Error>}
    </>
  );
}

export default Input;

Input.defaultProps = {
  editable: true,
  type: null,
};
