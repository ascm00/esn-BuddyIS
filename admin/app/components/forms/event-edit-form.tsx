import { CheckboxField, FormLayout, InputField, RadioEnumField, SelectField } from '@app/lib/form'
import { ImageField } from '@app/lib/plugins/image/ImageField'
import { Component, Field } from '@contember/interface'

export const EventEditForm = Component(() => <FormLayout>
	<InputField field="name" label="Name" required />
	<InputField field="description" label="Description" />
	<InputField field="startDate" label="Start date" required />
	<InputField field="endDate" label="End date" required />
	<InputField field="capacity" label="Capacity" />
	<InputField field="fee" label="Fee" />
	<InputField field="place" label="Place" />
	<InputField field="whatToBring" label="What to bring" />
	<InputField field="whatsappLink" label="Whatsapp link" />
	<InputField field="registrationStartDate" label="Registration start date" />
	<InputField field="registrationEndDate" label="Registration end date" />
	<InputField field="waitingList" label="Waiting list" />
	<SelectField
		field="section"
		label="Section"
		createNewForm={<>
			<InputField field="name" label="Name" required />
			<InputField field="description" label="Description" />
		</>}
		options="Section"
	>
		<Field field="name" />
	</SelectField>
	<InputField field="meetingPoint" label="Meeting point" />
	<RadioEnumField field="status" label="Status" options={{ open: 'open', cancelled: 'cancelled', hidden: 'hidden' }} />
	<CheckboxField field="private" label="Private" />
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
</FormLayout>)
