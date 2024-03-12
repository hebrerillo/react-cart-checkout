import { createContext, useState, useEffect, createRef, useCallback } from 'react';
import getPosts from '../utils/getPosts';

const NavigationContext = createContext();
const loaderRef = createRef();

function NavigationProvider( { children }) {

    const mapPathTitles = new Map([
        ['/', "Images"],
        ['/posts', "Posts"],
        ['/config', "Configuration"]
    ]);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const [currentTitle, setCurrentTitle] = useState(mapPathTitles.get(currentPath));
    const [posts, setPosts] = useState([]);

    const showLoader = useCallback((show) => {
        if (!loaderRef.current) {
            return;
        }
        if (show) {
            loaderRef.current.classList.remove('hide');
        }
        else {
            loaderRef.current.classList.add('hide');
        }
    }, []);

    useEffect(() => {
        const handler = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handler);

        return () => {
            window.removeEventListener('popstate', handler);
        };
    }, []);

    const navigate = (to) => {
        window.history.pushState({}, '', to);
        setCurrentPath(to);
        setCurrentTitle(mapPathTitles.get(to));
    };

    const setPostsCB = useCallback((remotePosts) => {
        setPosts((currentPosts) => {
            return currentPosts.concat(remotePosts);
        });
    }, []);

    const fetchPosts = useCallback(async (length) => {
        showLoader(true);
        const remotePosts = await getPosts(length, true);
        setPostsCB(remotePosts);
        showLoader(false);
    }, [showLoader, setPostsCB]);

    const shared = {currentPath,
        navigate,
        currentTitle,
        loaderRef,
        posts,
        fetchPosts
    };

    return (
            <NavigationContext.Provider value={shared}>
                {children}
            </NavigationContext.Provider>
            );
}

export { NavigationProvider };
export default NavigationContext;
