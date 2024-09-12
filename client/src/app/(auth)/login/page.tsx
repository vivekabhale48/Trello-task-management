"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react"
import { useDispatch } from "react-redux";

export default function Login() {


    const [email, getemail] = useState<string>('');
    const [password, getPassword] = useState<string>('');
    const router = useRouter();
    const dispatch = useDispatch();

    const onSubmit:FormEventHandler<HTMLFormElement> = async(event) => {
        event.preventDefault();
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
            credentials: 'include',
          });

        if(response.ok) {
            router.push('/');
        }
    }

    return (
    <div className="bg-[#F7F7F7] border border-[#CECECE] rounded-2xl mt-[120px] mx-auto max-w-[648px]">
        <div className="p-[60px]">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-[48px] mb-8">Welcome to <span className="text-[#4534AC]">Workflo</span>!</h1>
                <form onSubmit={onSubmit}>
                    <input value={email} onChange={(e)=>getemail(e.target.value)} className="bg-[#EBEBEB] text-[20px] py-3 px-3 mb-6 w-full" placeholder="Your email" type="text" name="email" id="email" />
                    <input value={password} onChange={(e)=>getPassword(e.target.value)} className="bg-[#EBEBEB] text-[20px] py-3 px-3 mb-6 w-full" placeholder="Password" type="password" name="password" id="password" />
                    <button className="rounded-lg bg-gradient-to-t from-[#4C38C2] to-[#2F2188] opacity-70 py-[14px] text-[20px] text-white mb-8 w-full" type="submit">Login</button>
                </form>
                <span className="text-[20px]">Don't hava an account? Create a <Link href='/register'><span className="text-[#0054A1]">new account.</span></Link></span>
            </div>
        </div>
    </div>)
}