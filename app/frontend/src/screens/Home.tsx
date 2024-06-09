import { appConfig, counter } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import logo from '@/assets/images/logo-universal.png';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
    const c = useSelector(counter.select)
    const conf = useSelector(appConfig.select)
    const dispatch = useDispatch()

    return (
        <div>
            <img src={logo} alt="logo" className='h-6' />
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

            <Link to="/chat">
                <Button>
                    Open chat
                </Button>
            </Link>
        </div>
    )
}
