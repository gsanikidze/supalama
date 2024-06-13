import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/" 
      className="bg-gradient-to-r from-primary text-lg to-pink-500 inline-block text-transparent bg-clip-text font-mono font-black"
    >
      Supalama
    </Link>
  )
}
