import { onRequestPost } from "@app/lib/functions/sign-up";
import { useState } from "react";
import { Env } from "@app/lib/functions/types";

export const RegistrationForm = (role: any, env : Env) => {
	const [firstName, setFirstName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [xname, setXname] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
	
		try {
			const response = await onRequestPost(email, firstName, surname, xname, phoneNumber, role, env)
			console.log(response)

	
			if (response.ok) {
				// User created successfully
				console.log('User created successfully');
				window.location.href = '/';
				alert('User created successfully. Check your email to set your password.');
			} else {
				// Error creating user
				console.error('Error creating user');
			}
		} catch (error) {
			console.error('Error creating user', error);
		}

		
	};

	return (
		<div className="w-full max-w-2xl ml-0 p-6 bg-white shadow-md rounded-md">
		  <h1 className="text-2xl font-bold text-left text-gray-800 mb-6">
			Register to Buddy IS
		  </h1>
		  <form onSubmit={handleSubmit} className="w-full">
			<div className="mb-4 relative">
			  <label className="block text-gray-700 text-sm font-bold mb-2">
				First Name:
			  </label>
			  <input 
				type="text" 
				value={firstName} 
				onChange={(event) => setFirstName(event.target.value)} 
				className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			  />
			</div>
	  
			<div className="mb-4 relative">
			  <label className="block text-gray-700 text-sm font-bold mb-2">
				Surname:
			  </label>
			  <input 
				type="text" 
				value={surname} 
				onChange={(event) => setSurname(event.target.value)} 
				className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			  />
			</div>
	  
			<div className="mb-4 relative">
			  <label className="block text-gray-700 text-sm font-bold mb-2">
				Email:
				<span className="ml-2 text-gray-500 cursor-pointer relative">
				  ?
				  <span className="absolute left-0 w-48 p-2 bg-gray-200 text-gray-800 text-xs rounded-md shadow-lg opacity-0 transition-opacity duration-300 hover:opacity-100 z-10">
					<p className="text-xs">Fill the email address for getting the information about our events. Please add one that you check regularly. 🙏</p>
				  </span>
				</span>
			  </label>
			  <input 
				type="email" 
				value={email} 
				onChange={(event) => setEmail(event.target.value)} 
				className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			  />
			</div>
	  
			<div className="mb-4 relative">
			  <label className="block text-gray-700 text-sm font-bold mb-2">
				Xname:
				<span className="ml-2 text-gray-500 cursor-pointer relative">
				  ?
				  <span className="absolute left-0 w-48 p-2 bg-gray-200 text-gray-800 text-xs rounded-md shadow-lg opacity-0 transition-opacity duration-300 hover:opacity-100 z-10">
					<p className="text-xs">Xname is the first part of your VŠE email address before @.</p>
					<p className="text-xs">For example <strong>novp</strong>@vse.cz</p>
				  </span>
				</span>
			  </label>
			  <input 
				type="text" 
				value={xname} 
				onChange={(event) => setXname(event.target.value)} 
				className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			  />
			</div>
	  
			<div className="mb-4 relative">
			  <label className="block text-gray-700 text-sm font-bold mb-2">
				Phone Number:
				<span className="ml-2 text-gray-500 cursor-pointer relative">
				  ?
				  <span className="absolute left-0 w-48 p-2 bg-gray-200 text-gray-800 text-xs rounded-md shadow-lg opacity-0 transition-opacity duration-300 hover:opacity-100 z-10">
					Provide your phone number.
				  </span>
				</span>
			  </label>
			  <input 
				type="text" 
				value={phoneNumber} 
				onChange={(event) => setPhoneNumber(event.target.value)} 
				className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			  />
			</div>
	  
			<button 
			  type="submit" 
			  className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
			  Create User
			</button>
		  </form>
		</div>
	  );
	  
	  
	  
};