import React, { useEffect, useState } from 'react';
import moment from 'moment';

const AddTodoModal = ({
  addTodoModalCancelButton,
  addTodoModalDoneButton,
  updateTodo,
  selectedTodo,
}) => {
  const [todo, setTodo] = useState({
    task: selectedTodo ? selectedTodo?.task : '',
    time: selectedTodo
      ? selectedTodo?.time
      : moment(moment().add(1, 'minutes')).format('YYYY-MM-DD HH:mm'),
  });
  const [showError, setShowError] = useState({
    emptyTask: false,
    invalidTime: false,
  });

  const handleOnChange = (event) => {
    const isInvalidTime = moment(todo?.time).isBefore(moment());
    const isEmptyTask = event.target.value.trim().length === 0;

    const errorState = {
      emptyTask: isEmptyTask,
      invalidTime: isInvalidTime && !isEmptyTask,
    };

    setShowError(errorState);
    setTodo((prev) => ({
      ...prev,
      task: event.target.value,
    }));
  };

  const handleDateOnChange = (e) => {
    const selectedTime = moment(e.target.value, 'YYYY-MM-DD HH:mm');
    const isEmptyTask = todo?.task.trim() === '';
    const isInvalidTime = selectedTime.isBefore(moment());

    setShowError({
      emptyTask: isEmptyTask,
      invalidTime: isEmptyTask && isInvalidTime,
    });

    setTodo((prev) => ({
      ...prev,
      time: moment(e.target.value, 'YYYY-MM-DD HH:mm').format(
        'YYYY-MM-DD HH:mm'
      ),
    }));
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-content flex flex-col border-2 border-gray-200 rounded-md p-3 w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white">
        <h2 className="text-xl font-bold text-left">
          {updateTodo ? 'Update' : 'Add'} Todo
        </h2>
        <textarea
          placeholder="Enter your task here..."
          className="border px-3 py-2 mt-4 w-full outline-none border-2 border-gray-200 rounded-md"
          value={todo?.task}
          onChange={handleOnChange}
        ></textarea>
        {showError?.emptyTask && (
          <p className="text-red-500">Task Can't be empty</p>
        )}
        <input
          type="datetime-local"
          name=""
          id=""
          min={moment().format('YYYY-MM-DD HH:mm')}
          className="border px-3 py-2 mt-4 w-full outline-none border-2 border-gray-200 rounded-md"
          onChange={handleDateOnChange}
          value={
            todo?.time
              ? todo?.time
              : moment(moment().add(1, 'minutes')).format('YYYY-MM-DD HH:mm')
          }
        />
        {showError?.invalidTime && (
          <p className="text-red-500">Task time can't be in past</p>
        )}
        <div className="flex justify-between mt-4">
          <button
            className="text-blue-400 font-bold py-2 rounded mr-2"
            onClick={addTodoModalCancelButton}
          >
            Cancel
          </button>
          <button
            className="text-blue-500 font-bold py-2 rounded"
            onClick={() => {
              addTodoModalDoneButton(todo, setShowError);
            }}
          >
            {updateTodo ? 'Update' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
