import { MEDIA_URL } from '@/lib/constants/url.constants'

export function getMediaSource(path: string | undefined | null) {
	return MEDIA_URL + path
}
