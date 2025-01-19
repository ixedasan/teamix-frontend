import { Skeleton } from '../ui/Skeleton'
import { Switch } from '../ui/Switch'
import { CardContainer } from './CardContainer'

interface IToggleCard {
	heading: string
	description: string
	isDisabled?: boolean
	value: boolean
	onChange: (value: boolean) => void
}

export function ToggleCard({
	heading,
	description,
	isDisabled,
	value,
	onChange
}: IToggleCard) {
	return (
		<CardContainer
			heading={heading}
			description={description}
			rightContent={
				<Switch
					checked={value}
					onCheckedChange={onChange}
					disabled={isDisabled}
				/>
			}
		/>
	)
}

export function ToggleCardSkeleton() {
	return <Skeleton className="mt-6 h-20 w-full" />
}
