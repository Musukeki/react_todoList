import React from "react";
import { styled } from "styled-components";
import { DialogEditProps } from "../Types/types";
import InputGroup from "../InputGroups/InputGroup";
import { Todo } from "../Types/types";

function DialogEdit({ open, close, onEdit, value }: DialogEditProps) {
  const [draft, setDraft] = React.useState<Todo>({
    id: "",
    title: "",
    date: "",
    checked: false,
  });

  React.useEffect(() => {
    if (open) {
      setDraft(value);
    }
  }, [open, value]);

  if (!open) return null;

  return (
    <StyledDialogWrapper className="editDialog" onClick={close}>
      <StyledDialog
        className="dialog"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p
          style={{
            fontSize: "32px",
            marginTop: 0,
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          編輯任務
        </p>
        <StyledSearchArea>
          <InputGroup
            name="title"
            type="text"
            title="任務"
            placeholder="請輸入你的任務名稱"
            value={draft.title}
            onChange={(event) => {
              console.log(event.target);
              setDraft((prev) => ({
                ...prev,
                title: event.target.value,
              }));
            }}
          />
          <InputGroup
            name="date"
            type="text" //
            title="日期" //
            placeholder="請輸入日期"
            value={draft.date}
            onChange={(event) => {
              console.log(event.target);
              setDraft((prev) => ({
                ...prev,
                date: event.target.value,
              }));
            }}
          />
        </StyledSearchArea>
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
          <StyledBtn
            onClick={() => {
              onEdit(draft);
            }}
          >
            確認
          </StyledBtn>
        </div>
      </StyledDialog>
    </StyledDialogWrapper>
  );
}
export default DialogEdit;

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
  padding: 100px 0;
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

const StyledSearchArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 32px;
  margin-bottom: 20px;
  div:first-child {
    margin-bottom: 20px;
  }
`;
