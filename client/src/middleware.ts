import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ['/'], // Apply middleware to protected routes
};

export function middleware(request: NextRequest) {

    let token = request.cookies.get('token');

    console.log(token);

    if(!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}