import { format, formatDistanceToNowStrict } from "date-fns"
import { Priority, Status } from "./taskColumn"

interface TaskCardProps {
    title: string,
    description: string,
    status: Status,
    priority: Priority,
    deadline: Date,
    createdAt: string,
    index: number
    setactiveCard: any
}

export default function TaskCard({title, description, status, priority, deadline, createdAt, index, setactiveCard}: TaskCardProps) {
    let timeAgo = formatDistanceToNowStrict(new Date(createdAt), {addSuffix: true});
    const formatedDate = format(new Date(deadline), 'yyyy-MM-dd')

    return (
    <div className="flex flex-col p-[14px] bg-[#F9F9F9] rounded-lg border-[#DEDEDE] border text-[#606060] cursor-grab active:opacity-70 active:border active:border-[#797979]" draggable onDragStart={() => setactiveCard(index)} onDragEnd={() => setactiveCard(null)}>
        <h3 className="text-[16px] font-semibold">{title}</h3>
        <p className="text-[14px] text-[#797979] mt-1">{description}</p>
        <span className={`text-[12px] mt-[13px] px-2 py-[6px] inline-block max-w-fit text-white rounded-lg ${priority==='urgent' ? 'bg-[#FF6B6B]' : ''} || ${priority==='high' ? 'bg-[#b62b2b]' : ''} || ${priority==='medium' ? 'bg-[#FFA235]' : ''} || ${priority==='low' ? 'bg-[#0ECC5A]' : ''}`}>{priority}</span>
        <div className="flex items-center gap-x-2 mt-[13px]">
            <img src="/clock-icon.svg" alt="clock" />
            <span>{formatedDate}</span>
        </div>
        <span className="mt-4">{timeAgo}</span>
    </div>)
}