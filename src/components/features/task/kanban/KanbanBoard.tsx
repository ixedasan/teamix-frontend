'use client'

import { type TaskModel } from '@/graphql/generated/output'

interface IKanbanBoard {
	tasks: TaskModel[]
}

export function KanbanBoard({ tasks }: IKanbanBoard) {
	return (
		<div>
			{tasks.map(task => (
				<div className="flex flex-col gap-2" key={task.id}>
					{task.title}
				</div>
			))}
		</div>
	)
}
