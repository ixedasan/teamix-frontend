export const BASE_COLORS = [
	{
		name: 'default',
		color: '142.1 76.2% 36.3%'
	},
	{
		name: 'blue',
		color: '221.2 83.2% 53.3%'
	},
	{
		name: 'violet',
		color: '262.1 83.3% 57.8%'
	},
	{
		name: 'yellow',
		color: '47.9 95.8% 53.1%'
	},
	{
		name: 'orange',
		color: '24.6 95% 53.1%'
	},
	{
		name: 'rose',
		color: '346.8 77.2% 49.8%'
	},
	{
		name: 'red',
		color: '0 72.2% 50.6%'
	},
	{
		name: 'zinc',
		color: '240 5.9% 10%'
	}
] as const

export type TypeBaseColor = (typeof BASE_COLORS)[number]['name']
