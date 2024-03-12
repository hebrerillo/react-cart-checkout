import PanelTab from './PanelTab';
import useNavigation from '../hooks/use-navigation';
import Posts from '../panels/Posts';
import Config from '../panels/Config';
import Images from '../panels/Images';
import {useState, useEffect} from 'react';

function PanelContainer() {
    const [postsIntervalId, setPostsIntervalId] = useState(-1);
    const {currentPath, posts, setPosts} = useNavigation();

    useEffect(() => {
        if (currentPath === '/posts' && postsIntervalId !== -1) {
            window.clearTimeout(postsIntervalId);
            setPostsIntervalId(-1);
            return;
        }

        if (postsIntervalId === -1 && currentPath !== '/posts' && posts.length > 15) {
            const intervalId = window.setTimeout(() => {
                setPosts(posts.slice(0, 14));
                setPostsIntervalId(-1);
            }, 4000);
            setPostsIntervalId(intervalId);
            return;
        }
    });


    return (
            <div className="panel-container">
                <div className="panel-tabs">
                    <PanelTab to={'/'}>Images</PanelTab>
                    <PanelTab to={'/posts'}>Posts</PanelTab>
                    <PanelTab to={'/config'}>Config</PanelTab>
                </div>
                <div className="panel-contents">
                    <div className={"panel-contents-wrapper " + (currentPath === '/' ? '' : 'hide')}>
                        <Images />
                    </div>
                    <div className={"panel-contents-wrapper " + (currentPath === '/posts' ? '' : 'hide')}>
                        <Posts />
                    </div>
                    <div className={"panel-contents-wrapper " + (currentPath === '/config' ? '' : 'hide')}>
                        <Config />
                    </div>
                </div>
            </div>

            );
}

export default PanelContainer;
