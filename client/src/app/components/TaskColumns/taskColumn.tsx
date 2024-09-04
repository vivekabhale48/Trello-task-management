import TaskCard from "./taskCard"
import DropArea from "./DropArea"
import React from "react"
import AddNewCta from "../cta/addNewCta"

export enum Status {
    TODO = 'todo',
    INPROGRESS = 'in progress',
    UNDERREVIEW = 'under review',
    FINISED = 'finished'
}
export enum Priority {
    URGENT = 'urgent',
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
}
type Task = {
    title: string,
    description: string,
    status: Status,
    priority: Priority,
    deadline: Date,
    createdAt: string,
    updatedAt: Date,
    _id: string,
}

interface TaskColumnProps {
    title: string,
    tasks: Task[],
    status: string
    setactiveCard: any
    onDrop: any
}

export default function TaskColumn({ title, tasks, status, setactiveCard, onDrop }: TaskColumnProps) {

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
                <span className="text-xl text-[#555555]">{title}</span>
                <img src="/more-icon.svg" alt="more-icon" />
            </div>
            <DropArea
                onDrop={() => onDrop(status, 0)}
            />
            <div>
                {
                    tasks.map((task, index) =>
                        task.status == status && (
                            <React.Fragment key={index}>
                                <TaskCard
                                    title={task.title}
                                    description={task.description}
                                    status={task.status}
                                    priority={task.priority}
                                    deadline={task.deadline}
                                    createdAt={task.createdAt}
                                    index={index}
                                    setactiveCard={setactiveCard}
                                    ticketId={task._id}
                                />
                                <DropArea
                                    onDrop={() => onDrop(status, index + 1)}
                                />
                                
                            </React.Fragment>
                        )
                    )
                }
            </div>
            <AddNewCta />
        </div>
    )
}