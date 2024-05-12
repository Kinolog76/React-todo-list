import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem("myTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  function addTask() {
    const updatedTasks = [inputValue, ...taskList];
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
    setTaskList(updatedTasks);
    setInputValue("");
  }

  function deleteTask(taskIndex) {
    const updatedTasks = taskList.filter((_, index) => index !== taskIndex);
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
    setTaskList(updatedTasks);
  }

  function increasePriority(taskIndex) {
    if (taskIndex > 0) {
      const updatedTasks = [...taskList];
      const task = updatedTasks.splice(taskIndex, 1)[0];
      updatedTasks.splice(taskIndex - 1, 0, task);
      localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
      setTaskList(updatedTasks);
    }
  }

  function reducePriority(taskIndex) {
    if (taskIndex < taskList.length - 1) {
      const updatedTasks = [...taskList];
      const task = updatedTasks.splice(taskIndex, 1)[0];
      updatedTasks.splice(taskIndex + 1, 0, task);
      localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
      setTaskList(updatedTasks);
    }
  }

  function changeTaskValue(e) {
    setInputValue(e.target.value);
  }
  return (
    <>
      <h1 className="text-center text-white font-bold text-4xl my-10">My todo list</h1>
      <div className="w-full flex gap-3 sm:flex-row flex-col items-center justify-center ">
        <input
          className="max-w-96 w-full rounded-lg p-1 text-lg"
          value={inputValue}
          placeholder="Add task"
          onChange={changeTaskValue}
          type="text"
        />
        <button
          onClick={addTask}
          disabled={inputValue.length === 0}
          className="bg-green-600 disabled:opacity-50 sm:px-5 px-28 py-1 rounded-lg text-white text-lg font-semibold">
          Add
        </button>
      </div>
      <div className="max-w-3xl mt-10 mx-auto">
        {taskList.map((task, index) => (
          <div
            key={index}
            className="mb-3 bg-gray-600 rounded-md p-3 flex gap-5 sm:flex-row flex-col justify-between">
            <p className="text-xl text-white  mr-auto">
              <span className="text-green-500">{index + 1}.</span> {task}
            </p>
            <div className="min-w-fit">
              {index != 0 && (
                <button onClick={() => increasePriority(index)} className="text-xl mx-3">
                  ☝
                </button>
              )}
              {index != taskList.length - 1 && (
                <button onClick={() => reducePriority(index)} className="text-xl mx-3">
                  👇
                </button>
              )}
              <button
                onClick={() => deleteTask(index)}
                className="bg-red-600 text-white px-2 py-1 font-semibold rounded-sm sm:mx-3 sm:float-none float-right">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
