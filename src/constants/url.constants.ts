export const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL as string
export const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL as string
export const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL as string
export const MEDIA_PATHNAME = process.env.NEXT_PUBLIC_MEDIA_URL?.replace(/^(https?:\/\/)?(www\.)?/, '') as string;
export const TELEGRAM_BOT_URL = process.env
	.NEXT_PUBLIC_TELEGRAM_BOT_URL as string
