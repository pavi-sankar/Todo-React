 import React from "react";
 import { useState, useEffect, useRef} from "react";
 import {CiSquareRemove} from "react-icons/ci";
 import {RiCheckboxCircleLine} from "react-icons/ri";
 import {BiSolidEdit} from "react-icons/bi";
 
 function Todo (){
    const [text,setText] = useState('')
    const [task,setTask] = useState([])
    const [submitBtn,setSubmitBtn] = useState(true)
    const [editText,setEditText] = useState('')
    
    const addTask = () => {
        if (text.trim() === '') {
          alert("please enter anything")
        }
          else if(text && !submitBtn){
            setTask(
              task.map((todo) => {
                if (todo.id === editText)
                {
                  return{...todo, list:text}
                }
                return todo;
              })
            )
            setText('')
            setSubmitBtn(!submitBtn) 
            setEditText(null)
          }
          else{
          setTask([...task,{list:text , id:Date.now(), status: false}]);
          setText('');
          }
      }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          addTask();
        }
    }

    const inputRef = useRef(null);

    useEffect(() =>{
        inputRef.current.focus();
    });

    const deleteTask = (id) => {
      setTask(task.filter((todo) => todo.id !== id))
    }

    const doneTask = (key) => {
      let completed = task.map((e)=>{
        if(e.id === key){
          return({...e , status: !e.status})
        }
        return e
      })
      setTask(completed)
    }

    const editTask = (id) => {
      let editItem = task.find((todo)=> todo.id==id)
      setText(editItem.list)
      setSubmitBtn(!submitBtn) 
      setEditText(id)
    }

  return (
    <div className="App">
    <h1>To-Do List</h1>
    <input type="text" value={text} ref={inputRef} placeholder="Add a new task" onChange={(event)=>setText(event.target.value)} onKeyUp={handleKeyPress} maxLength={25} />
    <button className="add-btn" onClick={addTask}>{submitBtn ? "ADD" : "EDIT"}</button> 
    <ul>
      {
        task.map((todo)=>(
            <li key={todo.id}> 
              <span>
                <button className="complete"  onClick={()=>doneTask(todo.id)}><RiCheckboxCircleLine/></button> 
                <span id={todo.status ? 'completed' : ''} >  <p>{todo.list}</p>  </span>
              </span> 
              <span>
                <button className="edit" onClick={()=>editTask(todo.id)}> <BiSolidEdit/> </button>
                <button className="delete" onClick={()=>deleteTask(todo.id)}> <CiSquareRemove /> </button> 
              </span>
            </li>
            ))
      }
    </ul>
  </div>
  )
}

export default Todo;