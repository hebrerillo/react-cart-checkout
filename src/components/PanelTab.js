function PanelTab({to, children}) {

    const handleClick = (event) => {
        event.preventDefault();
        window.history.pushState({}, '', to);
    };

    return (
            <a href={to} onClick={handleClick} className="panel-tab">
                {children}
            </a>
            );
}

export default PanelTab;
