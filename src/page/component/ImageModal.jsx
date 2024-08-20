import React from 'react';

const ImageModal = ({ show, imageUrl, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className="bg-white p-2 rounded shadow-lg">
        <img src={imageUrl} alt="Large Preview" className="max-w-[90vw] max-h-[90vh]" />
      </div>
    </div>
  );
};

export default ImageModal;
