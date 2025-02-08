import { z } from 'zod'

import { Priority, TaskStatus } from '@/graphql/generated/output'

export const CreateTaskSchema = z.object({
	title: z.string().min(1).max(200),
	description: z.string().optional(),
	status: z.enum(Object.values(TaskStatus) as [TaskStatus, ...TaskStatus[]]),
	priority: z.enum(Object.values(Priority) as [Priority, ...Priority[]]),
	startDate: z.date().optional(),
	dueDate: z.date().optional()
})

export type TypeCreateTaskSchema = z.infer<typeof CreateTaskSchema>
