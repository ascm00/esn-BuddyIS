import { CheckboxField, FormLayout, InputField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { ImageField } from '@app/lib/plugins/image/ImageField'
import { BlockEditorField } from '@app/lib/plugins/rich-text/editor'
import { Component, Field } from '@contember/interface'

export const EventEditForm = Component(() => <FormLayout>
	<div>
		<h2 className="text-2xl font-semibold">Basic info</h2>
		<p className="text-gray-500">Please, fill in the details of the event. Fields marked with * are required.</p>
		<hr className="my-2 border-gray-200" />
	</div>
	<InputField field="name" label="Name *" required />
	<BlockEditorField field="description.data" referencesField="description.references" label="Description" />
	<InputField field="startDate" label="Start datetime *" required />
	<InputField field="endDate" label="End datetime *" required />
	<InputField field="place" label="Place *" required/>
	<InputField field="meetingPoint" label="Meeting point (if different from the place)"/>
	<InputField field="whatToBring" label="What to bring" />
	<InputField field="whatsappLink" label="Whatsapp link" />
	<SelectField field={'contactPerson'} label="Contact person" options={'Person'}>
		<Field field={'firstName'} /> {' '} <Field field={'surname'} />
	</SelectField>
	{/* <ConnectUser field='contactPerson'>
		<Field field={'firstName'} /> {' '} <Field field={'surname'} />
	</ConnectUser> */}
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
	<InputField field="waitingList" label="Waiting list" defaultValue="0" required/>
	<InputField field="fee" label="Entrance fee (CZK) *" required/>
	<InputField field="registrationStartDate" label="Registration start datetime *" />
	<InputField field="registrationEndDate" label="Registration end date *" />

	<div className='pt-4'>
		<h2 className="text-2xl font-semibold">Participants info</h2>
		<hr className="my-2 border-gray-200" />
	</div>
	{/* Potřeba udělat možnosti pro koho je event: např Czech Buddies, všichni */}
	<CheckboxField field="allowRegistrationWithoutPayment" label="Allow registration without payment" />
	<h2 className="text-base font-semibold">Who can register:</h2>
</FormLayout>)
