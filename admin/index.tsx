import {InitialUserForm} from '@app/components/initialUserForm'
import { Binding } from '@app/lib/binding'
import './index.css'
import { dict } from '@app/lib/dict'
import { LoginFormFields, PasswordResetRequestFormFields } from '@app/lib/tenant'
import { PasswordResetFormFields } from '@app/lib/tenant'
import { ToastContent, Toaster, useShowToast } from '@app/lib/toast'
import { AnchorButton, Button } from '@app/lib/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@app/lib/ui/card'
import { Loader } from '@app/lib/ui/loader'
import { Overlay } from '@app/lib/ui/overlay'
import { Pages, useIdentity, useField, Component, HasOne, Field, useEntity } from '@contember/interface'
import { ContemberClient } from '@contember/react-client'
import { createErrorHandler } from '@contember/react-devbar'
import {
	IDP,
	IDPInitTrigger,
	IDPState,
	IdentityProvider,
	IdentityState,
	LoginForm,
	LogoutTrigger,
	PasswordResetForm,
	PasswordResetRequestForm,
} from '@contember/react-identity'
import { Link, RoutingProvider, useCurrentRequest, useRedirect } from '@contember/react-routing'
import { Divide, MailIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import PersonCreate from '@app/pages/personCreate'
import { Logo, runReactApp, useProjectSlug } from '@contember/admin'
import { PersonInvite } from '@app/components/personInvite'
import { PersonForm } from '@app/components/forms/personForm'
import RegisterEntryPoint from '@app/components/entrypoints/RegisterEntryPoint'
import config from './config'
import { Env } from './lib/functions/types'
import { onRequestPost } from './lib/functions/sign-up'


const errorHandler = createErrorHandler((dom, react, onRecoverableError) => createRoot(dom, { onRecoverableError }).render(react))

const rootEl = document.body.appendChild(document.createElement('div'))

// Un-comment this to setup idp sign in
// const Idps = {
// 	google: 'Login with Google',
// }

const hasTokenFromEnv = import.meta.env.VITE_CONTEMBER_ADMIN_SESSION_TOKEN !== '__SESSION_TOKEN__'
const appUrl = '/app/'

const Login = () => {
	const showToast = useShowToast()
	return (
		<>
			<IDP
				onInitError={error =>
					showToast(
						<ToastContent>
							{dict.tenant.login.idpInitError} {error}
						</ToastContent>,
						{ type: 'error' },
					)
				}
				onResponseError={error =>
					showToast(
						<ToastContent>
							{dict.tenant.login.idpResponseError} {error}
						</ToastContent>,
						{ type: 'error' },
					)
				}
			>
				<Card className="w-96 relative">
					<CardHeader>
						<CardTitle className="text-2xl">{dict.tenant.login.title}</CardTitle>
						<CardDescription>{dict.tenant.login.description}</CardDescription>
					</CardHeader>
					<CardContent>
						{hasTokenFromEnv && (
							<AnchorButton href={appUrl} size="lg" className="w-full" variant="destructive">
								Continue as default user
							</AnchorButton>
						)}
						<Link to="register">
							<AnchorButton size="lg" className="w-full" variant="secondary">
								Create account
							</AnchorButton>
						</Link>
						<LoginForm>
							<form className="grid gap-4">
								<LoginFormFields />
							</form>
						</LoginForm>

						{/* Un-comment this to setup idp sign in */}
						{/*{Object.entries(Idps).map(([idp, label]) => (*/}
						{/*	<IDPInitTrigger key={idp} identityProvider={idp}>*/}
						{/*		<Button variant="outline" className="w-full">*/}
						{/*			{label}*/}
						{/*		</Button>*/}
						{/*	</IDPInitTrigger>*/}
						{/*))}*/}
					</CardContent>
					<IDPState state={['processing_init', 'processing_response', 'success']}>
						<Loader />
					</IDPState>
				</Card>
			</IDP>
		</>
	)
}

const LoggedIn = Component(
	() => {
		const identity = useIdentity()
		const projectSlug = useProjectSlug() || '';
		useEffect(() => {
			setTimeout(() => {
				window.location.href = appUrl
			}, 500)
		}, [])

		return (
			
			<Card className="w-96 relative">
				<CardHeader>
					<CardTitle className="text-2xl">Logged in </CardTitle>
					<CardDescription>as {identity?.person?.email ?? 'unknown'}</CardDescription>
				</CardHeader>
				<Loader position="static" />
			</Card>
		)
	}
)

const IndexPage = () => {
	return (
		<IdentityProvider>
			<IdentityState state={['none', 'cleared']}>
				<Login />
			</IdentityState>
			<IdentityState state="success">
				<LoggedIn />
			</IdentityState>
			<IdentityState state="loading">
				<Loader />
			</IdentityState>
			<IdentityState state="failed">
				<Overlay>
					<div className="bg-gray-100 flex flex-col gap-4 items-center justify-center p-16 rounded-lg shadow-lg border">
						<p className="text-lg">Failed to load identity.</p>
						<LogoutTrigger>
							<Button className="w-full" variant="outline">
								Logout
							</Button>
						</LogoutTrigger>
					</div>
				</Overlay>
			</IdentityState>
		</IdentityProvider>
	)
}

const PasswordResetRequestPage = () => {
	const redirect = useRedirect()
	return (
		<Card className="w-96">
			<CardHeader>
				<CardTitle className="text-2xl">{dict.tenant.passwordResetRequest.title}</CardTitle>
				<CardDescription>{dict.tenant.passwordResetRequest.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<PasswordResetRequestForm onSuccess={() => redirect('resetRequestSuccess')}>
					<form>
						<PasswordResetRequestFormFields />
					</form>
				</PasswordResetRequestForm>
			</CardContent>
			<CardFooter>
				<Link to="index">
					<AnchorButton variant="link" className="ml-auto">
						{dict.tenant.login.backToLogin}
					</AnchorButton>
				</Link>
			</CardFooter>
		</Card>
	)
}

const RegistrationForm = (env : Env) => {
	const [firstName, setFirstName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [xname, setXname] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
	
		try {
			const response = await onRequestPost(email, firstName, surname, xname, phoneNumber, env)
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

const registrationPage = () => {

	// return (<RegisterEntryPoint
	// 	// basePath="/"
	// 	apiBaseUrl={config.apiBaseUrl}
	// 	sessionToken={config.adminInviteToken}
	// 	project={config.projectName}
	// 	stage={config.stage}
	// 	// defaultLocale={config.langCode}
	// 	// dictionaries={config.dictionaries}
	// >
	// 	<RegisterForm />
	// </RegisterEntryPoint>)

		return (
			<RegisterEntryPoint
				apiBaseUrl={config.apiBaseUrl}
				sessionToken={config.adminInviteToken}
				project={config.projectName}
				stage={config.stage}
			>
				<RegistrationForm 
				VITE_CONTEMBER_ADMIN_API_BASE_URL={config.apiBaseUrl}
				VITE_CONTEMBER_ADMIN_INVITE_TOKEN={config.adminInviteToken}
				VITE_CONTEMBER_ADMIN_LOGIN_TOKEN={config.loginToken}
				VITE_CONTEMBER_ADMIN_PROJECT_NAME={config.projectName}
				VITE_CONTEMBER_PUBLIC_TOKEN={config.publicToken}/>
			</RegisterEntryPoint>
		);

 }



const PasswordResetPage = () => {
	const request = useCurrentRequest()
	const redirect = useRedirect()
	const showToast = useShowToast()
	const token = request?.parameters.token as string | undefined
	return (
		<Card className="w-96">
			<CardHeader>
				<CardTitle className="text-2xl">{dict.tenant.passwordReset.title}</CardTitle>
				<CardDescription>{dict.tenant.passwordReset.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<PasswordResetForm
					onSuccess={() => {
						showToast(<ToastContent>Password has been reset</ToastContent>, { type: 'success' })
						redirect('index')
					}}
					token={token}
				>
					<form>
						<PasswordResetFormFields hasToken={!!token} />
					</form>
				</PasswordResetForm>
			</CardContent>
			<CardFooter>
				<Link to="index">
					<AnchorButton variant="link" className="ml-auto">
						{dict.tenant.login.backToLogin}
					</AnchorButton>
				</Link>
			</CardFooter>
		</Card>
	)
}

const PasswordResetRequestSuccessPage = () => (
	<Card className="w-96">
		<CardHeader>
			<CardTitle className="text-2xl">{dict.tenant.passwordResetRequest.title}</CardTitle>
			<CardDescription>{dict.tenant.passwordResetRequest.description}</CardDescription>
		</CardHeader>
		<CardContent>
			<div className="flex flex-col items-center justify-center gap-4">
				<MailIcon className="text-gray-300 w-16 h-16" />
				<div className="text-center">An email with password reset instructions has been sent to your email address.</div>
				<div className="text-center text-gray-500">
					<Link to="passwordReset">
						<a className="underline">{dict.tenant.passwordResetRequest.entryCode}</a>
					</Link>
				</div>
			</div>
		</CardContent>
		<CardFooter>
			<Link to="index">
				<AnchorButton variant="link" className="ml-auto">
					{dict.tenant.login.backToLogin}
				</AnchorButton>
			</Link>
		</CardFooter>
	</Card>
)

const Layout = ({ children }: { children?: React.ReactNode }) => (
	<div className="grid md:grid-cols-2 min-h-screen ">
		<div className="bg-white p-4 flex items-center justify-center">{children}</div>
		<div className="bg-gray-200 text-black p-4 flex items-center justify-center">
			<div className="w-full max-w-md mx-auto">
				<img src="/esn-logo.png"/>
				{/* <div className="text-center text-2xl">Welcome to Buddy IS</div> */}
				{/*<p className="mt-8 text-center text-gray-300">
				{/*	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, sem eget ultricies ultricies, sapien urna tristique eros, ac*/}
				{/*	tincidunt felis lacus nec nunc.*/}
				{/*</p>*/}			
			</div>
		</div>
	</div>
)

errorHandler(onRecoverableError =>
	createRoot(rootEl, { onRecoverableError }).render(
		<>
		{console.log('Recoverable error occurred, you can ignore this message', onRecoverableError)}
			<ContemberClient apiBaseUrl={import.meta.env.VITE_CONTEMBER_ADMIN_API_BASE_URL} loginToken={import.meta.env.VITE_CONTEMBER_ADMIN_LOGIN_TOKEN}>
				<RoutingProvider pageInQuery>
					<Toaster>
						<Pages
							layout={Layout}
							children={{
								index: IndexPage,
								resetRequest: PasswordResetRequestPage,
								resetRequestSuccess: PasswordResetRequestSuccessPage,
								passwordReset: PasswordResetPage,
								register: registrationPage,
							}}
						/>
					</Toaster>
				</RoutingProvider>
			</ContemberClient>
		</>,
	),
)
