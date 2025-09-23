import { cookies } from "next/headers";

export async function POST() {

    const cookieStore = cookies();
    cookieStore.set({
        name: 'token',
        value: '',
        path: '/',
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    });

    return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
