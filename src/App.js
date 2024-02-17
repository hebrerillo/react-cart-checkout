import PanelContainer from './components/PanelContainer';   
import useNavigation from './hooks/use-navigation';


function App() {
    const {currentTitle} = useNavigation();
    return (
    <div>
        <h1 className="main-title">{currentTitle}</h1>
        <PanelContainer />
    </div>
  );
}

export default App;
