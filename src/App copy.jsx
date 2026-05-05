import { useState ,useEffect } from 'react'

// import { PrimeReactProvider } from 'primereact/api';
import { TopProgressBar ,ScrollTop} from './components';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import AppContent from './components/navvigations/AppContent';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading data
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    // <PrimeReactProvider>
    <Provider store={store}>
      <TopProgressBar loading={loading} />
       <ScrollTop>
     
       <AppContent/>
       
       </ScrollTop>
       </Provider>
    /* </PrimeReactProvider> */
  )
}

export default App