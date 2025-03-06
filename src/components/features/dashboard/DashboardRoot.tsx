'use client'

import { useCallback, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useFindUserDashboardQuery } from '@/graphql/generated/output'
import { DashboardFilters } from './header/DashboardFilters'
import { DashboardSkeleton } from './header/DashboardSkeleton'
import { DashboardOverview } from './overview/DashboardOverview'
import { ProjectsSummary } from './projects/ProjectsSummary'
import { AssignedTasks } from './tasks/AssignedTasks'
import { OverdueTasks } from './tasks/OverdueTasks'
import { RecentTasks } from './tasks/RecentTasks'
import { UpcomingDeadlines } from './tasks/UpcomingDeadlines'
import { FilterState } from './types/filters.types'

export default function DashboardRoot() {
	const [filters, setFilters] = useState<FilterState>({
		status: [],
		priority: [],
		projects: [],
		search: '',
		dateRange: { from: undefined, to: undefined },
		assignee: [],
		labels: []
	})

	const { data, loading, error } = useFindUserDashboardQuery({
		variables: {
			filter: {
				projectIds: filters.projects.length > 0 ? filters.projects : undefined,
				statuses: filters.status.length > 0 ? filters.status : undefined,
				priorities: filters.priority.length > 0 ? filters.priority : undefined,
				daysRange: 30,
				limit: 8
			},
			taskFilter: {
				searchTerm: filters.search || undefined,
				projectIds: filters.projects.length > 0 ? filters.projects : undefined,
				statuses: filters.status.length > 0 ? filters.status : undefined,
				priorities: filters.priority.length > 0 ? filters.priority : undefined,
				limit: 10
			}
		},
		fetchPolicy: 'cache-and-network'
	})

	const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
		setFilters(prev => ({ ...prev, ...newFilters }))
	}, [])

	if (loading && !data) {
		return <DashboardSkeleton />
	}

	if (error) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<p className="text-destructive">Error loading dashboard data</p>
			</div>
		)
	}

	const dashboardData = data?.FindUserDashboard
	const assignedTasks = data?.FindUserAssigedTasks || []
	const overdueTasks = data?.FindUserOverdueTasks || []
	const upcomingTasks = data?.FindUserUpcomingTasks || []

	return (
		<div className="flex w-full flex-col gap-6 p-6">
			<DashboardFilters
				projects={
					dashboardData?.projectsSummary.map(p => ({
						...p.project,
						icon: p.project.icon || undefined,
						description: p.project.description || undefined
					})) || []
				}
				onFilterChange={handleFilterChange}
				initialFilters={filters}
			/>

			{dashboardData && (
				<>
					<DashboardOverview
						tasksByStatus={dashboardData.tasksByStatus}
						tasksByPriority={dashboardData.tasksByPriority}
						tasksByDueDate={dashboardData.tasksByDueDate}
						totalAssignedTasks={dashboardData.totalAssignedTasks}
					/>

					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						<ProjectsSummary projects={dashboardData.projectsSummary} />
						<UpcomingDeadlines tasks={upcomingTasks} />
					</div>

					<Tabs defaultValue="recent" className="w-full">
						<TabsList className="mb-4">
							<TabsTrigger value="recent">Recent Tasks</TabsTrigger>
							<TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
							<TabsTrigger value="overdue">Overdue</TabsTrigger>
						</TabsList>
						<TabsContent value="recent">
							<RecentTasks tasks={dashboardData.recentTasks} />
						</TabsContent>
						<TabsContent value="assigned">
							<AssignedTasks tasks={assignedTasks} />
						</TabsContent>
						<TabsContent value="overdue">
							<OverdueTasks tasks={overdueTasks} />
						</TabsContent>
					</Tabs>
				</>
			)}
		</div>
	)
}
