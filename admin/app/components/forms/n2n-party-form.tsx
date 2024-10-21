import { CheckboxField, FormLayout, ImageField, InputField, SelectField, TextareaField } from '@app/lib/form'
import { DefaultRepeater, RepeaterItemActions, RepeaterRemoveItemButton } from '@app/lib/repeater'
import { Component, EntityListSubTree, Field, HasOne, useEntity, useEntityListSubTree } from '@contember/interface'

export const N2nPartyForm = Component(() => {

	const entity = useEntity()
	const semesterList = useEntityListSubTree('currentSemester')

	for (const semester of semesterList) {
		entity.connectEntityAtField('semester', semester)
		break
	}
	
	return (
	<FormLayout>
		<InputField field="name" label="Name" required />
		<InputField field="date" label="Date & time" required />
		<InputField field="link" label="BOOM Events link" required />
		<TextareaField field="description" label="Description" />
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
		<InputField field={'club'} label={'Club'} />
	</FormLayout>)
}, ()=>(
	<>
		<EntityListSubTree
			entities="Semester[isCurrent=true]"
			alias={'currentSemester'}
		>
			<Field field="name" />
		</EntityListSubTree>
		<HasOne field="semester">
			<Field field="name" />
		</HasOne>
		<Field field="name" />
		<Field field="date" />
		<Field field="link" />
		<Field field="description" />
		<Field field="club" />
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
	</>
))
