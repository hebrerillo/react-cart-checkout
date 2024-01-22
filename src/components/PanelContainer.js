import PanelTab from './PanelTab';
import useNavigation from '../hooks/use-navigation';
import Posts from '../panels/Posts';
import Config from '../panels/Config';
import Images from '../panels/Images';

function PanelContainer() {
    const {currentPath} = useNavigation();

    return (
            <div className="panel-container">
                <div className="panel-tabs">
                    <PanelTab to={'/'}>Images</PanelTab>
                    <PanelTab to={'/posts'}>Posts</PanelTab>
                    <PanelTab to={'/config'}>Config</PanelTab>
                </div>
                <div className="panel-contents">
                    <div className={"posts-panel-container " + (currentPath !== '/posts' ? 'hide' : '')}><Posts /></div>
                    <div className={(currentPath !== '/config' ? 'hide' : '')}><Config /></div>
                    <div className={(currentPath !== '/' ? 'hide' : '')}><Images /></div>
                </div>
            </div>
            );
}

export default PanelContainer;
