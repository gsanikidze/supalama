import { Provider } from 'react-redux';
import { Toaster } from "@/components/ui/toaster"

import { makeStore } from './store';
import Router from './Router';

export default function App() {
    const store = makeStore()

    return (
        <Provider store={store}>
            <Router />
            <Toaster />
        </Provider>
    )
}
