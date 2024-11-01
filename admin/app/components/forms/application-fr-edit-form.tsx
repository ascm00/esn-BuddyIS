import { Todo } from '@app/lib/dev'
import { FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { Component, EntityListSubTree, EntitySubTree, Environment, Field, HasMany, HasOne, identityEnvironmentExtension, useEntity, useEntityListSubTree, useEntitySubTree, useEnvironment } from '@contember/interface'
import { useIdentity } from '@contember/admin'
import { ConnectUser } from '../ConnectUser'
import { ConnectEntity } from '../ConnectEntity'


export const ApplicationFrEditForm = Component(
	() => {

	return (<FormLayout>

		{/* <SelectField
			field="semester"
			label="Semester"
			createNewForm={<>
				<InputField field="name" label="Name" required />
				<InputField field="startDate" label="Start date" required />
				<InputField field="endDate" label="End date" required />
			</>}
			options="Semester"
		>
			<Field field="name" />
		</SelectField> */}
		<div>
			<h2 className="text-xl font-semibold">Information about you</h2>
			<hr className="my-2 border-gray-200" />
		</div>
		<div className='flex flex-col space-y-4'>
			<HasOne field={'person'}>
					<RadioEnumField
						field="gender"
						label="Your gender *"
						orientation="horizontal"
						required
						options={{ man: 'Man', woman: 'Woman', other: 'Other' }}
					/>
					<SelectField field={'studyProgram'} label="Study program *" options={'StudyProgram'}>
						<Field field={'name'} />
					</SelectField>
					<SelectField field={'university'} label="Home university" options={'University'} description="If you are coming to VŠE as an exchange student. Please choose the university you're coming from. Otherwise leave it blank.">
						<Field field={'name'} />
					</SelectField>
					<SelectField field={'countryOfUniversity'} label="Home university country" options={'Country'} description="Country where you attend university.">
						<Field field={'name'} />
					</SelectField>
					{/* <SelectField field={'faculty'} label="Faculty at VSE" options={'Faculty'}>
						<Field field={'name'} />
					</SelectField> */}
					<MultiSelectField field="languages" label="Languages spoken *">
						<Field field="name" />
					</MultiSelectField>
			</HasOne>
		</div>
		<div>
			<h2 className="text-xl font-semibold">Application details</h2>
			<hr className="my-2 border-gray-200" />
		</div>
		<div className='flex flex-col space-y-4'>
			<RadioEnumField
				field="preferredBuddySex"
				required
				label="Preferred gender of your buddy *"
				orientation="horizontal"
				options={{ man: 'Man', woman: 'Woman', dontCare: 'Not preferred' }}
			/>
		</div>
		</FormLayout>)
	}
)
