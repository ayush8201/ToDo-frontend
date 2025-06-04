import React from "react";

const Todo_item = ({ index, item, del, update, updateId, toUpdate }) => {
  const title = item?.title || "";
  const content = item?.content || item?.description || "";

  return (
    <div className="todo-card w-full max-w-sm bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
      <h5 className="text-lg font-semibold text-gray-800 mb-2">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h5>
      <p className="text-gray-600 mb-4">
        {content.slice(0, 77)}
        {content.length >= 77 ? "..." : ""}
      </p>
      <div className="flex justify-between">
        <button
          onClick={() => {
            update("flex");
            toUpdate(updateId);
          }}
          className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => del(index)}
          className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo_item;
