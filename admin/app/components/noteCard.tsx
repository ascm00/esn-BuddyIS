import { Button } from '@app/lib/ui/button'
import { formatDateTime } from '@app/lib/formatting'
import { Component, DeleteEntityTrigger, Field, If } from '@contember/interface'
import { Trash2 } from 'lucide-react'
import React from 'react'

export const NoteCard = Component(() => (
	<div className="max-w-3xl flex">
		<div className="w-full">
			<div className="bg-gray-50/50 border p-3 rounded-lg text-sm ">
				<Field field="content" />
			</div>

			<div className="text-xs text-gray-500 p-0.5 flex items-center gap-2">
				<span className="text-black">
					<Field field="author.firstName" /> {' '} <Field field="author.surname" />
				</span>
				<div className="h-1 w-1 bg-gray-500 rounded-full" />
				<Field field="createdAt" format={formatDateTime} />
			</div>
		</div>
	</div>
))
