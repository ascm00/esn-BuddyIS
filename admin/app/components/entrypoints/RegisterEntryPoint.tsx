import {
	ContemberClient,
	ContemberClientProps,
	DialogProvider,
	I18nProvider,
	MessageDictionaryByLocaleCode,
	RequestProvider,
	RoutingContext,
	RoutingContextValue,
	SelectedDimension,
	StyleProvider,
	Toaster,
	ToasterProvider,
} from '@contember/admin'

export interface RegisterEntrypointProps extends ContemberClientProps {
	basePath?: string
	sessionToken?: string
	defaultDimensions?: SelectedDimension
	defaultLocale?: string
	dictionaries?: MessageDictionaryByLocaleCode
	envVariables?: Record<string, string>
	children: React.ReactNode
}

export default (props: RegisterEntrypointProps) => {
	const routing: RoutingContextValue = {
		basePath: props.basePath ?? '/',
		routes: { register: { path: 'register' } },
		defaultDimensions: {},
		pageInQuery: true,
	}
	const projectSlug = props.project === '__PROJECT_SLUG__' ? window.location.pathname.split('/')[1] : props.project

	return (
		// <StyleProvider scheme={'light'}>
		// 	<I18nProvider localeCode={props.defaultLocale} dictionaries={props.dictionaries}>
		// 		<RoutingContext.Provider value={routing}>
		// 			<RequestProvider>
						<ToasterProvider>
							<DialogProvider>
								<ContemberClient
									apiBaseUrl={props.apiBaseUrl}
									sessionToken={props.sessionToken}
									loginToken={props.loginToken}
									project={projectSlug}
									stage={props.stage}
								>
									<div className={'flex flex-col gap-4'}>
										{/* <div className={'mx-auto mt-10'}>
											<img
												src={'/esn-logo.png'}
												className={'max-w-full h-auto'}
												width={600}
												height={300}
												alt={'Logo ESN'}
											/>
										</div> */}
										{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
										{props.children}
									</div>
								</ContemberClient>
								<Toaster />
							</DialogProvider>
		 				</ToasterProvider>
		// 			</RequestProvider>
		// 		</RoutingContext.Provider>
		// 	</I18nProvider>
		// </StyleProvider>
	)
}