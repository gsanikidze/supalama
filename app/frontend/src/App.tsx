import { Provider } from 'react-redux';
import { makeStore } from './store';
import Router from './Router';

export default function App() {
    const store = makeStore()

    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}
