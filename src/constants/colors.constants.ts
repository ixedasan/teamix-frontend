export const BASE_COLORS = [
	{
		name: 'default',
		color: '142.1 76.2% 36.3%'
	},
	{
		name: 'violet',
		color: '262.1 83.3% 57.8%'
	},
	{
		name: 'blue',
		color: '204, 70%, 53%'
	},
	{
		name: 'turquoise',
		color: '176, 77%, 41%'
	},
	{
		name: 'yellow',
		color: '48, 89%, 50%'
	},
	{
		name: 'peach',
		color: '17, 94%, 67%'
	},
	{
		name: 'pink',
		color: '330.4 81.2% 60.4%'
	},
	{
		name: 'rose',
		color: '340, 82%, 52%'
	},
	{
		name: 'red',
		color: '0 72.2% 50.6%'
	},
	{
		name: 'orange',
		color: '30, 85%, 60%'
	},
	{
		name: 'lavender',
		color: '240, 60%, 70%'
	},
	{
		name: 'brown',
		color: '30, 40%, 30%'
	}
] as const

export type TypeBaseColor = (typeof BASE_COLORS)[number]['name']
