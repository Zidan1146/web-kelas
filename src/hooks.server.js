import { redirect } from "@sveltejs/kit";

/** @type {import("@sveltejs/kit").Handle} */
export async function handle({ event, resolve }) {
  event.locals.sessionId = event.cookies.get('session-id');
  if(!event.locals.sessionId && !(event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register'))) 
    throw redirect(307, '/login');

  const response = await resolve(event);
  return response;
}