'use client'

import { LanguagesIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { Language, languagesName } from '@/lib/i18n/config'
import { setLanguage } from '@/lib/i18n/language'

export function LanguageSwitcher() {
	const locale = useLocale()

	const handleLanguageChange = async (newLocale: Language) => {
		try {
			await setLanguage(newLocale)
		} catch {
			toast.success('Language changed successfully')
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<LanguagesIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{Object.entries(languagesName).map(([code, name]) => (
					<DropdownMenuItem
						key={code}
						onClick={() => handleLanguageChange(code as Language)}
						disabled={code === locale}
					>
						{name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
