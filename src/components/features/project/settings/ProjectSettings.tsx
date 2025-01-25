import { TabsContent } from '@radix-ui/react-tabs'
import { CreditCard, Settings, Tag, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { CardContainer } from '@/components/common/CardContainer'
import { Heading } from '@/components/common/Heading'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { ChangeProjectCoverForm } from './general/ChangeProjectCoverForm'
import { ChangeProjectInfoForm } from './general/ChangeProjectInfoForm'
import { DeleteProjectForm } from './general/DeleteProjectForm'
import { CreateLabelForm } from './labels/CreateLabelForm'
import { LabelsList } from './labels/LabelsList'
import { InviteMember } from './members/InviteMember'
import { ProjectMembersTable } from './members/ProjectMembersTable'

export function ProjectSettings() {
	const t = useTranslations('projects.settings')

	return (
		<div className="mx-auto w-full max-w-5xl p-6">
			<div className="mb-6">
				<Heading
					title={t('heading')}
					description={t('description')}
					size="xl"
				/>
			</div>
			<Tabs defaultValue="general" className="w-full">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="general" className="flex items-center gap-2">
						<Settings className="h-4 w-4" />
						{t('header.general')}
					</TabsTrigger>
					<TabsTrigger value="members" className="flex items-center gap-2">
						<Users className="h-4 w-4" />
						{t('header.members')}
					</TabsTrigger>
					<TabsTrigger value="labels" className="flex items-center gap-2">
						<Tag className="h-4 w-4" />
						{t('header.labels')}
					</TabsTrigger>
					<TabsTrigger value="plans" className="flex items-center gap-2">
						<CreditCard className="h-4 w-4" />
						{t('header.plan')}
					</TabsTrigger>
				</TabsList>
				<div className="mt-5 flex-1">
					<TabsContent value="general" className="space-y-4">
						<ChangeProjectCoverForm />
						<ChangeProjectInfoForm />
						<DeleteProjectForm />
					</TabsContent>
					<TabsContent value="members">
						<CardContainer
							heading={t('member.heading')}
							description={t('member.description')}
							rightContent={<InviteMember />}
						/>
						<ProjectMembersTable />
					</TabsContent>
					<TabsContent value="labels">
						<CardContainer
							heading="Labels"
							rightContent={<CreateLabelForm />}
						/>

						<LabelsList />
					</TabsContent>
					<TabsContent value="plans">plans</TabsContent>
				</div>
			</Tabs>
		</div>
	)
}
