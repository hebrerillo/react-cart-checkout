import { createContext, useState, useEffect } from 'react';

const NavigationContext = createContext();

function NavigationProvider(  { children }) {

    const mapPathTitles = new Map([
        ['/', "Images"],
        ['/posts', "Posts"],
        ['/config', "Configuration"]
    ]);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const [currentTitle, setCurrentTitle] = useState(mapPathTitles.get(currentPath));

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

    const shared = {currentPath,
                    navigate,
                    currentTitle
                };

    return (
            <NavigationContext.Provider value={shared}>
                {children}
            </NavigationContext.Provider>
            );
}

export { NavigationProvider };
export default NavigationContext;
