"use client"

import Image from "next/image";
import Sidebar from "./components/sidebar/sidebar";
import { TOP_TAGS } from "./data";
import TopPageComponent from "./components/topPageSection/topPage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

export default function Home() {
  const username = useSelector((state: RootState) => state.user.username);

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
            TOP_TAGS.map((data)=>(
              <TopPageComponent key={data.id} data={data} />
            ))
          }
        </div>
      </div>
    </main>
  );
}
