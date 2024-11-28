import { onRequestPost } from "@app/lib/functions/sign-up";
import { useState } from "react";
import { Env } from "@app/lib/functions/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@app/lib/ui/card"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import getUser from "@app/lib/functions/gql/getUser";
import { contentClient } from "@app/lib/functions/utils/client";

interface TenantPerson {
	id: string;
  }
  
interface ListTenantPersonResult {
	data?: {
	  listTenantPerson?: TenantPerson[];
	};
}


export const RegistrationForm = (env : Env) => {
	const [firstName, setFirstName] = useState('');
	const [surname, setSurname] = useState('');
	const [checkbox, setCheckbox] = useState('');
	const [email, setEmail] = useState('');
	const [inSISusername, setInSISusername] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [birthdate, setBirthdate] = useState('');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!email ||!phoneNumber || !firstName || !surname || !inSISusername || !birthdate) {
			alert('Please fill all the mandatory fields.')
			return
		}
	
		try {
			const phoneNumberInRightFormat = '+' + phoneNumber
			const getUserByEmail = await contentClient(
				env,
				{
					query: getUser,
					variables: {
						email,
					},
				},
				env.VITE_CONTEMBER_ADMIN_INVITE_TOKEN,
			)
		
			const getUserByEmailResult: ListTenantPersonResult = getUserByEmail
			if(getUserByEmailResult.data?.listTenantPerson && getUserByEmailResult.data.listTenantPerson.length > 0){
				console.error('Email already exists in the system. Please contact system administrator.')
				alert('Email already exists in the system. If you forgot your password, you can reset it.')
			} else {

				const response = await onRequestPost(email, firstName, surname, inSISusername, phoneNumberInRightFormat, birthdate, env)
				console.log(response)

				if (response.ok) {
					// User created successfully
					window.location.href = "/";
					alert('User created successfully. Check your email to set your password. If you do not find it in your inbox, please check your spam folder.');
				} else {
					// Error creating user
					console.error('Error creating user');
				}

			}

		} catch (error) {
			console.error('Error creating user', error);
		}

		
	};

	return (
		<Card className="w-96 relative">
			<CardHeader className="pb-1">
				<CardTitle className="text-2xl">Register to Buddy IS</CardTitle>
			</CardHeader>
			<CardContent>
				<style>{`
					.custom-phone-input .form-control {
						width: 100%;
						padding: 0.5rem 1rem;
						padding-left: 3rem;
						border: 1px solid #d1d5db; /* odpovídá border-gray-300 */
						border-radius: 0.375rem; /* odpovídá rounded-md */
						outline: none;
						box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* odpovídá focus:ring-2 focus:ring-blue-500 */
					}
				`}</style>
				<form onSubmit={handleSubmit} className="w-full">
					<div className="mb-4 relative">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							First Name *
						</label>
						<input
							type="text" 
							value={firstName} 
							onChange={(event) => setFirstName(event.target.value)} 
							className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-4 relative">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Surname *
						</label>
						<input 
							type="text" 
							value={surname} 
							onChange={(event) => setSurname(event.target.value)} 
							className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-4 relative">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Phone Number *
						</label>
						<PhoneInput
							country={'cz'}
							value={phoneNumber}
							onChange={setPhoneNumber}
							containerClass="custom-phone-input relative"
							buttonClass="bg-white"
							dropdownClass="bg-white"
						/>
						<p className="text-xs text-gray-500 pt-1 mb-4">Please add your number on WhatsApp.</p>
					</div>
					<div className="mb-4 relative">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Birthdate *
						</label>
						<input 
							type="date"
							value={birthdate} 
							onChange={(event) => setBirthdate(event.target.value)} 
							className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-4 relative">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Email *
						</label>
						<input 
							type="email" 
							value={email} 
							onChange={(event) => setEmail(event.target.value)} 
							className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-4 relative">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							InSIS username *
						</label>
						<input 
							type="text" 
							value={inSISusername} 
							onChange={(event) => setInSISusername(event.target.value)} 
							className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
							pattern="([a-z]{4}[0-9]{2}|none)"
						/>
						<p className="text-xs text-gray-500 pt-1">InSIS username is the first part of your VŠE email address before @. For example <strong>novp04</strong>@vse.cz. If you do not have one yet, write <strong>none</strong>.</p>
					</div>
					<div className="mb-4 relative">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							I accept <a href={`${import.meta.env.VITE_LOGIN_URL}/?page=conditions`} target="_blank" className="text-blue-600">conditions</a> *
						</label>
						<input 
							type="checkbox"
							value={checkbox}
							onChange={(event) => setCheckbox(event.target.value)}
							required 
							className="mr-2"
						/>
						<span className="text-xs text-gray-500">Please check this box to proceed.</span>
					</div>
					
					<button 
						type="submit" 
						className="w-full bg-primary text-primary-foreground shadow hover:bg-primary/90 font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Register
					</button>
				</form>
			</CardContent>
		</Card>
	);
};