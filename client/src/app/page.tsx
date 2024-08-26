"use client"

import Sidebar from "./components/sidebar/sidebar";
import { TOP_TAGS } from "./data";
import TopPageComponent from "./components/topPageSection/topPage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect, useState } from "react";
import TaskColumn from "./components/TaskColumns/taskColumn";

export default function Home() {
  const username = useSelector((state: RootState) => state.user.username);
  const [task, setTask] = useState([]);

  useEffect(() => {
    getAllTickets();
  }, [])

  async function getAllTickets() {
    const response = await fetch('http://localhost:8080/todo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })

    const result = await response.json()
    console.log(result)
    setTask(result);
  }

  return (
    <main className="flex">
      <Sidebar></Sidebar>
      <div className="flex-1 pt-6 pr-8 pl-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[48px] font-semibold">Good Morning, {username}!</h1>
          <span className="flex items-center">
            Help & feedback
            <img className="ml-2" src="question-tooltip.svg" alt="question-info" />
          </span>
        </div>
        <div className="flex gap-x-2">
          {
            TOP_TAGS.map((data) => (
              <TopPageComponent key={data.id} data={data} />
            ))
          }
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex bg-white p-1 w-[196px] h-[40px] rounded has-[:focus]:border-[1.5px] has-[:focus-within]:border-[1.5px] has-[:focus]:border-black has-[:focus-within]:border-black">
            <input type="text" className="bg-transparent w-full focus-within:outline-none focus:outline-none" placeholder="Search" />
            <img src='/search-icon.svg' alt="search-icon" />
          </div>

          <div className="flex items-center gap-x-4 text-[#797979]">
            <div className="flex items-center">
              <span>Calender View</span>
              <img className="ml-[14px] mr-2" src="/calender-icon.svg" alt="calender" />
            </div>
            <div className="flex items-center">
              <span>Automation</span>
              <img className="ml-[14px] mr-2" src="/automation-icon.svg" alt="automation" />
            </div>
            <div className="flex items-center">
              <span>Filter</span>
              <img className="ml-[14px] mr-2" src="/filter-icon.svg" alt="filter" />
            </div>
            <div className="flex items-center">
              <span>Share</span>
              <img className="ml-[14px] mr-2" src="share-icon.svg" alt="share" />
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-t from-[#4C38C2] to-[#2F2188] flex justify-center items-center">
              <span className="text-white mr-2 text-xl">Create Task</span>
              <img src="/sidebar/plus-icon.svg" alt="plus icon" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 mt-4 grid grid-cols-4 gap-x-4">
          <TaskColumn 
            title="To Do"
            tasks={task}
            status="todo"
          />
          <TaskColumn 
            title="In Progress"
            tasks={task}
            status="in progress"
          />
          <TaskColumn 
            title="Under review"
            tasks={task}
            status="under review"
          />
          <TaskColumn 
            title="Finished"
            tasks={task}
            status="finished"
          />
        </div>
      </div>
    </main>
  );
}
