import {Component, DeleteEntityTrigger, DeleteEntityTriggerProps, EntityAccessor, Link, useEntity, useEntityBeforePersist, useMutationState, usePersist, useRedirect} from "@contember/interface";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTrigger
} from "@app/lib/ui/alert-dialog";
import {Button} from "@app/lib/ui/button";
import {FeedbackTrigger} from "@app/lib/binding";
import {RoutingLinkTarget} from "@contember/react-routing";
import { ComponentType, useCallback } from "react";

interface DeleteEntityProps {
    message: string
    deleteMessage?: string 
    children: React.ReactNode
    cancelTo: RoutingLinkTarget,
    afterPersistTo?: RoutingLinkTarget
}

const SlotButton = Slot as ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>

export const DeleteEntityModalButton = Component<DeleteEntityProps>(({message, deleteMessage, children, cancelTo, afterPersistTo}) => {
    const redirect = useRedirect()

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                {message}
                <AlertDialogFooter>
                    <Link to={cancelTo}>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </Link>
                    <FeedbackTrigger>
                        <DeleteEntityTrigger immediatePersist onPersistSuccess={ () => afterPersistTo ? redirect(afterPersistTo) : null}>
                            <AlertDialogAction asChild>
                                <Button variant="destructive">
                                    {deleteMessage || 'Delete'}
                                </Button>
                            </AlertDialogAction>
                        </DeleteEntityTrigger>
                    </FeedbackTrigger>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
},
    (props) => (
        <>
            {props.children}
        </>
    )

);