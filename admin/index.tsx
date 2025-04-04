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
import { entrypointConfig } from './config'
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
import { CircleAlert, Divide, MailIcon } from 'lucide-react'
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
import { RegistrationForm } from './lib/tenant/hooks/RegistrationForm'


const errorHandler = createErrorHandler((dom, react, onRecoverableError) => createRoot(dom, { onRecoverableError }).render(react))

const rootEl = document.body.appendChild(document.createElement('div'))

// Un-comment this to setup idp sign in
// const Idps = {
// 	google: 'Login with Google',
// }

const hasTokenFromEnv = import.meta.env.VITE_CONTEMBER_ADMIN_SESSION_TOKEN !== '__SESSION_TOKEN__'
const appUrl = '/app/'

// const Login = () => {
// 	const showToast = useShowToast()
// 	return (
// 		<>
// 			<IDP
// 				onInitError={error =>
// 					showToast(
// 						<ToastContent>
// 							{dict.tenant.login.idpInitError} {error}
// 						</ToastContent>,
// 						{ type: 'error' },
// 					)
// 				}
// 				onResponseError={error =>
// 					showToast(
// 						<ToastContent>
// 							{dict.tenant.login.idpResponseError} {error}
// 						</ToastContent>,
// 						{ type: 'error' },
// 					)
// 				}
// 			>
// 				<Card className="w-96 relative">
// 					<CardHeader>
// 						<CardTitle className="text-2xl">{dict.tenant.login.title}</CardTitle>
// 						<CardDescription>{dict.tenant.login.description}</CardDescription>
// 					</CardHeader>
// 					<CardContent>
// 						{hasTokenFromEnv && (
// 							<AnchorButton href={appUrl} size="lg" className="w-full" variant="destructive">
// 								Continue as default user
// 							</AnchorButton>
// 						)}
// 						<Link to="register">
// 							<AnchorButton size="lg" className="w-full" variant="secondary">
// 								Create account
// 							</AnchorButton>
// 						</Link>
// 						<LoginForm>
// 							<form className="grid gap-4">
// 								<LoginFormFields />
// 							</form>
// 						</LoginForm>

// 						{/* Un-comment this to setup idp sign in */}
// 						{/*{Object.entries(Idps).map(([idp, label]) => (*/}
// 						{/*	<IDPInitTrigger key={idp} identityProvider={idp}>*/}
// 						{/*		<Button variant="outline" className="w-full">*/}
// 						{/*			{label}*/}
// 						{/*		</Button>*/}
// 						{/*	</IDPInitTrigger>*/}
// 						{/*))}*/}
// 					</CardContent>
// 					<IDPState state={['processing_init', 'processing_response', 'success']}>
// 						<Loader />
// 					</IDPState>
// 				</Card>
// 			</IDP>
// 		</>
// 	)
// }

