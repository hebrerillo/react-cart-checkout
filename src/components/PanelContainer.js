import PanelTab from './PanelTab';
import useNavigation from '../hooks/use-navigation';
import Posts from '../panels/Posts';
import Config from '../panels/Config';
import Images from '../panels/Images';
import {useRef, useState, useCallback, useEffect} from 'react';

function PanelContainer() {
    const [posts, setPosts] = useState([]);
    const [postsIntervalId, setPostsIntervalId] = useState(-1);
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
