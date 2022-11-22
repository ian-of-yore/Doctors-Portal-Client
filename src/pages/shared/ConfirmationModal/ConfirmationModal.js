import React from 'react';

const ConfirmationModal = ({ title, description, closeModal, successAction, modalData }) => {

    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{description}</p>
                    <div className="modal-action flex justify-between">
                        <button onClick={closeModal} className='btn btn-info'>Close</button>
                        <label onClick={() => successAction(modalData)} htmlFor="confirmation-modal" className="btn btn-warning">Yes</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;