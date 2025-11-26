import React from 'react'
import UpdatePasswordForm from '../Forms/UpdatePasswordForm'
import ModalBase from './ModalBase'

export default function UpdatePasswordModal({ isOpen, setIsOpen, recoveryEmail }) {
    return (
        <ModalBase isOpen={isOpen} setIsOpen={setIsOpen}>
            <UpdatePasswordForm recoveryEmail={recoveryEmail} setIsOpen={setIsOpen} />
        </ModalBase>
    )
}
