import FormAuth from "../../components/FormAuth"
import customApi from "../../api"
import { toast } from "react-toastify"
import { redirect } from "react-router-dom"
import { loginUser } from "../../features/userSlice"

export const action = (store) => async({request}) => {
  const formInputData = await request.formData()
  const data = Object.fromEntries(formInputData)

  try {
    const response = await customApi.post('/auth/login', data)
    store.dispatch(loginUser(response.data))
    toast.success("Login Success")
    return redirect('/')
  } catch (error) {
    const errorMessage = error?.response?.data?.message
    toast.error(errorMessage)
    return null
    
  }
}

const LoginView = () => {
  return ( 
  <main>
    <FormAuth/>
  </main>
  )
}

export default LoginView
