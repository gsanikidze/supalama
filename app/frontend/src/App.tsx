import { useLayoutEffect, useState } from 'react';
import logo from './assets/images/logo-universal.png';
import { Greet } from "../wailsjs/go/main/App";
import { Button } from '@/components/ui/button';
import { Hand } from 'lucide-react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { counter, makeStore } from './store';
import { appConfig } from './store/features/app-config';

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);
    const c = useSelector(counter.select)
    const conf = useSelector(appConfig.select)
    const dispatch = useDispatch()

    function greet() {
        Greet(name).then(updateResultText);
    }

    useLayoutEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');
        root.classList.add(conf.theme);
    }, [conf.theme])

    return (
        <div>
            <img src={logo} alt="logo" className='h-6' />
            <div>{resultText}</div>
            <div>
                <input onChange={updateName} autoComplete="off" name="input" type="text" />
                <Button onClick={greet}>
                    <Hand />
                    Greet
                </Button>
            </div>
            <div>
                Count: {c.value}
            </div>
            <Button onClick={() => dispatch(counter.actions.setValue(c.value - 1))}>-</Button>
            <Button onClick={() => dispatch(counter.actions.setValue(c.value + 1))}>+</Button>

            <div>
                Theme - {conf.theme}
            </div>
            <Button onClick={() => dispatch(appConfig.actions.toggleTheme())}>
                Toggle theme!
            </Button>
        </div>
    )
}

export default () => {
    const store = makeStore()

    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}
