import { useTheme } from 'next-themes'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import type { TasksCountByPriorityModel } from '@/graphql/generated/output'
import { priorityColors } from '@/constants/analitics.constants'

interface TaskPriorityChartProps {
	data: TasksCountByPriorityModel[]
}

export function TaskPriorityChart({ data }: TaskPriorityChartProps) {
	const { theme } = useTheme()
	const isDark = theme === 'dark'

	const chartData = data
		.filter(item => item.priority)
		.map(item => {
			const priorityKey = item.priority?.toLowerCase() || 'none'
			return {
				name:
					item.priority?.charAt(0) +
					(item.priority?.slice(1).toLowerCase() || ''),
				value: item.count,
				color:
					priorityColors[priorityKey as keyof typeof priorityColors] ||
					'#94A3B8'
			}
		})

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
