import { BuddyPairCreateForm } from '@app/components/forms/buddy-pair-create-form'
import { Binding, PersistButton } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Component, EntityAccessor, EntityBaseProps, EntityListSubTree, EntitySubTree, Field, HasMany, HasOne, HasRole, RedirectOnPersist, useEntity, useEntityListSubTree } from '@contember/interface'
import { PaintbrushIcon } from 'lucide-react'
import { string } from 'slate'
import { galeShapleyCzechFirst } from '../../pairing/buddyPairing'

export default () => {
    
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Automatic buddy pairing
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="BuddyPair" isCreating>
                        <AutomaticPairing />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}

const AutomaticPairing = Component(
    () => {

        const currentSemesterCzApplications = Array.from(useEntityListSubTree('currentSemesterCzApplications'))
        const currentSemesterFrApplications = Array.from(useEntityListSubTree('currentSemesterFrApplications'))

        const {pairs, unpairedCzechStudents} = galeShapleyCzechFirst(currentSemesterCzApplications, currentSemesterFrApplications)
        //const pairs = galeShapleyInternationalFirst(currentSemesterCzApplications, currentSemesterFrApplications)

        pairs.forEach((czechStudent, internationalStudent) => {
            if (czechStudent && internationalStudent) {
                console.log(czechStudent.getField('person.firstName').value, czechStudent.getField('person.surname').value + ' - ' + internationalStudent.getField('person.firstName').value, internationalStudent.getField('person.surname').value)
            } else {
                console.log('Error in automatic pairing')
            }
        })
        


        return (
            <HasRole role="admin">
                <Button>
                    Start automatic pairing
                </Button>
            </HasRole>
        )
    }, () => (
        <>
            <EntityListSubTree entities={'ApplicationCz[semester.isCurrent=true]'} alias={'currentSemesterCzApplications'}>
                <HasOne field={'person'}>
                    <Field field={'gender'} />
                    <Field field={'firstName'} />
                    <Field field={'surname'} />
                    <HasOne field={'studyProgram'}>
                        <Field field={'name'} />
                    </HasOne>
                </HasOne>
                <HasMany field={'preferredLanguages'}>
                    <Field field={'name'} />
                </HasMany>
                <Field field={'preferredSex'} />
                <Field field={'howManyBuddies'} />
            </EntityListSubTree>
            <EntityListSubTree entities={'ApplicationFr[semester.isCurrent=true]'} alias={'currentSemesterFrApplications'}>
                <HasOne field={'person'}>
                    <Field field={'gender'} />
                    <Field field={'firstName'} />
                    <Field field={'surname'} />
                    <HasOne field={'studyProgram'}>
                        <Field field={'name'} />
                    </HasOne>
                    <HasMany field={'languages'}>
                        <Field field={'name'} />
                    </HasMany>
                </HasOne>
                <Field field={'preferredBuddySex'} />     
            </EntityListSubTree>
        </>
    )
)
  
  



