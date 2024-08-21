import React from "react";

function Modal({isOpen, onClose, onCOnfirm}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl text-teal-400 font-bold mb-4">Bist du sicher?</h2>
                <p>Möchtest du dieses To-Do wirklich löschen?</p>
                <div className="mt-4 flex justify-end">
                    <button
                            onClick={() => onClose()}
                            className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Abbrechen
                    </button>
                    <button
                            onClick={() => onCOnfirm()}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500">Löschen
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;