import useNavigation from '../hooks/use-navigation';

function PanelTab({to, children}) {
    const { navigate } = useNavigation();
    const handleClick = (event) => {
        event.preventDefault();
        navigate(to);
    };

    return (
            <a href={to} onClick={handleClick} className="panel-tab">
                {children}
            </a>
            );
}

export default PanelTab;
