import PanelContainer from './components/PanelContainer';   
import useNavigation from './hooks/use-navigation';
import Loader from './components/Loader';


function App() {
    const {currentTitle, loaderRef} = useNavigation();
    return (
    <div>
        <h1 className="main-title">{currentTitle}</h1>
        <PanelContainer />
        <Loader ref={loaderRef} />
    </div>
  );
}

export default App;
