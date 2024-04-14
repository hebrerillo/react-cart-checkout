import { forwardRef } from 'react';
import { createPortal } from 'react-dom';

const ConnectionErrorModal = forwardRef((_, ref) => {
    return createPortal(<div className={"modal hide"} ref={ref}>
        Error en la conexión. Seguramente sea problema nuestro
    </div>, document.querySelector('.connection-fail'));
});

export default ConnectionErrorModal;
