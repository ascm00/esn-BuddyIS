import { ReactNode, useCallback } from 'react'
import { dict } from '../dict'
import { ErrorAccessor } from '@contember/interface'

export const useErrorFormatter = () => {
	return useCallback((errors: ErrorAccessor.Error[]): ReactNode[] => {
		return errors.map((it, i) => {
			if (it.type === 'validation') {
				switch (it.message) {
					case 'Vyplňte prosím toto pole.':
						return  'This field is required.'
					case 'Zadejte hodnotu, která odpovídá požadovanému formátu.':
						return  'Please enter a value that matches the required format.'
					default:
						return it.message
				}
			} else if (it.type === 'execution') {
				if (it.code === 'UniqueConstraintViolation') {
					return dict.errors.unique
				} else {
					return dict.errors.unknown
				}
			} else {
				return dict.errors.unknown
			}
		})
	}, [])
}
