import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { DataGridFeed } from '@app/lib/datagrid/feed'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { renderElement, renderLeaf } from '@app/lib/plugins/rich-text/renderer/renderers'
import { RichTextRendererField } from '@app/lib/plugins/rich-text/renderer/RichTextRendererField'
import { Card, CardContent, CardFooter, CardHeader } from '@app/lib/ui/card'
import { formatDateTime } from '@app/lib/utils/formatting'
import { Component, FieldView, HasMany, HasRole, If, Link } from '@contember/interface'
import { Field } from '@contember/react-binding'
import { PencilIcon } from 'lucide-react'
import { ImageField } from '@app/lib/form'
import { ImageFieldView } from '@app/components/fieldViews/ImageFieldView'

export default () => {
	return (
		<>
            <Binding>
				<div className="flex flex-col gap-12">
					<>
						<DataGrid entities={`Event`} initialSorting={{ createdAt: 'desc' }}>
							<DataGridLoader>
								<DataGridFeed>
									<EventCard />
								</DataGridFeed>
							</DataGridLoader>

							<DataGridPagination />
						</DataGrid>
					</>
				</div>
			</Binding>
		</>
	)
}

const EventCard = Component(() => (
	<Card>
		<CardHeader>
			<div className={'flex flex-col justify-between items-center'}>
                <div className="text-2xl font-semibold">
                    <Field field="name" />
                </div>
				<div>
					<div className={'text-xs'}>
						<Field<string> field={'startDate'} format={formatDateTime} />
                        {' - '}<Field<string> field={'endDate'} format={formatDateTime} />
					</div>
				</div>
				<div className={'flex gap-1 items-center'}>
					<div>
						<FieldView
							field={'createdAt'}
							render={({ value }) => (value ? null : <div className={'bg-neutral-200 px-4 rounded-full text-neutral-500 text-sm'}>draft</div>)}
						/>
					</div>
				</div>
			</div>
		</CardHeader>
		<CardContent>
            
            <div className='max-w-[70%] mx-auto pb-4'>
                <ImageFieldView width={100} height={100}/>
            </div>
			<div className={'prose'}>
				<RichTextRendererField sourceField={'description.data'} renderElement={renderElement} renderLeaf={renderLeaf} />
			</div>
		</CardContent>
		<CardFooter>
			{/* <div className={'flex flex-col gap-6 w-full'}>
				<div>
					<div>
						What to bring:{' '}
						<pre className={'font-bold whitespace-pre-wrap'}>
							<Field field="whatToBring" />
						</pre>
					</div>
				</div>

			</div> */}
		</CardFooter>
	</Card>
))
