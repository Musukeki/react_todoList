import React from "react";
import { Todo } from "../Types/types";
import { styled } from "styled-components";

type TodoProps = {
  todos: Todo[];
  onOpenDialog: (id: string) => void;
  onEditDialog: (id: string) => void;
};

function TodoList({ todos, onOpenDialog, onEditDialog }: TodoProps) {
  return (
    <StyledTodoListArea>
      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>
              <input type="checkbox" />
              <div className="todoContent">
                <p>{todo.title}</p>
                <span>{todo.date}</span>
              </div>
              <div className="todoImgs">
                <img
                  src="delete.png"
                  alt="刪除"
                  className="deleteImg"
                  onClick={() => {
                    onOpenDialog(todo.id);
                  }}
                />
                <img
                  src="edit.png" //
                  alt="修改" //
                  onClick={() => {
                    onEditDialog(todo.id);
                  }}
                />
              </div>
            </li>
          ))
        ) : (
          <p className="emptyText">趕緊建立你的任務吧！</p>
        )}
      </ul>
    </StyledTodoListArea>
  );
}

export default TodoList;
const StyledTodoListArea = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 12px 24px;
  height: 614px;
  position: relative;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
      background-color: #f9faff;
      border-radius: 10px;
      padding: 12px 20px;
      input {
        width: 30px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #d9d9d9;
        margin-right: 14px;
      }
      input[type="checkbox"]:checked + .todoContent {
        color: rgba(74, 74, 74, 0.5);
      }

      input[type="checkbox"]:checked + .todoContent p {
        text-decoration: line-through;
      }

      div.todoContent {
        algin-items: flex-start;
        &.checked {
          color: rgba(74, 74, 74, 0.5);
          p {
            text-decoration: line-through;
          }
        }
        p {
          font-size: 32px;
          margin: 0;
        }
      }
      div.todoImgs {
        margin-left: auto;
        img {
          padding: 3px;
          background-color: #d9d9d9;
          border-radius: 5px;
          cursor: pointer;
        }
        img:first-child {
          margin-right: 20px;
        }
        & .deleteImg:hover {
          content: url("delete_hover.png");
        }
      }
    }
  }
  p.emptyText {
    font-size: 32px;
    margin: 0;
    color: #c6c6c6;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
