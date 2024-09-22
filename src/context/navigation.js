import { createContext, useState, useEffect, createRef, useCallback } from 'react';
import InternalServerError from '../utils/InternalServerError';
import getPosts from '../utils/getPosts';

const NavigationContext = createContext();
const loaderRef = createRef();
const internalServerErrorModalRef = createRef();
const connectionErrorModalRef = createRef();

function NavigationProvider( { children }) {

    const mapPathTitles = new Map([
        ['/', "Images"],
        ['/posts', "Posts"],
        ['/config', "Configuration"]
    ]);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const [currentTitle, setCurrentTitle] = useState(mapPathTitles.get(currentPath));
    const [posts, setPosts] = useState([]);

    const showModalHelper = (show, modal) => {
        if (show) {
            modal.classList.remove('hide');
        }
        else {
            modal.classList.add('hide');
        }
    };

    const showLoader = useCallback((show) => {
        if (!loaderRef.current) {
            return;
        }
        showModalHelper(show, loaderRef.current);
    }, []);

    const showInternalServerErrorModal = useCallback((show) => {
        if (!internalServerErrorModalRef.current) {
            console.error("No internal server error modal!!!");
            return;
        }
        showModalHelper(show, internalServerErrorModalRef.current);
    }, []);

    const showConnectionErrorModal = useCallback((show) => {
        if (!connectionErrorModalRef.current) {
            console.error("No connection error modal!!!");
            return;
        }
        showModalHelper(show, connectionErrorModalRef.current);
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

    const checkForDuplicatePosts = (currentPosts, remotePosts) => {
      return !!(currentPosts.find((item) => item.id === remotePosts[0].id));
    };

    const setPostsCB = useCallback((remotePosts) => {
        setPosts((currentPosts) => {
          return !checkForDuplicatePosts(currentPosts, remotePosts) ? currentPosts.concat(remotePosts) : currentPosts;
        });
    }, []);

    const fetchPosts = useCallback(async (length) => {
        showLoader(true);
        const getPostsOptions = {
            mock: false
        };
        try {
            const remotePosts = await getPosts(length, getPostsOptions);
            setPostsCB(remotePosts);
        } catch(error) {
            console.log("error", error);
            if(error instanceof InternalServerError || error instanceof SyntaxError) {
                console.log("Internal server error when retrieving posts");
                showInternalServerErrorModal(true);
            }
            else {
                console.log("Error en conexion", error);
                showConnectionErrorModal(true);
            }
        }finally {
            showLoader(false);
        }
    }, [showLoader, setPostsCB, showInternalServerErrorModal, showConnectionErrorModal]);

    const shared = {currentPath,
        navigate,
        currentTitle,
        loaderRef,
        internalServerErrorModalRef,
        connectionErrorModalRef,
        posts,
        fetchPosts,
        setPosts: useCallback(posts => setPosts(posts), [])
    };

    return (
            <NavigationContext.Provider value={shared}>
                {children}
            </NavigationContext.Provider>
            );
}

export { NavigationProvider };
export default NavigationContext;
