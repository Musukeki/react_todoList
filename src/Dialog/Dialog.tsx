import React from "react";
import { styled } from "styled-components";
import { DialogProps } from "../Types/types";

function Dialog({ open, close, onDelete }: DialogProps) {
  if (!open) return null;

  return (
    <StyledDialogWrapper className="deleteDialog" onClick={close}>
      <StyledDialog
        className="dialog"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p
          style={{
            fontSize: "32px",
            marginTop: "100px",
            marginBottom: "50px",
            textAlign: "center",
          }}
        >
          是否要刪除任務
        </p>
        <div
          style={{
            width: "328px",
            display: "flex",
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <StyledBtn className="cancelBtn" onClick={close}>
            取消
          </StyledBtn>
          <StyledBtn onClick={onDelete}>確認</StyledBtn>
        </div>
      </StyledDialog>
    </StyledDialogWrapper>
  );
}
export default Dialog;

const StyledBtn = styled.button`
  font-size: 24px;
  padding: 15px 20px;
  border-radius: 15px;
  border: 0;
  background-color: #3152ff;
  color: #fff;
  &:hover {
    background-color: #1532cb;
    cursor: pointer;
  }
`;
const StyledDialogWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const StyledDialog = styled.div`
  width: 728px;
  height: 348px;
  background-color: #fff;
  border-radius: 10px;
  transition: 0.3s;
  button {
    cursor: pointer;
    &:hover {
      background-color: #1532cb;
    }
  }
  .cancelBtn {
    background-color: #fff;
    color: #3152ff;
    border: 1px solid #3152ff;
    &:hover {
      background-color: #d4dbff;
    }
  }
`;
