import FormAuth from "../../components/FormAuth"
import { toast } from "react-toastify";
import customApi from "../../api";
import { redirect } from "react-router-dom";
import { registerUser } from "../../features/userSlice";

export const action = (store) => async({request}) => {
  const formInputData = await request.formData()
  const data = Object.fromEntries(formInputData)

  try {
    const response = await customApi.post('/auth/register', data)
    store.dispatch(registerUser(response.data))
    toast.success("Register Success")
    return redirect('/')
  } catch (error) {
    const errorMessage = error?.response?.data?.message
    toast.error(errorMessage)
  
  return null
  }
}
const RegisterView = () => {
  return (
  <main>
    <FormAuth isRegister = {true}/>
    </main>
  )
}

export default RegisterView
