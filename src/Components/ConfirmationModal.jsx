import React from 'react';

const ConfirmationModal = ({
  confirmationModalCancelButton,
  confirmationModalDeleteButton,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none block`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-50 bg-white w-full max-w-md p-6 rounded shadow-lg">
        <button
          className="absolute top-0 right-0 p-2 text-lg text-gray-700 hover:text-gray-900"
          onClick={confirmationModalCancelButton}
        >
          &times;
        </button>
        <p className="text-red-500 text-center text-xl">
          Are you sure you want to delete?
        </p>
        <div className="flex mt-5 justify-between">
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={confirmationModalCancelButton}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={confirmationModalDeleteButton}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
