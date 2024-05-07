import React, { useState } from "react";
import { TaskItem } from "..";
import { ITask } from "../../types";
import { useTaskListHook } from "./hooks";

const TaskList: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { data: tasks } = useTaskListHook(page);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.data.map((task: ITask) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="flex items-center flex-column flex-wrap md:flex-row justify-end pt-4 gap-4"
        aria-label="Table navigation"
      >
        <button
          disabled={page === 1 ? true : false}
          onClick={() => setPage(page - 1)}
          className="text-gray-500 bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={tasks.pageNumber ? false : true}
          className="text-gray-500 bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TaskList;
