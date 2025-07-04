import { Link } from "react-router-dom"
import {useSelector} from "react-redux"



const Header = () => {
  const user = useSelector((state) => state.userState.user)
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="mx-auto max-w-6xl px-8 flex justify-center sm:justify-end">
        <div className="flex gap-x-6 justify-center items-center">
          <Link to='/login' className="link link-hover text-xs sm:text-sm"> Sign In</Link>
          <Link to='/register' className="link link-hover text-xs sm:text-sm">Create Account</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
