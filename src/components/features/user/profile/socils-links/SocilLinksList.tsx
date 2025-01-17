'use client'

import { useEffect, useMemo, useState } from 'react'
import {
	DragDropContext,
	Draggable,
	Droppable,
	type DropResult
} from '@hello-pangea/dnd'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { SkeletonWrapper } from '@/components/common/SkeletonWrapper'
import { Card } from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'
import {
	useFindSocialLinksQuery,
	useReorderSocialLinksMutation
} from '@/graphql/generated/output'
import { SocialLinkItem } from './SocialLinkItem'

export function SocilLinksList() {
	const t = useTranslations('settings.profile.socialLinks')

	const { data, refetch, loading } = useFindSocialLinksQuery()
	const items = useMemo(
		() => data?.findSocialLinks ?? [],
		[data?.findSocialLinks]
	)

	const [socialLinks, setSocialLinks] = useState(items)

	useEffect(() => {
		setSocialLinks(items)
	}, [items])

	const [reorder, { loading: isLoadingReorder }] =
		useReorderSocialLinksMutation({
			onCompleted() {
				refetch()
			},
			onError() {
				toast.error(t('errorReorderMessage'))
			}
		})

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return

		const items = Array.from(socialLinks)
		const [reorderedItem] = items.splice(result.source.index, 1)

		items.splice(result.destination.index, 0, reorderedItem)

		const bulkUpdatedData = items.map((item, index) => ({
			id: item.id,
			position: index
		}))

		setSocialLinks(items)

		reorder({ variables: { list: bulkUpdatedData } })
	}

	return (
		<>
			<Separator />
			{socialLinks.length ? (
				<div className="mt-5 px-5">
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="socialLinks">
							{provided => (
								<div {...provided.droppableProps} ref={provided.innerRef}>
									{socialLinks.map((socialLink, index) => (
										<Draggable
											key={socialLink.id}
											draggableId={socialLink.id}
											index={index}
											isDragDisabled={isLoadingReorder}
										>
											{provided => (
												<SocialLinkItem
													key={index}
													socialLink={socialLink}
													provided={provided}
												/>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
			) : (
				<SkeletonWrapper isLoading={loading}>
					<Card className="mx-5 flex h-24 flex-col items-center justify-center bg-background px-5 mt-5">
						<p>{t('noData')}</p>
						<span className="text-wrap text-sm text-muted-foreground">
							{t('noDataSpan')}
						</span>
					</Card>
				</SkeletonWrapper>
			)}
		</>
	)
}
