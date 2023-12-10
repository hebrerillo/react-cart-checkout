import PanelTab from './PanelTab';

function Panel() {
    return (
            <div className="panel-container">
                <div className="panel-tabs">
                    <PanelTab to={'/images'}>Images</PanelTab>
                    <PanelTab to={'/posts'}>Posts</PanelTab>
                    <PanelTab to={'config'}>Config</PanelTab>
                </div>
            </div>
            );
}

export default Panel;
