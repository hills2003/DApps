const TodoContract = artifacts.require("./contracts/TodoContract.sol");

contract("TodoContract", accounts => {
  let todoContractInstance;
  before('initial',async()=>{
    todoContractInstance = await TodoContract.deployed();

  })
  
  describe('check TodoCount',async () =>{
    it('todoCount',async()=>{
    
        const todoCount = await todoContractInstance.TodoCount();
        assert.equal(todoCount.toString(),'0','todocount equals 0')
    })
    
    it('creates todoitem',async()=>{
        const todoItem = await todoContractInstance.createTodo("take out the rubbish",{from:accounts[1]})
        const event = todoItem.logs[0].args
        assert.equal(event.id.toString(),"1")
        assert.equal(event.content,"take out the rubbish")
        assert.equal(event.checked,false)
        assert.equal(event.caller,accounts[1])
    })

    it ('update todo', async()=>{
      const todoCount = await todoContractInstance.TodoCount();
      console.log(todoCount)
      const num = todoCount.toNumber()
      const update = await todoContractInstance.updateTodoState(num)

      const list = await todoContractInstance.TodoList(num)
      assert.equal(list._checked,true)
    })

  })

});
