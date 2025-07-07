import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"


const links = [
  {id: 1, url: 'about',text: 'about'},
  {id: 2, url: 'products',text: 'products'},
  {id: 3, url: 'orders',text: 'orders'},
  {id: 4, url: 'checkout',text: 'checkout'},
]

const NavList = () => {
  const user = useSelector((state) => state.userState.user)
  return (
    <>
    {links.map((link)=> {
      const {id, url, text} = link
      if((url === 'orders' || url === "checkout") && !user) {
        return null // Skip rendering if user is not logged in

      }
      return (
        <li key={id}>
          <NavLink className="capitalize" to={url}>
            {text}
          </NavLink>
        </li>
      )
    })}
    </>
  )
}

export default NavList
