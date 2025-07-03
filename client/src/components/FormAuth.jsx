/* eslint-disable */
import { Form, Link } from "react-router-dom"
import FormInput from "./Form/FormInput"

const FormAuth = ( {isRegister} ) => {
  return (
    <div className='h-screen grid place-items-center'>
      <Form method="POST"
      className="card w-96 p-8 bg-base-300 shadow-lg flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold ">{isRegister ? "Register" : "Login"}</h4>
        {isRegister ? (
        <FormInput type="name" name="name" label="username"/>
        ) : null }
        <FormInput type="email" name="email" label="email"/>
        <FormInput type="password" name="password" label= "password"/>
        <div className="mt-4">
          <button type="submit" className="btn btn-primary btn-block">{isRegister ? "Register" : "Login"}</button>
        </div>
        {isRegister ? (
           <p className="text-center">
           Already have an account ?
           <Link to='/login' className="ml-2 link link-hover link-accent capitalize ">
           Login
           </Link>
         </p>
        ):  (<p className="text-center">
        Do not have an account ?
        <Link to='/register' className="ml-2 link link-hover link-accent capitalize ">
        Register
        </Link>
      </p>)}
        
      </Form>
    </div>
  )
}

export default FormAuth
