import { appConfig, counter } from "@/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from '@/assets/images/logo-universal.png';
import { Button } from "@/components/ui/button";
import { Hand } from "lucide-react";
import { Greet } from "wailsjs/go/main/App";
import { Link } from "react-router-dom";

export default function Home() {
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
          <Link to="/build-workflow">
          <Button>
            Build workflow
          </Button>
          </Link>
      </div>
  )
}
