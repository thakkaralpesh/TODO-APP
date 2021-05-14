import {Button, List, ListItem, ListItemText, Modal,FormControl, Input, InputLabel } from "@material-ui/core"
import "./Todo.css"
import db from "./firebase";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const Todo=(props)=>{
    const classes=useStyles();
    const [open,setOpen]=useState();
    const [input,setInput]=useState("");

    const UpdateTodo=()=>{
        db.collection("todos").doc(props.todo.id).set({
            todo:input
        },{merge:true});
        setOpen(false)
    }

   
    return (
        <>
        <Modal
        open={open}
        onClose={e=>setOpen(false)}>
            <div className={classes.paper}>
            <h1>Update Todo</h1>
            <FormControl>
                <InputLabel>Update Todo</InputLabel>
                <Input value={input} onChange={event=>setInput(event.target.value)} placeholder={props.todo.todo}/>
           </FormControl>
            <Button disabled={!input} onClick={UpdateTodo} variant="contained" color="primary">Update Todo</Button>
        </div>
        </Modal>
        
        <List className="todo__list">
            <ListItem>
            <ListItemText primary={props.todo.todo} secondary="Todo..."/>
            </ListItem>
            <EditIcon onClick={e=>setOpen(true)}/>
            <DeleteForeverIcon onClick={e=>db.collection("todos").doc(props.todo.id).delete()}/>
        </List>
        </>
    )
}

export default Todo
