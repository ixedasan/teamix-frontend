import { useState } from 'react'
import Picker, {
	EmojiStyle,
	Theme,
	type EmojiClickData
} from 'emoji-picker-react'
import { Smile } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'

interface IEmojiPicker {
	onChange: (value: string) => void
	isDisabled?: boolean
}

export function EmojiPicker({ onChange, isDisabled }: IEmojiPicker) {
	const { theme } = useTheme()
	const [emoji, setEmoji] = useState('')

	return (
		<Popover>
			<PopoverTrigger
				className="disabled:cursor-not-allowed"
				disabled={isDisabled}
			>
				{emoji ? <span>{emoji}</span> : <Smile className="size-[22px]" />}
			</PopoverTrigger>
			<PopoverContent side="top" className="mb-4 mr-28 p-0">
				<Picker
					onEmojiClick={(emoji: EmojiClickData) => {
						onChange(emoji.emoji)
						setEmoji(emoji.emoji)
					}}
					emojiStyle={EmojiStyle.APPLE}
					searchPlaceHolder="Search..."
					theme={theme === 'dark' ? Theme.DARK : Theme.LIGHT}
				/>
			</PopoverContent>
		</Popover>
	)
}
