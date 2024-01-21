import PanelTab from './PanelTab';
import useNavigation from '../hooks/use-navigation';
import Posts from '../panels/Posts';
import Config from '../panels/Config';
import Images from '../panels/Images';

function PanelContainer() {
    const {currentPath} = useNavigation();

    let finalPanel = null;
    if (currentPath === '/posts') {
        finalPanel = <div className="posts-panel-container"><Posts /></div>;
    } else if (currentPath === '/config') {
        finalPanel = <Config />;
    } else if (currentPath === '/') {
        finalPanel = <Images />;
    }

    return (
            <div className="panel-container">
                <div className="panel-tabs">
                    <PanelTab to={'/'}>Images</PanelTab>
                    <PanelTab to={'/posts'}>Posts</PanelTab>
                    <PanelTab to={'/config'}>Config</PanelTab>
                </div>
                <div className="panel-contents">
                    {finalPanel}
                </div>
            </div>
            );
}

export default PanelContainer;
