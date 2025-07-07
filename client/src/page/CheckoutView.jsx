import CartTotal from "../components/CartTotal"
import { Form } from "react-router-dom"
import FormInput from "../components/Form/FormInput"
import { useSelector } from "react-redux"

const CheckoutView = () => {
  const user = useSelector((state) => state.userState.user)
  const carts = useSelector((state) => state.cartState.cartItems)
  return (
   <> 
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Checkout Product</h2>
      </div>
      <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-8">
          <Form method="POST" className="bg-base-200 rounded-2xl grid grid-y-5 p-5 items-center">
            <div className="grid grid-cols-2 gap-x-4">
              <FormInput label="First Name" name="firstname" type="name" placeholder="Enter your first name" />
              <FormInput label="Last Name" name="lastname" type="name" placeholder="Enter your last name" />
            </div>
             <FormInput label="Email" name="email" type="email" placeholder="Enter your email" defaultValue={user.email}/>
              <FormInput label="Phone" name="phone" type="name" placeholder="Enter your phone number" />
              <button type="submit" className="btn btn-primary mt-8">Payment</button>
          </Form>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal carts={carts} />
        </div>
      </div>
   
   </>
  )
}

export default CheckoutView
