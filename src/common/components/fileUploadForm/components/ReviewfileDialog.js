/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ReviewfileDialog = ({ label, content }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                ดูไฟล์ที่อัพโหลด
            </Button>

            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{label}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {content ? (<img alt="ไฟล์เอกสาร" src={content}></img>) : 'ไม่สามารถเปิดได้'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn-outline-primary" onClick={handleClose}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ReviewfileDialog;