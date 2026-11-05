import { NextResponse } from 'next/server';
import { signOut } from 'next-auth/react';

export async function POST() {
  // signOut from next-auth (client side) does not work on server, so just clear cookie
  // Removing the session token cookie forces logout
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: 'next-auth.session-token',
    value: '',
    expires: new Date(0),
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
  return response;
}