export const Login = ({ idps, hasTokenFromEnv, appUrl, magicLink }: {
	appUrl: string
	hasTokenFromEnv: boolean
	idps: Record<string, string>
	magicLink: boolean
}) => {
	const showToast = useShowToast()
	const redirect = useRedirect()
	return <>
		<IDP
			onInitError={error => showToast(<ToastContent>{dict.tenant.login.idpInitError} {error}</ToastContent>, { type: 'error' })}
			onResponseError={error => showToast(
				<ToastContent>{dict.tenant.login.idpResponseError} {error}</ToastContent>, { type: 'error' })}
		>

			<Card className="w-96 relative">
				<CardHeader>
					<CardTitle className="text-2xl">{dict.tenant.login.title}</CardTitle>
					<CardDescription>
						{dict.tenant.login.description}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{hasTokenFromEnv && <AnchorButton href={appUrl} size="lg" className="w-full" variant="destructive">
						Continue as default user
					</AnchorButton>}
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

					{Object.entries(idps).map(([idp, label]) => (
						<IDPInitTrigger key={idp} identityProvider={idp}>
							<Button variant="outline" className="w-full">
								{label}
							</Button>
						</IDPInitTrigger>
					))}

					{/* {magicLink && <PasswordlessSignInInitForm onSuccess={({ result }) => {
						redirect('magicLinkSent(request_id: $requestId)', { requestId: result.requestId })
					}}>
						<form>
							<PasswordlessSignInInitFormFields />
						</form>
					</PasswordlessSignInInitForm>} */}
				</CardContent>
				<IDPState state={['processing_init', 'processing_response', 'success']}>
					<Loader />
				</IDPState>
			</Card>
		</IDP>
	</>
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
				<Login
					appUrl={entrypointConfig.appUrl}
					hasTokenFromEnv={entrypointConfig.hasTokenFromEnv}
					idps={entrypointConfig.idps}
					magicLink={entrypointConfig.magicLink}
				/>
			</IdentityState>
			<IdentityState state="success">
				<LoggedIn />
			</IdentityState>
			<IdentityState state="loading">
				<Loader />
			</IdentityState>
			<IdentityState state="failed">
				<Overlay>
					<Card className="w-72">
						<CardContent className="flex flex-col items-center gap-2">
							<CircleAlert className="h-12 w-12 text-destructive" />
							<p className="text-center text-lg text-gray-600">
								{dict.identityLoader.fail}
							</p>
							<LogoutTrigger>
								<Button>Login again</Button>
							</LogoutTrigger>
						</CardContent>
					</Card>
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

const registrationPage = () => {
	return (
		<Card className="w-96 relative">
					<CardHeader>
						<CardTitle className="text-2xl">Foreign/Local</CardTitle>
						<CardDescription>Choose if you are a local or foreign student.</CardDescription>
					</CardHeader>
					<CardContent>
						<Link to="registerLocal">
							<AnchorButton size="lg" className="w-full" variant="secondary">
								Local student
							</AnchorButton>
						</Link>
						<Link to="registerForeign">
							<AnchorButton size="lg" className="w-full" variant="secondary">
								Foreign student
							</AnchorButton>
						</Link>
					</CardContent>
		</Card>
	)
}

const registrationForeignPage = () => {

		return (
			<RegisterEntryPoint
				apiBaseUrl={config.apiBaseUrl}
				sessionToken={config.adminInviteToken}
				project={config.projectName}
				stage={config.stage}
			>
				<RegistrationForm
				BASE_URL={config.baseUrl}
				VITE_CONTEMBER_ADMIN_API_BASE_URL={config.apiBaseUrl}
				VITE_CONTEMBER_ADMIN_INVITE_TOKEN={config.adminInviteToken}
				VITE_CONTEMBER_SIGNUP_TOKEN={config.signupToken}
				VITE_CONTEMBER_ADMIN_LOGIN_TOKEN={config.loginToken}
				VITE_CONTEMBER_ADMIN_PROJECT_NAME={config.projectName}
				VITE_CONTEMBER_PUBLIC_TOKEN={config.publicToken}
				role={'internationalStudent'}/>
			</RegisterEntryPoint>
		);
 }

 const registrationLocalPage = () => {

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
			VITE_CONTEMBER_SIGNUP_TOKEN={config.signupToken}
			BASE_URL={config.baseUrl}
			VITE_CONTEMBER_ADMIN_LOGIN_TOKEN={config.loginToken}
			VITE_CONTEMBER_ADMIN_PROJECT_NAME={config.projectName}
			VITE_CONTEMBER_PUBLIC_TOKEN={config.publicToken}
			role={'czechBuddy'}
			/>
		</RegisterEntryPoint>
	);

}

