import React from "react";
import { Todo } from "../Types/types";

type TodoProps = {
  todos: Todo[];
  onOpenDialog: (id: string) => void;
  onEditDialog: (id: string) => void;
};

function TodoList({ todos, onOpenDialog, onEditDialog }: TodoProps) {
  return (
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
                src="/delete.png"
                alt="刪除"
                className="deleteImg"
                onClick={() => {
                  onOpenDialog(todo.id);
                }}
              />
              <img
                src="/edit.png" //
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
  );
}

export default TodoList;
