import { setCheckTicketCreateUpdate, setCreateDrawerVisibility } from "@/app/redux/slice/usernameSlice";
import { RootState } from "@/app/redux/store";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TicketSidebar() {
    const dispatch = useDispatch();
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [title, setTitle] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [priority, setPriority] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const checkTicketCreateUpdate = useSelector((state: RootState) => state.user.checkTicketCreateUpdate);

    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDownFunction)

        return () => document.removeEventListener('keydown', handleKeyDownFunction);
        
    }, [date, title, description, status, priority])

    function handleKeyDownFunction(event: KeyboardEvent) {
        if(event.key === 'Enter' && date && title !== '' && status !== '' && priority !== '' && description !== '') {
            createATicket();
        }
    }

    async function createATicket() {
        const deadline = date?.toISOString();
        const response = await fetch('http://localhost:8080/todo/create-todo', {
            method: 'POST',
            body: JSON.stringify({title, description, status, priority, deadline}),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })

        const result = await response.json()
        console.log(result)
        dispatch(setCheckTicketCreateUpdate(!checkTicketCreateUpdate));
        dispatch(setCreateDrawerVisibility(false))
    }

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
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="text-[48px] focus-within:outline-none font-semibold w-full p-2 placeholder-[#cccccc]" placeholder="Title" type="text" />
                </div>
                <div className="flex items-center gap-x-10 text-[16px] mb-8">
                    <div className="w-[200px] flex items-center gap-x-5 text-[#666666] text-[16px]">
                        <img src="/ticketsidebar/status-icon.svg" alt="status-icon" />
                        <span>Status</span>
                    </div>
                    <div> 
                        <Select
                            value={status}
                            onValueChange={(val) => setStatus(val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Not selected' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todo">To Do</SelectItem>
                                <SelectItem value="in progress">In Progress</SelectItem>
                                <SelectItem value="under review">Under Review</SelectItem>
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
                        <Select
                            value={priority}
                            onValueChange={(val) => setPriority(val)}
                        >
                            <SelectTrigger>
                                <SelectValue 
                                    placeholder='Not selected' 
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
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
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start text-left font-normal text-[16px] px-3"
                                    )}
                                >
                                    {
                                        date ? (
                                            format(date, "PPP")
                                        ) : (
                                            <span className="text-[#C1BCBD]">Not Selected</span>
                                        )
                                    }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="single"
                                    selected={date ? new Date(date) : undefined}
                                    onSelect={setDate}
                                    className="rounded-md border"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="flex items-center gap-x-10 text-[16px] mb-8">
                    <div className="w-[200px] flex items-center gap-x-5 text-[#666666] text-[16px]">
                        <img src="/ticketsidebar/description-icon.svg" alt="description-icon" />
                        <span>Description</span>
                    </div>
                    <div>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} className="text-[16px] focus-within:outline-none w-full px-3 py-2 placeholder-[#cccccc]" placeholder="Not Selected" type="text" />
                    </div>
                </div>
            </div>
        </div>
    )
}