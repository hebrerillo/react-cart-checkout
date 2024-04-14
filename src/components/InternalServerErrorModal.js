import { forwardRef } from 'react';
import { createPortal } from 'react-dom';

const InternalServerErrorModal = forwardRef((_, ref) => {
    return createPortal(<div className={"modal hide"} ref={ref}>
        Error interno del servidor
    </div>, document.querySelector('.server-internal-error'));
});

export default InternalServerErrorModal;
