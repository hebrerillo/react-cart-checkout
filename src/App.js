import PanelContainer from './components/PanelContainer';   
import useNavigation from './hooks/use-navigation';
import Loader from './components/Loader';
import InternalServerErrorModal from './components/InternalServerErrorModal';
import ConnectionErrorModal from './components/ConnectionErrorModal';

function App() {
    const {currentTitle, loaderRef, internalServerErrorModalRef, connectionErrorModalRef} = useNavigation();
    return (
    <div>
        <h1 className="main-title">{currentTitle}</h1>
        <PanelContainer />
        <Loader ref={loaderRef} />
        <InternalServerErrorModal ref={internalServerErrorModalRef} />
        <ConnectionErrorModal ref={connectionErrorModalRef} />
    </div>
  );
}

export default App;
