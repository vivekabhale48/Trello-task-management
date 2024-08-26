import { formatDistanceToNowStrict } from "date-fns"
import { Priority, Status } from "./taskColumn"

interface TaskCardProps {
    title: string,
    description: string,
    status: Status,
    priority: Priority,
    deadline: string,
    createdAt: string,
    index: number
}

export default function TaskCard({title, description, status, priority, deadline, createdAt, index}: TaskCardProps) {
    let timeAgo = formatDistanceToNowStrict(new Date(createdAt), {addSuffix: true});

    return (
    <div draggable className="flex flex-col p-[14px] bg-[#F9F9F9] mt-4 rounded-lg border-[#DEDEDE] border text-[#606060] cursor-grab">
        <h3 className="text-[16px] font-semibold">{title}</h3>
        <p className="text-[14px] text-[#797979] mt-1">{description}</p>
        <span className={`text-[12px] mt-[13px] px-2 py-[6px] inline-block max-w-fit text-white rounded-lg ${priority==='urgent' ? 'bg-[#FF6B6B]' : ''} || ${priority==='high' ? 'bg-[#b62b2b]' : ''} || ${priority==='medium' ? 'bg-[#FFA235]' : ''} || ${priority==='low' ? 'bg-[#0ECC5A]' : ''}`}>{priority}</span>
        <div className="flex items-center gap-x-2 mt-[13px]">
            <img src="/clock-icon.svg" alt="clock" />
            <span>{deadline}</span>
        </div>
        <span className="mt-4">{timeAgo}</span>
        <span>{index}</span>
    </div>)
}