const conditionsPage = () => {

	const styles = {
		container: {
		  padding: '20px',
		  fontFamily: 'Arial, sans-serif',
		  lineHeight: '1.6',
		  color: '#333',
		},
		title: {
		  fontSize: '2em',
		  marginBottom: '10px',
		  color: '#2c3e50',
		},
		subtitle: {
		  fontSize: '1.5em',
		  marginTop: '20px',
		  color: '#34495e',
		},
		subtitle2: {
			fontSize: '1.3em',
			marginTop: '20px',
			color: '#34495e',
		  },
		paragraph: {
		  marginBottom: '15px',
		},
		list: {
		  paddingLeft: '20px',
		  marginBottom: '15px',
		},
		listItem: {
		  marginBottom: '10px',
		},
		strong: {
		  color: '#2c3e50',
		},
		link: {
		  color: '#3498db',
		  textDecoration: 'none',
		},
		linkHover: {
		  textDecoration: 'underline',
		},
	  };
	
	  return (
		<div style={styles.container}>
		  <h1 style={styles.title}>Privacy and Data Protection</h1>
		  <p style={styles.paragraph}>
			At ESN VŠE Prague, z. s. ("we" or "our organization"), your privacy is a top priority. This page explains how we handle
			the information you share with us through our platform and associated services (collectively referred to as
			"the Service"). Our official address is: nám. W. Churchilla 4, 130 67 Praha 3, and our registration number (IČ) is 26631369.
		  </p>
	
		  <section>
			<h2 style={styles.subtitle}>What Information We Collect</h2>
			<p style={styles.paragraph}>
			  To provide a seamless experience, we collect the following types of data:
			</p>
			<ul style={styles.list}>
			  <li style={styles.listItem}>Contact Details: Your email address, phone number, and name.</li>
			  <li style={styles.listItem}>Personal Information: Your date of birth, gender, and home university.</li>
			  <li style={styles.listItem}>Accommodation Information: Details related to your stay during the program.</li>
			  <li style={styles.listItem}>
				<strong style={styles.strong}>Activity Data:</strong> When you interact with the Service, we automatically
				gather details like your IP address, browser type, and the pages you visit.
			  </li>
			</ul>
		  </section>
	
		  <section>
			<h2 style={styles.subtitle}>How We Use Your Data</h2>
			<p style={styles.paragraph}>
			  The information you provide is essential for:
			</p>
			<ul style={styles.list}>
			  <li style={styles.listItem}>
				Delivering and improving our services, ensuring that everything runs smoothly and matches your needs.
			  </li>
			  <li style={styles.listItem}>
				Staying in touch—whether it’s program updates, event notifications, or useful tips. Don’t worry, you can
				unsubscribe at any time.
			  </li>
			  <li style={styles.listItem}>
				Meeting legal requirements and addressing valid requests from authorities.
			  </li>
			</ul>
		  </section>
	
		  <section>
			<h2 style={styles.subtitle}>Sharing Your Information</h2>
			<p style={styles.paragraph}>
			  We never sell your data. However, in certain cases, we may share it:
			</p>
			<ul style={styles.list}>
			  <li style={styles.listItem}>
				With trusted partners who help us operate the Service. These parties are bound by strict confidentiality
				agreements.
			  </li>
			  <li style={styles.listItem}>To comply with legal obligations or enforce our policies.</li>
			</ul>
		  </section>
	
		  <section>
			<h2 style={styles.subtitle}>Your Rights and Options</h2>
			<p style={styles.paragraph}>
			  You’re in control of your information. Here’s how:
			</p>
			<ul style={styles.list}>
			  <li style={styles.listItem}>
				<strong style={styles.strong}>Access and Updates:</strong> You can view or update your personal details
				anytime through your account or by contacting us.
			  </li>
			  <li style={styles.listItem}>
				<strong style={styles.strong}>Communication Preferences:</strong> Don’t want to hear from us? Simply opt out
				using the link in our emails or reach out directly.
			  </li>
			</ul>
		  </section>
	
		  <section>
			<h2 style={styles.subtitle}>Our Commitment to Security</h2>
			<p style={styles.paragraph}>
			  We work hard to protect your data with up-to-date security measures. While no system is completely secure, we
			  continuously strive to minimize risks.
			</p>
		  </section>

		  <section>
			<h2 style={styles.subtitle}>Payments</h2>
			<p style={styles.paragraph}>
				We have integrated the payment gateway provided by Comgate, a.s. For more details about their services, visit their official website: <a href="https://www.comgate.cz/platebni-brana" target='_blank' className='text-blue-600'>https://www.comgate.cz/platebni-brana</a>.
			</p>
			<p style={styles.paragraph}>
				We have integrated the payment gateway provided by Comgate, a.s. For more details about their services, visit their official website: <a href="https://www.comgate.cz/platebni-brana" target='_blank' className='text-blue-600'>https://www.comgate.cz/platebni-brana</a>.
			</p>
			<h2 style={styles.subtitle2}>Payment Methods</h2>
			<p style={styles.paragraph}>
				The Comgate Payment Gateway supports a variety of payment methods, including credit/debit cards, bank transfers, and QR code payments.
			</p>
			<h2 style={styles.subtitle2}>Card Payments</h2>
			<p style={styles.paragraph}>
				Supported cards include Visa, Visa Electron, Mastercard, and Maestro, as well as Apple Pay and Google Pay. Advanced features such as recurring payments, pre-authorization, and card memorization are available.
			</p>
			<h2 style={styles.subtitle2}>Bank Transfers</h2>
			<p style={styles.paragraph}>
				Bank transfers are a secure method preferred by approximately 20% of users for reasons such as avoiding card usage, exceeding card limits, or convenience. Payments are confirmed immediately via online or mobile banking, ensuring safety through encrypted communication. Options include traditional transfers, QR code payments, and PSD2-compliant open banking.
			</p>
			<p style={styles.paragraph}>
				For detailed information on payment methods, fees, and the transaction process, visit: <a href="https://help.comgate.cz/v1/docs/en/payments-by-a-card" target='_blank' className='text-blue-600'>https://help.comgate.cz/v1/docs/en/payments-by-a-card</a> or <a href="https://help.comgate.cz/docs/en/bank-transfers" target='_blank' className='text-blue-600'>https://help.comgate.cz/docs/en/bank-transfers</a>.
			</p>
			<h2 style={styles.subtitle2}>Contact</h2>
			<p style={styles.paragraph}>
				Contact details for Comgate, a.s.:<br/>
				Address: Gočárova třída 1754 / 48b, Hradec Králové<br/>
				Email: <a href="mailto:platby-podpora@comgate.cz">platby-podpora@comgate.cz</a><br/>
				Phone: <a href="tel:+420228224267">+420 228 224 267</a>
			</p>

		  </section>
	
		  <section>
			<h2 style={styles.subtitle}>Need Help?</h2>
			<p style={styles.paragraph}>
			  If you have any questions about this policy or how your data is handled, we’re here to help. Contact us via
			  the official channels listed on our website. Or <a href="mailto:helpdesk@esnvseprague.cz" target='_blank' className='text-blue-600'>here</a>.
			</p>
		  </section>
		</div>
	  )

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
		<div className="bg-gray-200 text-black p-4 flex justify-center">
			<div className="w-full max-w-md pt-10">
				<img src="/esn-logo.png" className='pb-10'/>
				<h1 className='pb-3 pt-3'>Our sponsor</h1>
				<img src="/ceska_sporitelna_logo.png"/>
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
								registerLocal: registrationLocalPage,
								registerForeign: registrationForeignPage,
								conditions: conditionsPage,
							}}
						/>
					</Toaster>
				</RoutingProvider>
			</ContemberClient>
		</>,
	),
)
