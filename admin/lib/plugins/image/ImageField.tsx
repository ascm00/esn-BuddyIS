import { Component, DisconnectEntityTrigger, EntityView } from '@contember/interface'
import { FormErrorContext, FormFieldIdContext } from '@contember/react-form'
import {
	FileType,
	FileUrlDataExtractorProps,
	ImageFileTypeProps,
	Uploader,
	UploaderBase,
	UploaderHasFile,
	createImageFileType,
	useS3Client,
} from '@contember/react-uploader'
import { BaseFieldProps, FormContainer } from '@app/lib/form'
import { UploadedImageView, UploaderDropzone, UploaderItemUI } from '@app/lib/upload'
import { UploaderProgress } from '@app/lib/upload/upload-progress'
import * as React from 'react'
import { ReactNode, useId, useMemo, useState } from 'react'

export type ImageFieldProps = BaseFieldProps & ImageFileTypeProps

export const ImageField = Component<ImageFieldProps>(props => {
	return (
		<UploadFieldInner {...props} fileType={createImageFileType(props)}>
			<UploaderItemUI>
				<UploadedImageView {...props} DestroyAction={DisconnectEntityTrigger} />
			</UploaderItemUI>
		</UploadFieldInner>
	)
})

type UploadFieldInnerProps = BaseFieldProps &
	FileUrlDataExtractorProps & {
		fileType: FileType
		children: ReactNode
	}

const UploadFieldInner = Component(
	({ baseField, label, description, children, fileType, urlField }: UploadFieldInnerProps) => {
		const defaultUploader = useS3Client()
		const [fileTypeStable] = useState(fileType)
		const fileTypeWithUploader = useMemo(
			() => ({ ...fileTypeStable, uploader: fileTypeStable?.uploader ?? defaultUploader }),
			[defaultUploader, fileTypeStable],
		)

		const id = useId()

		return (
			<FormFieldIdContext.Provider value={id}>
				<FormErrorContext.Provider value={[]}>
					<FormContainer description={description} label={label}>
						<div className="flex">
							<Uploader baseField={baseField} fileType={fileTypeWithUploader}>
								<UploaderBase baseField={baseField}>
									<UploaderHasFile>
										<UploaderProgress />
									</UploaderHasFile>

									<EntityView
										render={entity => {
											if (entity.getField(urlField).value === null) {
												return <UploaderDropzone inactiveOnUpload />
											} else {
												return <>{children}</>
											}
										}}
									/>
								</UploaderBase>
							</Uploader>
						</div>
					</FormContainer>
				</FormErrorContext.Provider>
			</FormFieldIdContext.Provider>
		)
	},
	({ fileType, children, baseField }) => {
		return (
			<>
				{children}
				<Uploader baseField={baseField} fileType={fileType} />
			</>
		)
	},
)
