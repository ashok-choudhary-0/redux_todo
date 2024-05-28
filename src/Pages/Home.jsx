import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../Components/NavBar';
import { IoAddCircleOutline } from 'react-icons/io5';
import AddTodoModal from '../Components/AddTodoModal';
import TodoItemList from '../Components/TodoItemList';
import moment from 'moment';
import ConfirmationModal from '../Components/ConfirmationModal';
import { addTodo, editTodo, removeTodo } from '../Redux/slices/TodoSlice';
const Home = () => {
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [updateTodo, setUpdateTodo] = useState(false);
  const [dateTime, setDateTime] = useState(moment().format('HH:mm'));
  const getAllTodos = useSelector((state) => state.todoReducer.todoList);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      setDateTime(moment().format('HH:mm'));
    }, 60000);
  }, []);

  const addTodoModalDoneButton = (todo, setShowError) => {
    if (
      todo?.task?.trim()?.length === 0 &&
      moment(todo?.time).isBefore(moment())
    ) {
      setShowError({
        emptyTask: true,
        invalidTime: true,
      });
      return;
    } else if (todo?.task?.trim()?.length === 0) {
      setShowError({
        emptyTask: true,
        invalidTime: false,
      });
      return;
    } else if (moment(todo?.time).isBefore(moment())) {
      setShowError({
        emptyTask: false,
        invalidTime: true,
      });
      return;
    }

    setUpdateTodo(false);
    if (selectedTodo) {
      dispatch(
        editTodo({
          ...todo,
          color: 'purple',
          completed: false,
          time: todo?.time,
          id: selectedTodo?.id,
        })
      );
    } else {
      const newTodo = {
        ...todo,
        color: 'purple',
        completed: false,
        id: Math.random() * 1000000,
        time: todo?.time,
      };
      dispatch(addTodo(newTodo));
    }

    setShowAddTodoModal(false);
  };
  const editTodoButton = (todo) => {
    setShowAddTodoModal(true);
    setSelectedTodo(todo);
    setUpdateTodo(true);
  };
  const deleteTodoButton = (todo) => {
    setShowConfirmationModal(true);
    setSelectedTodo(todo);
  };
  const confirmationModalCancelButton = () => {
    setShowConfirmationModal(false);
    setUpdateTodo(false);
  };
  const confirmationModalDeleteButton = () => {
    dispatch(removeTodo({ id: selectedTodo?.id }));
    setShowConfirmationModal(false);
    setSelectedTodo(null);
  };
  return (
    <div>
      <div className="w-screen flex justify-center h-auto">
        <div className="w-1/3 justify-center border-2 border-blue-500 p-3 mt-5 rounded-md">
          <NavBar dateTime={dateTime} />
          <div className="flex m-3 justify-between items-center ">
            <h3 className="text-3xl font-bold">Today</h3>
            <IoAddCircleOutline
              className="text-2xl text-blue-600 cursor-pointer"
              onClick={() => {
                setUpdateTodo(false);
                setShowAddTodoModal(true);
                setSelectedTodo(null);
              }}
            />
          </div>
          {getAllTodos?.map((singleTodo) => {
            return (
              <TodoItemList
                key={singleTodo?.id}
                todo={singleTodo}
                editTodoButton={editTodoButton}
                deleteTodoButton={deleteTodoButton}
              />
            );
          })}
          {showAddTodoModal && (
            <AddTodoModal
              addTodoModalCancelButton={() => setShowAddTodoModal(false)}
              addTodoModalDoneButton={addTodoModalDoneButton}
              updateTodo={updateTodo}
              selectedTodo={selectedTodo}
            />
          )}
        </div>
        {showConfirmationModal && (
          <ConfirmationModal
            confirmationModalCancelButton={confirmationModalCancelButton}
            confirmationModalDeleteButton={confirmationModalDeleteButton}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
