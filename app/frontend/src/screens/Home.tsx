import { counter } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import logo from '@/assets/images/logo-universal.png';
import { Button } from "@/components/ui/button";

export default function Home() {
    const c = useSelector(counter.select)
    const dispatch = useDispatch()

    return (
        <div>
            <img src={logo} alt="logo" className='h-6' />
            <div>
                Count: {c.value}
            </div>
            <Button onClick={() => dispatch(counter.actions.setValue(c.value - 1))}>-</Button>
            <Button onClick={() => dispatch(counter.actions.setValue(c.value + 1))}>+</Button>
        </div>
    )
}
