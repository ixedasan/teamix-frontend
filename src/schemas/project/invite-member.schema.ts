import { z } from 'zod'

import { Role } from '@/graphql/generated/output'

export const InviteMemberSchema = z.object({
	email: z.string().email(),
	role: z.enum([Role.Admin, Role.Member, Role.Viewer])
})

export type TypeInviteMemberSchema = z.infer<typeof InviteMemberSchema>
