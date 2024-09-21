"use client"

import { useRouter } from 'next/navigation';
import Link from "next/link";
import { FormEventHandler, useState } from "react"

export default function Register() {


    const [name, setname] = useState<string>('');
    const [email, getemail] = useState<string>('');
    const [password, getPassword] = useState<string>('');
    const router = useRouter();
    
    const onsubmit:FormEventHandler<HTMLFormElement> = async(event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:8080/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}),
            credentials: 'include'
        })

        const result = await response.json();
        console.log(result);

        if(response.ok) {
            router.push('/login');
        }

    }

    return (
    <div className="bg-[#F7F7F7] border border-[#CECECE] rounded-2xl mt-[120px] mx-auto max-w-[648px]">
        <div className="p-[60px]">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-[48px] mb-8">Welcome to <span className="text-[#4534AC]">Workflo</span>!</h1>
                <form onSubmit={onsubmit}>
                    <input value={name} onChange={(e)=>setname(e.target.value)} className="bg-[#EBEBEB] text-[20px] py-3 px-3 mb-6 w-full" placeholder="Full Name" type="text" name="firstName" id="name" />
                    <input value={email} onChange={(e)=>getemail(e.target.value)} className="bg-[#EBEBEB] text-[20px] py-3 px-3 mb-6 w-full" placeholder="Your email" type="text" name="email" id="email" />
                    <input value={password} onChange={(e)=>getPassword(e.target.value)} className="bg-[#EBEBEB] text-[20px] py-3 px-3 mb-6 w-full" placeholder="Password" type="password" name="password" id="password" />
                    <button className="rounded-lg bg-gradient-to-t from-[#4C38C2] to-[#2F2188] opacity-70 py-[14px] text-[20px] text-white mb-8 w-full" type="submit">Sign Up</button>
                </form>
                <span className="text-[20px]">Alreadt have an account? <Link href='/login'><span className="text-[#0054A1]">Log in.</span></Link></span>
            </div>
        </div>
    </div>)
}