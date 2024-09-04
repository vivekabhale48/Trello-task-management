"use client"

import Sidebar from "./components/sidebar/sidebar";
import { TOP_TAGS } from "./data";
import TopPageComponent from "./components/topPageSection/topPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect, useState } from "react";
import TaskColumn from "./components/TaskColumns/taskColumn";
import { setCreateDrawerVisibility, setUsername } from "./redux/slice/usernameSlice";
import TicketSidebar from "./components/addticketsidebar/ticketSidebar";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
interface TaskMove {
  createdAt: string;
  deadline: string;
  description: string;
  priority: string;
  reporters: string;
  status: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export default function Home() {
  const username = useSelector((state: RootState) => state.user.username);
  const createDrawerVisibility = useSelector((state: RootState) => state.user.createDrawerVisibility);
  const checkTicketCreateUpdate = useSelector((state: RootState) => state.user.checkTicketCreateUpdate);
  const [task, setTask] = useState<any[]>([]);
  const [taskCopy, setTaskCopy] = useState<any[]>([]);
  const [activeCard, setactiveCard] = useState(null);
  const [searchTask, setSearchTask] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getAllTickets();
  }, [checkTicketCreateUpdate])

  useEffect(() => {
    findLoggedInUser();
  }, [])

  async function findLoggedInUser() {
    const response = await fetch('http://localhost:8080/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })

    const result = await response.json()
    dispatch(setUsername(result?.user?.name));
  }

  async function getAllTickets() {
    const response = await fetch('http://localhost:8080/todo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })

    const result = await response.json()
    console.log(result);
    setTask(result);
    setTaskCopy(result);
  }

  function onDrop(status:string, position: number) {
    if(activeCard === null || activeCard === undefined) return;

    const taskToMove = task[activeCard];
    const updatedTasks = task.filter((t, index) => index !== activeCard);
    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status
    })
    setTask(updatedTasks);
    setTaskCopy(updatedTasks);
    updateTicketStatus(taskToMove, status)
  }

  async function updateTicketStatus(taskToMove:TaskMove, status:string) {
    const response = await fetch('http://localhost:8080/todo/update-todo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status:status, updateTicketId:taskToMove._id}),
      credentials: 'include',
    })
  }

  function onSearch(value:string) {
    setSearchTask(value);

    let updatedSearchArray = taskCopy;
    if (value.trim() !== '') {
      updatedSearchArray = taskCopy.filter((task) =>
        task.title.toLowerCase().includes(value.toLowerCase())
      );
    }
    setTask(updatedSearchArray);
  }

  return (
    <main className="flex">
      <Sidebar></Sidebar>

      <Sheet 
        open={createDrawerVisibility}
        onOpenChange={(status) => dispatch(setCreateDrawerVisibility(status))}
      >
        <SheetTitle className="hidden" />
        <SheetContent
          side='right'
          className="w-full !max-w-[670px]"
        >
            <SheetDescription className="hidden" aria-describedby={undefined} />
              <TicketSidebar />             
        </SheetContent>
      </Sheet>
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
            <input value={searchTask} onChange={(e) => onSearch(e.target.value)} type="text" className="bg-transparent w-full focus-within:outline-none focus:outline-none" placeholder="Search" />
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
            <div 
              onClick={() => dispatch(setCreateDrawerVisibility(true))}
              className="p-2 rounded-lg bg-gradient-to-t from-[#4C38C2] to-[#2F2188] flex justify-center items-center cursor-pointer">
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
            setactiveCard={setactiveCard}
            onDrop={onDrop}
          />
          <TaskColumn 
            title="In Progress"
            tasks={task}
            status="in progress"
            setactiveCard={setactiveCard}
            onDrop={onDrop}
          />
          <TaskColumn 
            title="Under review"
            tasks={task}
            status="under review"
            setactiveCard={setactiveCard}
            onDrop={onDrop}
          />
          <TaskColumn 
            title="Finished"
            tasks={task}
            status="finished"
            setactiveCard={setactiveCard}
            onDrop={onDrop}
          />
        </div>
      </div>

    </main>
  );
}
