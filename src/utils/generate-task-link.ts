export function generateTaskLink(projectId: string, taskId: string) {
	return `/projects/${projectId}/tasks?taskId=${taskId}`
}
