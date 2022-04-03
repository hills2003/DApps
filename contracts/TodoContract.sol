// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;


contract TodoContract  {
  
  struct TodoItem {
    uint _id;
    string _content;
    bool _checked;
    address caller;
  }

  mapping(uint => TodoItem ) public TodoList;
  uint public TodoCount;

  event TodoEvent(
    uint id,
    string content,
    bool checked,
    address caller
  );

  function createTodo (string memory _content) public {
    require(bytes(_content).length > 0);

       TodoCount++;

       TodoList[TodoCount] = TodoItem(TodoCount,_content,false,msg.sender);

       emit TodoEvent(TodoCount,_content,false,msg.sender);
  }

  function updateTodoState(uint _id) public {
    TodoItem memory todoRef = TodoList[_id];
    todoRef._checked = !todoRef._checked;

    TodoList[_id] = todoRef;
  }
}
