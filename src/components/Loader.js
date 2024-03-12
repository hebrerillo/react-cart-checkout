import { forwardRef } from 'react';
import { createPortal } from 'react-dom';

const Loader = forwardRef((_, ref) => {
    return createPortal(<div className={"loader hide"} ref={ref}>
        <img src="loading.svg" alt="loading"/>
    </div>, document.querySelector('.loader-wrapper'));
});

export default Loader;
