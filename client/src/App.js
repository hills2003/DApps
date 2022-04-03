import React, { Component,useEffect ,useState} from "react";
import TodoContract from "./contracts/TodoContract.json";
import getWeb3 from "./getWeb3";
import TodoContainer from "./TodoContainer"

import "./App.css";


const App =()=> {
  // state = { storageValue: 0, web3: null, accounts: null, contract: null };
  const [contractInstance,setContractInstance] = useState("");
  const [todoCount,setTodoCount] = useState();
  const [account,setAccount] = useState()
  const [loading,setLoading] = useState(false)
  const [todos,setTodos] = useState([])
  useEffect(async()=>{
     const web3 = await getWeb3();
     const accounts = await web3.eth.getAccounts();
     setAccount(accounts)
      const networkId = await web3.eth.net.getId();
      console.log(networkId)
      const deployedNetwork = TodoContract.networks[networkId];
      if(deployedNetwork) {
        let instance = await new web3.eth.Contract(
          TodoContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        let counter = await instance.methods.TodoCount().call()
       setTodoCount(counter)
       setContractInstance(instance)
       

      

      }
 
     
  },[])

  useEffect(async()=>{
    let arr = [];
    for(let i =1 ;i <= todoCount; i++) {
      let res = contractInstance && await contractInstance.methods.TodoList(i).call();
       arr.push(res)
       arr.reverse()
      
    }  
    setTodos(arr)
    
  },[contractInstance, todoCount])

  const handleCheck =async (id) =>{
   await contractInstance && await contractInstance.methods.updateTodoState(id).send({from:account[0]});
  }

  const addTodo =async (id) =>{
    try{
      await contractInstance && await contractInstance.methods.createTodo(id).send({from:account[0]});
      setTodoCount(await contractInstance && await contractInstance.methods.TodoCount().call());
    }
    catch{
      console.log("failed to add new todo item")
    }
    
   }
 

  
  


    return (
      <div className="App">
        {loading ? <h2>loading.....</h2>:(

          <>
            <TodoContainer todos={todos} handleCheck={handleCheck} addTodo={addTodo} />
             </>
        )}
        
      </div>
    );
}

export default App;