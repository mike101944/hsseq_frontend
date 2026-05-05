import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import AppContent from './components/navvigations/AppContent';
import { TopProgressBar, ScrollTop } from './components';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading data
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Provider store={store}>
      <TopProgressBar loading={loading} />
      <ScrollTop>
        <AppContent />
      </ScrollTop>
    </Provider>
  );
}

export default App;