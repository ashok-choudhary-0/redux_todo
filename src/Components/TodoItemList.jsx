import moment from 'moment';
import React, { useEffect } from 'react';
import { IoMdAlarm } from 'react-icons/io';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { editTodo } from '../Redux/slices/TodoSlice';

const TodoItemList = ({ todo, editTodoButton, deleteTodoButton }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex justify-between gap-2 items-center ml-4">
          <input
            type="checkbox"
            name=""
            id=""
            className="h-4 w-4 rounded-full border-2 border-gray-400"
            onChange={(e) => {
              const isChecked = e.target.checked;
              dispatch(
                editTodo({
                  id: todo.id,
                  completed: isChecked,
                })
              );
            }}
          />
          <div>
            <p>{todo?.task}</p>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <IoMdAlarm /> <span>{todo?.time}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center mr-4 gap-1">
          <span
            className={`h-3.5 w-3.5 rounded-full border border-black-500 ${
              todo?.completed === true
                ? 'bg-green-600'
                : moment(todo?.time).isBefore(moment())
                ? 'bg-red-600'
                : 'bg-purple-600'
            }`}
          ></span>
          <MdEdit
            className="cursor-pointer"
            onClick={() => {
              editTodoButton(todo);
            }}
          />
          <MdDelete
            className="cursor-pointer"
            onClick={() => {
              deleteTodoButton(todo);
            }}
          />
        </div>
      </div>
      <hr className="ml-10 mt-3 mb-3" />
    </div>
  );
};

export default TodoItemList;
