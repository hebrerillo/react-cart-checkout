import PanelTab from './PanelTab';
import useNavigation from '../hooks/use-navigation';
import Posts from '../panels/Posts';
import Config from '../panels/Config';
import Images from '../panels/Images';
import {useRef} from 'react';

function PanelContainer() {
    const {currentPath} = useNavigation();
    const loaderRef = useRef();

    const showLoader = (show) => {
        if (show) {
            console.log(loaderRef);
            loaderRef.current.classList.remove('hide');
        } else {
            loaderRef.current.classList.add('hide');
        }
    };

    return (
            <div className="panel-container">
                <div className="panel-tabs">
                    <PanelTab to={'/'}>Images</PanelTab>
                    <PanelTab to={'/posts'}>Posts</PanelTab>
                    <PanelTab to={'/config'}>Config</PanelTab>
                </div>
                <div className="panel-contents">
                    <div className={"posts-panel-container " + (currentPath !== '/posts' ? 'hide' : '')}><Posts showLoaderCB={showLoader} /></div>
                    <div className={(currentPath !== '/config' ? 'hide' : '')}><Config /></div>
                    <div className={(currentPath !== '/' ? 'hide' : '')}><Images /></div>
                </div>
                <div className={"loader hide"} ref={loaderRef}>
                    <img src="loading.svg" alt="loading"/>
                </div>
            </div>
            
            );
}

export default PanelContainer;
