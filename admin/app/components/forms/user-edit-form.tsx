import { CheckboxField, FormLayout, InputField, RadioEnumField, SelectField } from '@app/lib/form'
import { DefaultRepeater, RepeaterItemActions, RepeaterRemoveItemButton } from '@app/lib/repeater'
import { Component, Field } from '@contember/interface'

export const UserEditForm = Component(() => <FormLayout>
	<div>
		<p className="text-gray-500">Please, fill in the information about you. You cannot continue until you fill in all the fields.</p>
		<hr className="my-2 border-gray-200" />
	</div>
	<div className='pb-2'>
		<InputField field="firstName" label="First Name *" required />
	</div>
	<div className='pb-2'>
		<InputField field="surname" label="Surname *" required />
	</div>
	<div className='pb-2'>
		<InputField field="xname" label="Xname *" required/>
		<p className="text-xs text-gray-500">Xname is the first part of your VŠE email address before @.</p>
		<p className="text-xs text-gray-500">For example <strong>novp</strong>@vse.cz</p>
	</div>
	<div className='pb-2'>
		<InputField field="esnCardId" label="ESN Card ID (not required until you get one)"/>
		<p className="text-xs text-gray-500">You have to add your <strong>ESN Card ID</strong>, when you get one. It will be required for the sign up for the events.</p>
	</div>
	<div className='pb-2'>
		<InputField field="emailForInfo" label="Email Address *" required/>
		<p className="text-xs text-gray-500">Fill the email address for getting the information about our events. Please add one that you check regularly. 🙏</p>
	</div>
	<div className='pb-2'>
		<InputField field="phoneNumber" label="Phone Number *" required/>
	</div>
	<div className='pb-2'>
		<SelectField
			field="country"
			label="Home Country *"
			createNewForm={<>
				<InputField field="name" label="Name" required />
			</>}
			options="Country"
		>
			<Field field="name" />
		</SelectField>
	</div>
	<div className='pb-2'>
		<SelectField
			field="university"
			label="Home University *"
			createNewForm={<>
				<InputField field="name" label="Name" required />
			</>}
			options="University"
		>
			<Field field="name" />
		</SelectField>
	</div>
	{/* <CheckboxField field="active" label="Active" /> */}
	<div className='pb-2'>
		<SelectField
			field="faculty"
			label="Faculty at VSE (not required)"
			createNewForm={<>
				<InputField field="name" label="Name" required />
			</>}
			options="Faculty"
		>
			<Field field="name" />
		</SelectField>
	</div>
	{/* <DefaultRepeater field="applications" orderBy="createdAt" title="Applications">
		<RepeaterItemActions>
			<RepeaterRemoveItemButton />
		</RepeaterItemActions>
		<InputField field="points" label="Point" />
		<InputField field="motivation" label="Motivation" />
		<RadioEnumField
			field="status"
			label="Status"
			options={{ enabled: 'enabled', disabled: 'disabled', cancelled: 'cancelled' }}
		/>
		<RadioEnumField field="result" label="Result" options={{ accepted: 'accepted', declined: 'declined' }} />
		<InputField field="rBuddy" label="R buddy" />
		<InputField field="rParty" label="R party" />
		<InputField field="rTravel" label="R travel" />
		<InputField field="rSport" label="R sport" />
		<RadioEnumField
			field="preferredSex"
			label="Preferred sex"
			options={{ man: 'Man', woman: 'Woman', dontCare: 'Don\'t care' }}
		/>
	</DefaultRepeater> */}
</FormLayout>)
