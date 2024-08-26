import TaskCard from "./taskCard"

export enum Status {
    TODO ='todo',
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
    deadline: string
    createdAt: string
}

interface TaskColumnProps {
    title: string,
    tasks: Task[],
    status: string
}

export default function TaskColumn({title, tasks, status}: TaskColumnProps) {

    return(
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-xl text-[#555555]">{title}</span>
              <img src="/more-icon.svg" alt="more-icon" />
            </div>
            <div>
                {
                    tasks.map((task, index) => 
                        task.status == status && (
                            <TaskCard 
                                key={index}
                                title={task.title}
                                description={task.description}
                                status={task.status}
                                priority={task.priority}
                                deadline={task.deadline}
                                createdAt={task.createdAt}
                                index={index}
                            />
                        )
                    )
                }
            </div>
        </div>
    )
}