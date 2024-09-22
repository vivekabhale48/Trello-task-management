"use client"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useRouter } from "next/navigation"
import { setCreateDrawerVisibility } from "@/app/redux/slice/usernameSlice";

export default function Sidebar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const username = useSelector((state: RootState) => state.user.username)
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000'

    const handleLogout = async() => {
        const response = await fetch(`${baseUrl}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        })

        if(response.ok) {
            router.push('/login');
        }
        else {
            console.error('Failed to logout!')
        }
    }

    return (
        <div className="max-w-[285px] bg-white h-[100vh] max-h-full pt-6 px-4 pb-8 flex flex-col justify-between">
            <div>
                <div className="flex items-center mb-2">
                    <div className="mr-2"><img src="/sidebar/profile-pic.png" alt="profile pic" /></div>
                    <h4 className="text-xl">{username}</h4>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-5">
                        <img src="/sidebar/bell-icon.svg" alt="bell icon" />
                        <img src="/sidebar/mode-icon.svg" alt="mode" />
                        <img src="/sidebar/skip-icon.svg" alt="skip" />
                    </div>
                    <div onClick={handleLogout} className="bg-[#F7F7F7] text-[#797979] py-[10px] px-2 rounded cursor-pointer bg-btn-gradient transition-all duration-200">
                        Logout
                    </div>
                </div>
                <div className="mt-4">
                    <ul className="">
                        <li className="mb-2 p-2 flex items-center bg-[#F7F7F7] text-[#797979]">
                            <img className="mr-2" src="/sidebar/home-icon.svg" alt="home-icon" />
                            Home
                        </li>
                        <li className="mb-2 p-2 flex items-center text-[#797979]">
                            <img className="mr-2" src="/sidebar/boards-icon.svg" alt="board icon" />
                            Boards
                        </li>
                        <li className="mb-2 p-2 flex items-center text-[#797979]">
                            <img className="mr-2" src="/sidebar/settings.svg" alt="settings" />
                            Settings
                        </li>
                        <li className="mb-2 p-2 flex items-center text-[#797979]">
                            <img className="mr-2" src="/sidebar/teams.svg" alt="teams" />
                            Teams
                        </li>
                        <li className="mb-2 p-2 flex items-center text-[#797979]">
                            <img className="mr-2" src="/sidebar/analytics-icon.svg" alt="analytics" />
                            Analytics
                        </li>
                    </ul>
                </div>
                <div
                    onClick={() => dispatch(setCreateDrawerVisibility(true))}
                    className="cursor-pointer py-[14px] px-[30px] rounded-lg bg-gradient-to-t from-[#4C38C2] to-[#2F2188] flex justify-center items-center">
                    <span className="text-white mr-2 text-xl">Create new Task</span>
                    <img src="/sidebar/plus-icon.svg" alt="plus icon" />
                </div>
            </div>
            <div className="flex items-center justify-center bg-[#F7F7F7] rounded">
                <div className="mr-1">
                    <img src="/sidebar/download-icon.svg" alt="download" />
                </div>
                <div className="text-[#797979]">
                    <p className="text-xl mb-1 font-semibold">Download the app</p>
                    <p className="text-sm">Get the full experience</p>
                </div>
            </div>
        </div>
    )
}