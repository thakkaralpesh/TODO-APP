import { useState,useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos,setTodos]=useState([]);
  const [input,setInput]=useState("");

  useEffect(() => {
    db.collection("todos").orderBy("timestamp","desc").onSnapshot(snapshot=>{
      setTodos(snapshot.docs.map(doc=>({id:doc.id,todo:doc.data().todo})));
    });
  }, [])

  const handleInput=(event)=>{
    setInput(event.target.value);
  }

  const handleAddTodo=(event)=>{
    event.preventDefault();
    db.collection("todos").add({
      todo:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()    //store time region wise
    })
    setTodos([...todos,input]);
    setInput("");
  }

  return (
    <div className="App">
       <h1>Welcome To do App</h1>
       <form>
       <FormControl>
         <InputLabel>Write To Do</InputLabel>
         <Input value={input} onChange={handleInput}/>
       </FormControl>
       {/* <button type="submit" onClick={handleAddTodo}>Add Todo</button> */}
       <Button disabled={!input} type="submit" onClick={handleAddTodo} variant="contained" color="primary">
       Add Todo
      </Button>
       </form>
       <ul>
         {todos.map((todo)=>{
           return <Todo todo={todo}/>
         })}
       </ul>
    </div>
  );
}

export default App;
