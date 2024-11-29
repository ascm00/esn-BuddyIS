import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { EntitySubTree, Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Buddy task detail 📝
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="BuddyTask(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="buddyTaskEdit(id: $entity.id)">
								<Button>
									Edit buddy task
								</Button>
							</Link>
						</Slots.Actions>
						<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>
											Description
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="description" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Done
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="done" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Confirmed
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="confirmed" />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
