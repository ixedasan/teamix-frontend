import {
	AlarmClockCheck,
	Bell,
	Fingerprint,
	ListTodo,
	MessageCircle,
	User
} from 'lucide-react'

import { NotificationType } from '@/graphql/generated/output'

export function getNotificationIcon(type: NotificationType) {
	switch (type) {
		case NotificationType.TaskAssigned:
			return ListTodo
		case NotificationType.ProjectInvitation:
			return User
		case NotificationType.TaskComment:
			return MessageCircle
		case NotificationType.EnableTwoFactor:
			return Fingerprint
		case NotificationType.TaskOverdue:
			return AlarmClockCheck
		default:
			return Bell
	}
}
