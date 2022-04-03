import React, { Component,useEffect ,useState} from "react";
import { Button ,Badge ,ListGroup,Form , FormCheck ,FormLabel ,FormControl} from 'react-bootstrap'
import "./App.css"
const TodoContainer = ({todos,handleCheck,addTodo}) => {

    const [checked,setChecked] = useState()
    const [content,setContent] = useState()

    return (
        <>
            <div className="container">

           <div className="center-container">
           
            <Form.Control
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                onChange={(e)=>{setContent(e.target.value)}}
            />

            <Button variant="primary" onClick={()=>{addTodo(content);setContent("")}}>Primary</Button>
           </div>
            <ListGroup as="ol" className="center-container">
               
                {todos.map((item,index)=>{
                    return (
                        <ListGroup.Item
                        
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">{item._content}</div>
                        {item.caller}
                        </div>
                    <Form>
                        <Form.Check 
                            type='checkbox'
                            id={`default-type`}
                            checked={item._checked}
                            onChange={()=>handleCheck(item._id)}
                            
                        />
                    </Form>
                    </ListGroup.Item>
                    )
                })}
                </ListGroup>
            </div>
        
        </>
    );
}

export default React.memo(TodoContainer);