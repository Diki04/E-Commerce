/* eslint-disable */

import { Form, Link } from "react-router-dom"
import FormInput from "./Form/FormInput"
import FormSelect from "./Form/FormSelect"
import { useLoaderData } from "react-router-dom"

const Filter = () => {
  const {params} = useLoaderData()
  const {name, category} = params
  const categories = [ "Shoes", "Shirt","T-Shirt", "Pants"]
  return (
    <Form method='get' className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-3 grid-cols-2 items-center">
      <FormInput 
      label= "Search Product"
      type="search"
      name="name"
      defaultValue={name}
      />
      <FormSelect label="select-category" name='category' list={categories} defaultValue={category}/>
      <button type="submit" className="btn btn-primary">Search</button>
      <Link to='/products' className="btn btn-accent">Back</Link>
    </Form>
  )
}

export default Filter
