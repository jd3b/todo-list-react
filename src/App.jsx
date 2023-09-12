import { useState } from "react";
import { FiTrash2, FiEdit, FiGithub } from "react-icons/fi";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingIndex, setUpdatingIndex] = useState(-1);
  const addTodo = (e) => {
    e.preventDefault();
    if (task == "") {
      return;
    }
    if (isUpdating) {
      setMainTask(
        mainTask.map((t, i) => {
          if (i == updatingIndex) return task;
          else {
            return t;
          }
        })
      );
      setIsUpdating(false);
    } else {
      setMainTask([...mainTask, task]);
    }

    setTask("");
  };

  const deleteTodo = (index) => {
    setMainTask(mainTask.filter((item, i) => i != index));
  };
  const updateTodo = (index) => {
    setTask(mainTask[index]);
    setIsUpdating(true);
    setUpdatingIndex(index);
  };

  const renderTask = () => (
    <div className="flex flex-col justify-between mx-auto p-2 mt-8 rounded-lg max-w-xl min-w-max bg-[#088395]">
      {mainTask.map((task, index) => {
        return (
          <>
            <div
              key={index}
              className="flex flex-row justify-between items-center gap-2"
            >
              <div className=" text-lg text-white">{task}</div>
              <div className="flex items-center justify-end ">
                <button
                  onClick={() => updateTodo(index)}
                  className="text-white text-lg"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => deleteTodo(index)}
                  className="text-white text-lg"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="w-full h-8 fixed text-white p-4 ">
        <FiGithub
          className="animate-bounce"
          size="2rem"
          onClick={() => {
            window.open("https://github.com/jd3b/");
          }}
        />
      </div>
      <div className="h-screen w-full ]">
        <div className="flex justify-center items-center text-7xl p-24 text-[#fff] ">
          Just Do It
        </div>
        <form onSubmit={addTodo}>
          <div className="flex justify-center items-center gap-5 m-auto">
            <input
              type="text"
              className="outline-none rounded-lg w-1/4 h-8 p-2"
              placeholder="Enter a task"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
            <button className="bg-[#000] p-2  text-white rounded-md">
              {isUpdating ? "Update Todo" : "Add Todo"}
            </button>
          </div>
        </form>

        {mainTask.length ? renderTask() : <></>}
      </div>
    </>
  );
}

export default App;
