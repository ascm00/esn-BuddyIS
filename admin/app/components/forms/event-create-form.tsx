import { CheckboxField, FormLayout, InputField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { identityEnvironmentExtension } from '@contember/admin'
import { ImageField } from '@app/lib/plugins/image/ImageField'
import { Component, EntityListSubTree, Field, HasMany, HasOne, useEntity, useEntityListSubTree } from '@contember/interface'
import { ConnectUser } from '../ConnectUser'
import { Todo } from '@app/lib/dev'
import { BlockEditorField } from '@app/lib/plugins/rich-text/editor'
import { RichTextEditor } from '@contember/react-slate-editor-base'
import { RichTextField } from '@app/lib/editor'
import { PersistButton } from '@app/lib/binding'

export const EventCreateForm = Component(() => {

	const entity = useEntity()
	const semesterList = useEntityListSubTree('currentSemester')

	for (const semester of semesterList) {
		entity.connectEntityAtField('semester', semester)
		break
	}

	return (<FormLayout>
		<div>
			<h2 className="text-2xl font-semibold">Basic info</h2>
			<p className="text-gray-500">Please, fill in the details of the event. Fields marked with * are required.</p>
			<hr className="my-2 border-gray-200" />
		</div>
		<InputField field="name" label="Name *" required />
		<TextareaField field="description" label="Description *" required />
		<InputField field="startDate" label="Start datetime *" required />
		<InputField field="endDate" label="End datetime *" required />
		<InputField field="place" label="Place *" required/>
		<InputField field="mapLink" label="Google maps link" description="Please add a valid link to the Google maps starting with 'https://' or 'http://'. Otherwise, it will not be displayed."/>
		<InputField field="whatToBring" label="What to bring" />
		<InputField field="whatsappLink" label="Whatsapp link" description="Please add a valid link to the WhatsApp group starting with 'https://' or 'http://'. Otherwise, it will not be displayed." />
		<SelectField field={'contactPerson'} label="Contact person" options={'Person'}>
			<Field field={'firstName'} /> {' '} <Field field={'surname'} />
		</SelectField>
		{/* <ConnectUser field='contactPerson'>
			<Field field={'firstName'} /> {' '} <Field field={'surname'} />
		</ConnectUser> */}
		<div className='pb-3'>
			<CheckboxField field="mandatoryESNcard" label="ESNcard mandatory" defaultValue={true}/>
			<p className="text-xs text-gray-500">Is ESNcard mandatory for this event?</p>
		</div>
		<div className='pb-3'>
			<ImageField
				label="Picture"
				baseField="picture"
				urlField="url"
				widthField="width"
				heightField="height"
				fileNameField="meta.fileName"
				fileTypeField="meta.fileType"
				fileSizeField="meta.fileSize"
				lastModifiedField="meta.lastModified"
			/>
			<p className="text-xs text-gray-500">Please ensure each picture is no larger than 1.5MB. If necessary, use <a href="https://tinypng.com" target='_blank'><strong>TinyPNG</strong></a> or other tool to reduce the file size.</p>
		</div>
		<div className='pt-4'>
			<h2 className="text-2xl font-semibold">Limitations</h2>
			<hr className="my-2 border-gray-200" />
		</div>
		<div className='pb-3'>
			<CheckboxField field="dietaryRestrictions" label="Dietary restrictions" defaultValue={false}/>
			<p className="text-xs text-gray-500">Should the students fill dietary restrictions on registration?</p>
		</div>
		<div className='pb-3'>
			<CheckboxField field="allergies" label="Allergies" defaultValue={false}/>
			<p className="text-xs text-gray-500">Should the students fill allergies on registration?</p>
		</div>

		<div className='pt-4'>
			<h2 className="text-2xl font-semibold">Registration info</h2>
			<hr className="my-2 border-gray-200" />
		</div>
		<div className='pb-3'>
			<SelectField
				field="section"
				label="Process *"
				options="Section"
			>
				<Field field="name" />
			</SelectField>
			<p className="text-xs text-gray-500">Choose a section that organizes this event</p>
		</div>
		<InputField field="capacity" label="Capacity *" inputProps={{min: 1}} required />
		<InputField field="waitingList" label="Waiting list" inputProps={{min: 0}} />
		<InputField field="fee" label="Entrance fee (CZK) *" inputProps={{min: 0}} required/>
		<InputField field="registrationStartDate" label="Registration start datetime *" />
		<InputField field="registrationEndDate" label="Registration end date *" />

		<div className='pt-4'>
			<h2 className="text-2xl font-semibold">Participants</h2>
			<hr className="my-2 border-gray-200" />
		</div>
		<TextareaField field="refundPolicy" label="Refund policy" />
		<div className='pt-4'>
			<h2 className="text-base font-semibold">Who can register:</h2>
			<p className="text-xs text-gray-500">Select all that apply.</p>
		</div>
		<CheckboxField field="isForInternationalStudents" label="International students" defaultValue={false}/>
		<CheckboxField field="isForCzechBuddies" label="Czech buddies" defaultValue={false}/>
		<CheckboxField field="isForESNmembers" label="ESN members" defaultValue={false}/>
		<div className='flex flex-col space-y-4 w-36 pt-4'>
			<PersistButton label='Save data' />
		</div>
	</FormLayout>)
	}, () => (
		<>
		<EntityListSubTree
			entities="Semester[isCurrent=true]"
			alias={'currentSemester'}
		>
			<Field field={'name'} />
		</EntityListSubTree>
		<HasOne field="semester">
			<Field field="name" />
		</HasOne>
		<Field field="name" />
		<Field field="description" />
		<Field field="startDate" />
		<Field field="endDate" />
		<Field field="place" />
		<Field field="mapLink" />
		<Field field="whatToBring" />
		<Field field="whatsappLink" />
		<HasOne field={'contactPerson'}>
			<Field field={'firstName'} />
			<Field field={'surname'} />
		</HasOne>
		<Field field={'capacity'} />
		<Field field={'refundPolicy'} />
		<Field field={'mandatoryESNcard'} />
		<ImageField
			baseField="picture"
			urlField="url"
			widthField="width"
			heightField="height"
			fileNameField="meta.fileName"
			fileTypeField="meta.fileType"
			fileSizeField="meta.fileSize"
			lastModifiedField="meta.lastModified"
		/>
		<Field field={'dietaryRestrictions'} />
		<Field field={'allergies'} />
		<HasOne field={'section'}>
			<Field field={'name'} />
		</HasOne>
		<Field field={'waitingList'} />
		<Field field={'fee'} />
		<Field field={'registrationStartDate'} />
		<Field field={'registrationEndDate'} />
		<Field field={'isForInternationalStudents'} />
		<Field field={'isForCzechBuddies'} />
		<Field field={'isForESNmembers'} />



		</>
	)

)
