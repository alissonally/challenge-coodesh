import React, { useEffect, useRef } from 'react'
import Modal from 'bootstrap/js/dist/modal.js';
import { ModalContent, Header, Avatar, WarpperContent, CloseButton, MainModal } from './styles';
import ShareSystem from '../ShareSystem';
let modalinstace=null;
const PacienteModal = ({isOpen, item, current_page, onClose})=>{

    const modalref = useRef()

    const Hidden=()=>{
        modalinstace = null
        if(onClose){
            onClose()
        }
    }

    const OpenModal = ()=>{
        if(modalref.current){
            modalinstace = new Modal(modalref.current)
            modalinstace.show()
            modalref.current.addEventListener('hidden.bs.modal', Hidden)
            
        }
    }

    const CloseModal = (ev)=>{
        if(modalref.current && modalinstace){
            modalinstace.hide()
        }
    }

    useEffect(()=>{
        let b = document.querySelector("body")
        if(isOpen && !b.classList.contains('modal-open')){
            OpenModal()
        }
    }, [isOpen])

    return (
        <div>
            <MainModal className="modal" ref={modalref} id="pacient-modal" tabIndex="-1">
                {isOpen &&
                <WarpperContent className="modal-dialog modal-dialog-centered">
                    <ModalContent className="modal-content">
                        <CloseButton onClick={CloseModal}>
                            <span>&times;</span>
                        </CloseButton>
                        
                        <Header>
                            <Avatar>
                                <img src={item?.picture?.medium} alt={item?.name?.first} />
                            </Avatar>
                        </Header>
                        
                        <ul className="list-group mt-3">
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">ID</div>
                                    {item?.login?.uuid}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Nome</div>
                                    {item?.name?.first} {item?.name?.last}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Email</div>
                                    {item?.email}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Gênero</div>
                                    {item?.gender}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Telefone</div>
                                    {item?.phone}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Nacionalidade</div>
                                    {item?.nat}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Endereço</div>
                                    <address className="d-block my-0">{item?.location?.street?.name} - {item?.location?.street?.number}</address>
                                    <address className="d-block my-0">{item?.location?.city} - {item?.location?.state}</address>
                                </div>
                            </li>
                        </ul>
                        <div className="wrapper-btn-shared-modal">
                            <ShareSystem type="button" className="btn btn-primary btn-sm" item={{item, current_page}} />
                        </div>
                    </ModalContent>
                </WarpperContent>
                }
            </MainModal>

        </div>
    )
}
export default PacienteModal