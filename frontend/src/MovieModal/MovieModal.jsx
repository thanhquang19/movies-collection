import React from 'react'
import Modal from 'react-modal';


export default function MovieModal(props) {
  return (
    <Modal isOpen={props.isModalOpen} shouldCloseOnOverlayClick={true}>
        this is a modal;
    </Modal>
  )
}
