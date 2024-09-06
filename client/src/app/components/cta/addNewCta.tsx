import { setDeadline, setDescription, setEditId, setPriority, setStatus, setTitle } from "@/app/redux/slice/taskState.slice";
import { setCreateDrawerVisibility } from "@/app/redux/slice/usernameSlice";
import { useDispatch } from "react-redux"

export default function AddNewCta() {
    const dispatch = useDispatch();
    function handleOnclick() {
        dispatch(setTitle(''));
        dispatch(setStatus(''));
        dispatch(setPriority(''));
        dispatch(setDeadline(undefined));
        dispatch(setDescription(''));
        dispatch(setEditId(null));
        dispatch(setCreateDrawerVisibility(true))
    }
    return (
        <div 
        onClick={handleOnclick}
        className="p-2 w-full rounded-lg bg-gradient-to-t from-[#3A3A3A] to-[#202020] flex justify-between items-center cursor-pointer">
            <span className="text-[#E3E1E1] mr-2 text-[16px]">Add new</span>
            <img src="white-plus-icon.svg" alt="plus icon" />
        </div>
    )
}