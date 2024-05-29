import { useState } from 'react';
import logo from './assets/images/logo-universal.png';
import { Greet } from "../wailsjs/go/main/App";
import { Button } from '@/components/ui/button';
import { Hand } from 'lucide-react';

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

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
        </div>
    )
}

export default App
