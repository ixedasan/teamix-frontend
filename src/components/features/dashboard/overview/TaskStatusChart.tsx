import { useTheme } from 'next-themes'
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

import type { TasksCountByStatusModel } from '@/graphql/generated/output'
import { statusColors } from '@/constants/analitics.constants'

interface TaskStatusChartProps {
	data: TasksCountByStatusModel[]
}

export function TaskStatusChart({ data }: TaskStatusChartProps) {
	const { theme } = useTheme()
	const isDark = theme === 'dark'

	const chartData = data.map(item => {
		const statusKey = item.status.toLowerCase()
		const statusLabel =
			item.status === 'IN_PROGRESS'
				? 'In Progress'
				: item.status.charAt(0) + item.status.slice(1).toLowerCase()

		return {
			name: statusLabel,
			value: item.count,
			color: statusColors[statusKey as keyof typeof statusColors] || '#6B7280'
		}
	})

	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart
				data={chartData}
				layout="vertical"
				margin={{ left: 20, right: 20 }}
			>
				<XAxis
					type="number"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					stroke={isDark ? '#6B7280' : '#9CA3AF'}
				/>
				<YAxis
					type="category"
					dataKey="name"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					stroke={isDark ? '#6B7280' : '#9CA3AF'}
					width={100}
				/>
				<Tooltip
					contentStyle={{
						backgroundColor: isDark ? 'hsl(var(--card))' : 'white',
						borderColor: isDark ? 'hsl(var(--border))' : '#E5E7EB',
						borderRadius: 'var(--radius)',
						color: isDark ? 'white' : 'black'
					}}
					cursor={{
						fill: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
					}}
				/>
				<Bar
					dataKey="value"
					radius={[4, 4, 4, 4]}
					barSize={20}
					fill="currentColor"
					className="fill-primary"
				>
					{chartData.map((entry, index) => (
						<rect key={`rect-${index}`} fill={entry.color} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	)
}
