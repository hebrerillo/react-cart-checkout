function PanelTab({to, children}) {
    return (
            <a href={to} className="panel-tab">
                {children}
            </a>
            );
}

export default PanelTab;
