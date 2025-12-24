import React from "react";
import axios from "axios";
import InputGroup from "./InputGroups/InputGroup";
import TodoList from "./TodoList/TodoList";
import DialogDelete from "./Dialog/DialogDelete";
import DialogEdit from "./Dialog/DialogEdit";
import { styled } from "styled-components";
import { Todo } from "./Types/types";

function App() {
  // states
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [stateDeleteDialog, setStateDeleteDialog] =
    React.useState<boolean>(false);
  const [deleteTodoId, setDeleteTodoId] = React.useState<null | string>(null);
  const [stateEditDialog, setStateEditDialog] = React.useState<boolean>(false);
  const [addTodo, setAddTodo] = React.useState<Todo>({
    id: "",
    title: "",
    date: "",
    checked: false,
  });
  const [editTodo, setEditTodo] = React.useState<Todo | null>(null);

  // render when loading
  React.useEffect(() => {
    axios
      .get("/data/todos.json")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  // when open delete dialog
  const openDeleteDialog = (id: string) => {
    setDeleteTodoId(id);
    setStateDeleteDialog(true);
    console.log(id);
  };

  // when open edit dialog
  const openEditDialog = (id: string) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;

    console.log(target);

    setEditTodo(target);
    setStateEditDialog(true);
  };

  // delete todo
  const handleDelete = () => {
    if (deleteTodoId === null) {
      console.log("Todo Id is NULL");
      return;
    }
    setTodos((prev) => prev.filter((todo) => todo.id !== deleteTodoId));
    setDeleteTodoId(null);
    setStateDeleteDialog(false);
  };

  // edit todo
  const handleEdit = (updated: Todo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updated.id ? updated : todo))
    );
    setStateEditDialog(false);
  };

  // when input content change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddTodo({
      ...addTodo,
      [event.target.name]: event.target.value,
    });
  };

  // when add todo
  const handleAdd = () => {
    if (addTodo.title.trim() === "") {
      alert("請輸入任務內容");
      return;
    }
    const pattern = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!pattern.test(addTodo.date)) {
      alert("請輸入正確日期格式 ex: yyyy/mm/dd");
      return;
    }
    setTodos((prev) => [
      ...prev, //
      { ...addTodo },
    ]);

    // clear addTodo
    setAddTodo({ id: "", title: "", date: "", checked: false });
  };

  return (
    <div className="App">
      {/* outter wrapper */}
      <StyledWrapper>
        {/* main content */}
        <div
          style={{
            width: "1152px",
            margin: "0 auto",
          }}
        >
          <StyledTitle>Todo List</StyledTitle>

          {/* mission & date */}
          <StyledSearchArea>
            <InputGroup
              name="title"
              type="text"
              title="任務"
              placeholder="請輸入你的任務名稱"
              value={addTodo.title}
              onChange={handleChange}
            />
            <InputGroup
              name="date"
              type="text" //
              title="日期" //
              placeholder="請輸入日期"
              value={addTodo.date}
              onChange={handleChange}
            />

            <StyledBtn
              onClick={() => {
                handleAdd();
              }}
            >
              Add Task
            </StyledBtn>
          </StyledSearchArea>

          {/* todo list */}
          <StyledTodoListArea>
            <TodoList
              todos={todos} //
              onOpenDialog={openDeleteDialog} //
              onEditDialog={openEditDialog} //
            />
          </StyledTodoListArea>
        </div>

        {/* dialog */}
        <DialogDelete
          open={stateDeleteDialog} //
          close={() => setStateDeleteDialog(false)} //
          onDelete={handleDelete} //
        />

        {editTodo && (
          <DialogEdit
            open={stateEditDialog}
            close={() => setStateEditDialog(false)}
            onEdit={handleEdit}
            value={editTodo}
          />
        )}
      </StyledWrapper>
    </div>
  );
}

export default App;

// styled
const StyledWrapper = styled.div`
  max-width: 1440px;
  height: 1024px;
  margin: 0 auto;
  border: 1px solid #ddd;
  background-color: #eff2ff;
  position: relative;
`;

const StyledTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 64px;
  font-weight: 400;
`;

const StyledSearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  margin-bottom: 30px;
`;

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
