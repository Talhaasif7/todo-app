// import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';


function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completeTodo, setCompleteTodo] = useState("");


  const addTodoHandler = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  }

  const deleteTodoHandler = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  }

  const completeHandler = (index) => {
    let date = new Date();
    let mm = date.getDate();
    let dd = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let completedOn = dd + ' - ' + mm + ' - ' + yyyy + ' at ' + h + ':' + m + ':' + s;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompleteArr = [...completeTodo];
    updatedCompleteArr.push(filteredItem);
    setCompleteTodo(updatedCompleteArr);
    deleteTodoHandler(index);
    localStorage.setItem('completedTodo', JSON.stringify(updatedCompleteArr));

  };


  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'));

    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedTodo) {
      setCompleteTodo(savedCompletedTodo);
    }
  }, [])
  return (
    <div>
      <h1 >My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="title">Title</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's the task title." />
          </div>
          <div className="todo-input-item">
            <label htmlFor="description">Description</label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What's the task description." />
          </div>
          <div className="todo-input-item">
            <button className="primary-btn" onClick={addTodoHandler} type="button">Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondary-btn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondary-btn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false && allTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className="icon" onClick={() => deleteTodoHandler(index)} />
                  <AiOutlineCheckCircle className="check-icon" onClick={() => completeHandler(index)} />
                </div>
              </div>
            )
          })}

          {isCompleteScreen === true && completeTodo.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>

                </div>
                <div>
                  <AiOutlineDelete className="icon" onClick={() => deleteTodoHandler(index)} title='Delete?' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
