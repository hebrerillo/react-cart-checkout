import PanelTab from './PanelTab';
import useNavigation from '../hooks/use-navigation';
import Posts from '../panels/Posts';
import Config from '../panels/Config';
import Images from '../panels/Images';
import {useRef, useState, useCallback} from 'react';

function PanelContainer() {
    const [posts, setPosts] = useState([]);
    const {currentPath} = useNavigation();
    const loaderRef = useRef();

    const showLoader = useCallback((show) => {
        if (show) {
            loaderRef.current.classList.remove('hide');
        }
        else {
            loaderRef.current.classList.add('hide');
        }
    }, []);

    const setPostsCB = useCallback((remotePosts) => {
        setPosts((currentPosts) => {
            return currentPosts.concat(remotePosts);
        });
    }, []);

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
                        <Posts showLoaderCB={showLoader} posts={posts} postsCB={setPostsCB}/>
                    </div>
                    <div className={"panel-contents-wrapper " + (currentPath === '/config' ? '' : 'hide')}>
                        <Config />
                    </div>
                </div>
                <div className={"loader hide"} ref={loaderRef}>
                    <img src="loading.svg" alt="loading"/>
                </div>
            </div>

            );
}

export default PanelContainer;
