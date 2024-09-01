import { setCreateDrawerVisibility } from "@/app/redux/slice/usernameSlice";
import { RootState } from "@/app/redux/store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";

export default function TicketSidebar() {

  const dispatch = useDispatch();

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex justify-center gap-x-4 items-center">
                    <img
                        className="cursor-pointer"
                        onClick={() => dispatch(setCreateDrawerVisibility(false))} 
                        src="/ticketsidebar/cross-icon.svg" alt="cross-icon" />
                    <img src="/ticketsidebar/expand-icon.svg" alt="expand-icon" />
                </div>
                <div className="flex items-center">
                    <div className="bg-[#F4F4F4] text-[#797979] p-2 rounded flex items-center mr-4">
                        <span className="mr-[14px]">Share</span>
                        <img src="/ticketsidebar/share-icon.svg" alt="share-icon" />
                    </div>
                    <div className="bg-[#F4F4F4] text-[#797979] p-2 rounded flex items-center">
                        <span className="mr-[14px]">Favorite</span>
                        <img src="/ticketsidebar/fav-icon.svg" alt="fav-icon" />
                    </div>
                </div>
            </div>

            <div className="mt-[27px]">
                <div className="mb-8">
                    <input className="text-[48px] focus-within:outline-none font-semibold w-full p-2 placeholder-[#cccccc]" placeholder="Title" type="text" />
                </div>
                <div className="flex items-center gap-x-10 text-[16px] mb-8">
                    <div className="w-[200px] flex items-center gap-x-5 text-[#666666] text-[16px]">
                        <img src="/ticketsidebar/status-icon.svg" alt="status-icon" />
                        <span>Status</span>
                    </div>
                    <div> 
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder='Not selected' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todo">To Do</SelectItem>
                                <SelectItem value="inprogress">In Progress</SelectItem>
                                <SelectItem value="underreview">Under Review</SelectItem>
                                <SelectItem value="finished">Finished</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center gap-x-10 text-[16px] mb-8">
                    <div className="w-[200px] flex items-center gap-x-5 text-[#666666] text-[16px]">
                        <img src="/ticketsidebar/priority-icon.svg" alt="priority-icon" />
                        <span>Priority</span>
                    </div>
                    <div> 
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder='Not selected' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todo">Low</SelectItem>
                                <SelectItem value="inprogress">Medium</SelectItem>
                                <SelectItem value="underreview">High</SelectItem>
                                <SelectItem value="finished">Urgent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center gap-x-10 text-[16px] mb-8">
                    <div className="w-[200px] flex items-center gap-x-5 text-[#666666] text-[16px]">
                        <img src="/ticketsidebar/deadline-icon.svg" alt="deadline-icon" />
                        <span>Deadline</span>
                    </div>
                    <div> 
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder='Not selected' />
                            </SelectTrigger>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center gap-x-10 text-[16px] mb-8">
                    <div className="w-[200px] flex items-center gap-x-5 text-[#666666] text-[16px]">
                        <img src="/ticketsidebar/description-icon.svg" alt="description-icon" />
                        <span>Description</span>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}