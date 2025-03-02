import { useTheme } from 'next-themes'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import type { TasksDueDateModel } from '@/graphql/generated/output'

interface TaskDueDateChartProps {
	data: TasksDueDateModel
}

export function TaskDueDateChart({ data }: TaskDueDateChartProps) {
	const { theme } = useTheme()
	const isDark = theme === 'dark'

	const chartData = [
		{ name: 'Overdue', value: data.overdue, color: '#EF4444' },
		{ name: 'Due Today', value: data.dueToday, color: '#F97316' },
		{ name: 'This Week', value: data.dueThisWeek, color: '#3B82F6' },
		{ name: 'Upcoming', value: data.upcoming, color: '#10B981' },
		{ name: 'No Due Date', value: data.noDueDate, color: '#6B7280' }
	].filter(item => item.value > 0) // Only show non-zero values

	const total = chartData.reduce((sum, item) => sum + item.value, 0)

	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart>
				<Pie
					data={chartData}
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={80}
					paddingAngle={2}
					dataKey="value"
					label={({ name, percent }) =>
						`${name} ${(percent * 100).toFixed(0)}%`
					}
					labelLine={false}
				>
					{chartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
				</Pie>
				<Tooltip
					formatter={(value: number) => [
						`${value} (${((value / total) * 100).toFixed(0)}%)`,
						'Tasks'
					]}
					contentStyle={{
						backgroundColor: isDark ? 'hsl(var(--card))' : 'white',
						borderColor: isDark ? 'hsl(var(--border))' : '#E5E7EB',
						borderRadius: 'var(--radius)',
						color: isDark ? 'white' : 'black'
					}}
				/>
			</PieChart>
		</ResponsiveContainer>
	)
}
