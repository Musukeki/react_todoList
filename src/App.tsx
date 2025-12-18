import React from 'react';
// import './App.css';
import { styled } from 'styled-components'

// 方法元件
  function TodoTitle(props: { title: string }) {
    return <StyledTitle>{ props.title }</StyledTitle>
  }

  function InputGroup(props: { title: string, placeholder: string, onFocus: any, onBlur: any, onChange: any, type: string, value: string }) {
    return (
      <StyledInputGroup>
        <p>{ props.title }</p>
        <input 
          type={ props.type }
          placeholder={ props.placeholder }
          onFocus={ props.onFocus }
          onBlur={ props.onBlur }
          onChange={props.onChange}
          value={props.value}/>
      </StyledInputGroup>
    )
  }
  function Button(props: { name: string, onClick: any }) {
    return <StyledBtn>{ props.name }</StyledBtn>
  }

  // 彈出視窗
  function Dialog({ open, close, children, deleteFn }: any) {
    if (!open) return null

    return  (
      <StyledDialogWrapper className='deleteDialog' onClick={close}>
        <StyledDialog className="dialog" onClick={(e) => {e.stopPropagation()}}>
          { children }
          <div style={{
            width: '328px',
            display: 'flex',
            justifyContent: 'space-between',
            margin: 'auto'
          }}>
            <StyledBtn onClick={close} className='cancelBtn'>取消</StyledBtn>
            <StyledBtn onClick={deleteFn}>確認</StyledBtn>
          </div>
        </StyledDialog>
      </StyledDialogWrapper>
    )
  }
  

  // 待辦資料
  const todoData: any = [
    {
      id: 1,
      title: 'todo 1',
      date: '2024/05/01'
    },
    {
      id: 2,
      title: 'todo 2',
      date: '2024/05/02'
    },
    {
      id: 4,
      title: 'todo 4',
      date: '2024/05/10'
    }
  ]


function App() {

  // useState[值, 改變狀態的方法] = React.useState(初始值)

  // 狀態
  // 刪除彈出視窗
  const [open, setOpen] = React.useState(false)

  // 輸入框
  const [focus, setFocus] = React.useState(false)
  const [dateFocus, setDateFocus] = React.useState(false)

  const [todos, setTodos] = React.useState(todoData)
  const [date, setDate] = React.useState('')

  const [todoToDelete, setTodoToDelete] = React.useState<number | null>(null)


  // 核取方塊
  const [checkedMap, setCheckedMap] = React.useState<{[key: number]:boolean}>({})

  const [todo, setTodo] = React.useState('')
  const handleAddTodo = () => {
    console.log(todo)
    if(!todo.trim()) {
      alert('標題不得為空白！！！！！！')
      return
    }
    if(!date.trim()) {
      alert('日期沒填')
      return
    }
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    if(!regex.test(date)) {
      alert('日期或格式不對！！！')
      return
    }
    const newTodo = {
      id: Date.now(),
      title: todo,
      date: date
    }
    setTodos((prev: any) => [...prev, newTodo])
    setTodo('')
    setDate('')
  }

  const deleteTodo = () => {
    if (todoToDelete !== null) {
      setTodos((prev: any) => prev.filter((todo: any) => todo.id !== todoToDelete))
      setTodoToDelete(null)
      setOpen(false)
    }
  }


  return (
    <div className="App">

      {/* 外容器 */}
      <StyledWrapper>
        {/* 主要內容區塊 */}
        <div style={{
          width: '1152px',
          margin: '0 auto'
        }}>
          {/* 標題 */}
          <TodoTitle title="Todo List" />

          {/* 輸入區塊 */}
          <StyledSearchArea>
            <InputGroup
              onChange={(e: any) => setTodo(e.target.value)}
              title='任務'
              placeholder = { focus ? '' : '請輸入你的任務名稱' } 
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              type='text'
              value={todo}/>

            <InputGroup
              title='日期'
              placeholder = { dateFocus ? '' : '請輸入日期' } 
              onFocus={() => setDateFocus(true)}
              onBlur={() => setDateFocus(false)}
              onChange={(e: any) => setDate(e.target.value)}
              type='text'
              value={date}/>


            <StyledBtn onClick={ handleAddTodo }>Add Task</StyledBtn>

          </StyledSearchArea>

          {/* 待辦列表區 */}
          <StyledTodoListArea>

            <ul>
              { todos.length > 0 ? (todos.map((item: any) => {
                return ( 
                    <li key={ item.id }>
                  <input 
                    type="checkbox"
                    checked={ checkedMap[item.id] === true }
                    onChange={(e) => {
                      setCheckedMap((prev) => {
                        return {
                          ...prev,
                          [item.id]: e.target.checked
                        }
                      })
                    }}
                    />
                  <div className={
                    checkedMap[item.id] === true ? 'todoContent checked' : 'todoContent'
                  }>
                    <p>{ item.title }</p>
                    <span>{ item.date }</span>
                  </div>
                  <div className='todoImgs'>
                    <img 
                      src="delete.png"
                      alt="刪除"
                      onClick={() => { 
                        setTodoToDelete(item.id);
                        setOpen(true)}}
                      className='deleteImg'/>
                    <img src="edit.png" alt="修改"/>
                  </div>
                </li>
              )
            })) : <p className='emptyText'>趕緊建立你的任務吧！</p>}
            </ul>
          </StyledTodoListArea>
        </div>

        {/* 彈出視窗 */}
        <Dialog 
          open={open} 
          close={() => setOpen(false)}
          deleteFn={deleteTodo}>
          <p style={{
          fontSize: '32px',
          marginTop: '100px',
          marginBottom: '50px',
          textAlign: 'center'
        }}>是否要刪除任務</p>

        </Dialog>
        
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
  background-color: #EFF2FF;
  position: relative;
`

const StyledTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 64px;
  font-weight: 400;
`
const StyledSearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  margin-bottom: 30px;
`

const StyledInputGroup = styled.div`
  display: flex;
  align-items: center;
  marginRight: 30px;
  p {
    margin: 0 12px 0 0;
  }
  input {
    padding: 12px 20px;
    border-radius: 15px;
    border: 1px solid #ccc;
    font-size: 32px;
    background-color: transparent;
  }
`
const StyledBtn = styled.button`
  font-size: 24px;
  padding: 15px 20px;
  border-radius: 15px;
  border: 0;
  background-color: #3152FF;
  color: #fff;
  &:hover {
    background-color: #1532CB;
    cursor: pointer;
  }
`
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
      background-color: #F9FAFF;
      border-radius: 10px;
      padding: 12px 20px;
      input {
        width: 30px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #D9D9D9;
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
          background-color: #D9D9D9;
          border-radius: 5px;
          cursor: pointer;
        }
        img:first-child {
          margin-right: 20px;
        }
        & .deleteImg:hover {
          content: url('delete_hover.png')
        }
      }
    }
  }
  p.emptyText {
    font-size: 32px;
    margin: 0;
    color: #C6C6C6;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
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
`

const StyledDialog = styled.div`
  width: 728px;
  height: 348px;
  background-color: #fff;
  border-radius: 10px;
  transition: 0.3s;
  button {
    cursor: pointer;
    &:hover {
        background-color: #1532CB;
      }
    }
    .cancelBtn {
      background-color: #fff;
      color: #3152FF;
      border: 1px solid #3152FF;
      &:hover {
        background-color: #D4DBFF;
      }
    }
`