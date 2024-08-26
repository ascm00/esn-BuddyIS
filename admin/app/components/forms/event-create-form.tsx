import { CheckboxField, FormLayout, InputField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { identityEnvironmentExtension } from '@contember/admin'
import { ImageField } from '@app/lib/plugins/image/ImageField'
import { Component, Field } from '@contember/interface'
import { ConnectUser } from '../ConnectUser'
import { Todo } from '@app/lib/dev'
import { BlockEditorField } from '@app/lib/plugins/rich-text/editor'

export const EventCreateForm = Component(() => <FormLayout>
	<div>
		<h2 className="text-2xl font-semibold">Basic info</h2>
		<p className="text-gray-500">Please, fill in the details of the event. Fields marked with * are required.</p>
		<hr className="my-2 border-gray-200" />
	</div>
	<InputField field="name" label="Name *" required />
	{/* <TextareaField field="description" label="Description" /> */}
	<BlockEditorField field="description.data" referencesField="description.references" label="Description" />
	<InputField field="startDate" label="Start datetime *" required />
	<InputField field="endDate" label="End datetime *" required />
	<InputField field="place" label="Place *" required/>
	<InputField field="meetingPoint" label="Meeting point"/>
	<InputField field="whatToBring" label="What to bring" />
	<InputField field="whatsappLink" label="Whatsapp link" />
	<SelectField field={'contactPerson'} label="Contact person" options={'Person'}>
		<Field field={'firstName'} /> {' '} <Field field={'surname'} />
	</SelectField>
	{/* <ConnectUser field='contactPerson'>
		<Field field={'firstName'} /> {' '} <Field field={'surname'} />
	</ConnectUser> */}
	<div className='pb-3'>
		<CheckboxField field="mandatoryESNcard" label="ESN Card mandatory" defaultValue={true}/>
		<p className="text-xs text-gray-500">Is ESN Card mandatory for this event?</p>
	</div>
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
			label="Section *"
			options="Section"
		>
			<Field field="name" />
		</SelectField>
		<p className="text-xs text-gray-500">Choose a section that organizes this event</p>
	</div>
	<InputField field="capacity" label="Capacity *" required />
	<InputField field="waitingList" label="Waiting list"/>
	<InputField field="fee" label="Entrance fee (CZK) *" required/>
	<InputField field="registrationStartDate" label="Registration start datetime *" />
	<InputField field="registrationEndDate" label="Registration end date *" />

	<div className='pt-4'>
		<h2 className="text-2xl font-semibold">Participants</h2>
		<hr className="my-2 border-gray-200" />
	</div>
	<TextareaField field="refundPolicy" label="Refund policy" />
	<h2 className="text-base font-semibold">Who can register:</h2>
	<Todo>Potřeba udělat možnosti pro koho je event: např Czech Buddies, všichni. Budou checkboxy pro jednotlivé možnosti</Todo>
</FormLayout>)
