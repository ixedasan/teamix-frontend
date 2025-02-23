'use client'

import { Zap } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { FindProjectAnalyticsQuery } from '@/graphql/generated/output'
import {
	getInitials,
	getRoleBadgeColor,
	getRoleLabel
} from '@/utils/format-analytics'
import { getMediaSource } from '@/utils/get-media-source'

interface ITopMembers {
	memberProductivity: FindProjectAnalyticsQuery['projectAnalytics']['memberProductivity']
}

export function TopMembers({ memberProductivity }: ITopMembers) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<Zap className="mr-2 h-5 w-5 text-muted-foreground" />
					Top members
				</CardTitle>
				<CardDescription>
					The most productive members of the project
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{memberProductivity
						.slice()
						.sort((a, b) => b.completedTasks - a.completedTasks)
						.slice(0, 5)
						.map((member, index) => (
							<div key={member.userId} className="flex items-center space-x-4">
								<div className="flex-none">
									<div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
										{index + 1}
									</div>
								</div>
								<div className="flex-none">
									<Avatar className="h-10 w-10">
										{member.avatar ? (
											<AvatarImage
												src={getMediaSource(member.avatar)}
												alt={member.displayName}
											/>
										) : null}
										<AvatarFallback>
											{getInitials(member.displayName)}
										</AvatarFallback>
									</Avatar>
								</div>
								<div className="min-w-0 flex-1">
									<p className="truncate font-medium">{member.displayName}</p>
									<p className="truncate text-sm text-muted-foreground">
										{member.completedTasks} tasks accomplished (
										{member.completionRate}%)
									</p>
								</div>
								<div className="flex-none">
									<span
										className={`rounded-full px-2 py-1 text-xs ${getRoleBadgeColor(member.role)}`}
									>
										{getRoleLabel(member.role)}
									</span>
								</div>
							</div>
						))}
				</div>
			</CardContent>
		</Card>
	)
}
