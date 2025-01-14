import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoaderProps {
	className?: string
	size?: number
	text?: string
	fullScreen?: boolean
}

const Loader = ({
	className,
	size = 24,
	text,
	fullScreen = false
}: LoaderProps) => {
	const loaderContent = (
		<div
			className={cn(
				'flex flex-col items-center justify-center gap-3',
				className
			)}
		>
			<div className="relative">
				<Loader2 size={size} className="animate-spin text-primary" />

				<div className="absolute inset-0 animate-ping opacity-20">
					<Loader2 size={size} className="text-primary" />
				</div>
			</div>

			{text && (
				<span className="animate-pulse text-sm font-medium text-muted-foreground">
					{text}
				</span>
			)}
		</div>
	)

	if (fullScreen) {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
				{loaderContent}
			</div>
		)
	}

	return loaderContent
}

export default Loader
