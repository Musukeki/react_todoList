import React from "react";
import { styled } from "styled-components";
import { InputGroupProps } from "../Types/types";

function InputGroup({
  name,
  type,
  title,
  placeholder,
  value,
  onChange,
}: InputGroupProps) {
  return (
    <StyledInputGroup>
      <p>{title}</p>
      <input
        name={name} //
        type={type} //
        placeholder={placeholder} //
        value={value} //
        onChange={onChange}
      />
    </StyledInputGroup>
  );
}
export default InputGroup;

const StyledInputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  p {
    margin: 0 12px 0 0;
    white-space: nowrap;
  }
  input {
    max-width: 375px;
    padding: 12px 20px;
    border-radius: 15px;
    border: 1px solid #ccc;
    font-size: 32px;
    background-color: transparent;
  }
`;
