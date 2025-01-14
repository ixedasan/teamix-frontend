import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const routes = {
	public: {
		exact: ['/'],
		startsWith: ['/account/']
	},
	afterLogin: '/dashboard'
}

const isPublicRoute = (path: string): boolean => {
	if (routes.public.exact.includes(path)) {
		return true
	}

	return routes.public.startsWith.some(pattern => path.startsWith(pattern))
}

const extractProjectId = (pathname: string): string | null => {
	const projectMatch = pathname.match(/^\/projects\/([^\/]+)/)
	return projectMatch ? projectMatch[1] : null
}

const isProjectPage = (pathname: string): boolean => {
	return pathname.startsWith('/projects/')
}

export function middleware(request: NextRequest) {
	const token = request.cookies.get('session')
	const { pathname } = request.nextUrl
	let response = NextResponse.next()

	if (isProjectPage(pathname)) {
		const projectId = extractProjectId(pathname)
		if (projectId) {
			response = NextResponse.next({
				request: {
					headers: request.headers
				}
			})
			response.cookies.set('projectId', projectId, {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax'
			})
		}
	} else {
		response = NextResponse.next({
			request: {
				headers: request.headers
			}
		})
		response.cookies.delete('projectId')
	}

	if (token && isPublicRoute(pathname)) {
		return NextResponse.redirect(new URL(routes.afterLogin, request.url))
	}

	if (!token && !isPublicRoute(pathname)) {
		return NextResponse.redirect(new URL('/account/login', request.url))
	}

	return response
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		'/((?!_next/static|_next/image|favicon.ico|public).*)'
	]
}
