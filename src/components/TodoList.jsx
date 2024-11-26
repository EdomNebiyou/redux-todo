import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "../store/slice/todoSlice";
import { AiFillFileAdd, AiFillDelete,AiFillEdit } from "react-icons/ai";

export default function TodoList() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [currentEdited,setCurrentEdited]=useState(null)
  const dispatch = useDispatch();
  const { todoList } = useSelector((state) => state.todo);
  function handleAddTodo() {
    dispatch(addTodo(currentTodo));
    setCurrentTodo("");
  }
  function handleDeleteTodo(getCurrentId){
    dispatch(deleteTodo(getCurrentId))
  }
  function handleUpdateTodo(getCurrentTodo){
    setCurrentEdited(getCurrentTodo.id)
    setCurrentTodo(getCurrentTodo.title)
  }
  function handleEditTodo(){
    dispatch(editTodo({
      currentEdited,
      currentTodo
    }))
    setCurrentTodo('')
    setCurrentEdited(null)
  }
  return (
    <>
      <div className="m-2 flex flex-col gap-2">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            name="todo"
            value={currentTodo}
            onChange={(e) => setCurrentTodo(e.target.value)}
            placeholder="enter your todo"
            className="border-2"
          />
          <button
            className="bg-gray-800 hover:bg-black flex items-center gap-1 text-white p-2 rounded"
            onClick={currentEdited===null
              ?handleAddTodo
              :handleEditTodo
            }
            disabled={currentTodo === ""}
          >
            {
              currentEdited===null
              ?<>add todo
              <AiFillFileAdd className="text-2xl text-green-600 font-bold" /></>
              : <>edit
                <AiFillEdit className="text-2xl text-yellow-600 font-bold" /></>
            }
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          {todoList && todoList.length > 0
            ? todoList.map((todoItem) => (
                <li key={todoItem.id} className="flex gap-2 items-center">
                  <p>{todoItem.title}</p>
                  <button
                    className="bg-gray-800 hover:bg-black flex items-center gap-1 text-white p-2 rounded"
                    onClick={() => handleDeleteTodo(todoItem.id)}
                  >
                    delete
                    <AiFillDelete className="text-2xl text-red-600 font-bold" />
                  </button>
                  <button
                    className="bg-gray-800 hover:bg-black flex items-center gap-1 text-white p-2 rounded"
                    onClick={() => handleUpdateTodo(todoItem)}
                  >
                    edit
                    <AiFillEdit className="text-2xl text-yellow-600 font-bold" />
                  </button>
                </li>
              ))
            : null}
        </ul>
      </div>
    </>
  );
}
