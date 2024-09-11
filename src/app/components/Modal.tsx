import React from 'react';
import '../css/modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button className='close-btn' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};