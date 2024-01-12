import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);


  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }


  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">
        {tasks.length !== 0 && (
          <h2 className="my-2 ml-2 md:ml-0 text-2xl text-yellow-100 font-bold">
            Your Tasks ({tasks.length})
          </h2>
        )}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (
              <div className="w-[600px] h-[300px] flex items-center justify-center gap-4">
                <span className="text-white text-2xl">No tasks found</span>
                <Link
                  to="/tasks/add"
                  className="text-white shadow-md shadow-green-400 font-mono text-xl
               hover:bg-green-600 font-medium bg-gradient-to-t from-green-600 to-teal-900 rounded-full hover:shadow-none px-5 py-3"
                >
                  + Add new task{" "}
                </Link>
              </div>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={task._id}
                  className=" my-4 p-4 text-gray-600 rounded-md shadow-md bg-gradient-to-t from-slate-50 to-teal-200"
                >
                  <div className="flex gap-8">
                    <span className="font-medium">Task #{index + 1}</span>

                    <Tooltip text={"Edit this task"} position={"top"}>
                      <Link
                        to={`/tasks/${task._id}`}
                        className="ml-auto mr-2 text-green-600 cursor-pointer"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>

                    <Tooltip text={"Delete this task"} position={"top"}>
                      <span
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(task._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>
                  </div>
                  <div className="whitespace-pre">{task.description}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );

}

export default Tasks