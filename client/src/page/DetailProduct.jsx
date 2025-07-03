/* eslint-disable */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import customApi from "../api";
import { FaPlus } from "react-icons/fa6";
import { generateSelectAmount, priceFormat } from "../utils";

const DetailProduct = () => {
  let { id } = useParams();
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  }
  


  const handleCart = () => {
    console.log(amount);
    
  }

  const productData = async () => {
    const { data } = await customApi.get(`/product/${id}`);
    setProduct(data.data);
  };
  useEffect(() => {
    productData();
  }, []);

  return (
    <section>
      <div className="card lg:card-side bg-base-300 shadow-xl">
        <figure>
          <img
            src={product.image}
            alt={product.name}
            className="w-screen h-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <span className="text-3xl text-accent font-bold">
            {priceFormat(product.price)}
          </span>
          <span className="badge badge-primary">{product.category}</span>
          <span className="mt-3 font-bold">Stock : {product.stock}</span>
          <p className="mt-3">{product.description}</p>
          <div className="card-actions justify-end">
            <div className="p-8 flex flex-col gap-y-4">
              <label className="form-control">
                <label className="label">
                  <span className="capitilize label-text">Amount</span>
                </label>
                <select name="amount" className="select select-bordered" onChange={handleAmount}>
                  {generateSelectAmount(product.stock)} 
                </select>
              </label>
              <button className="btn btn-primary btn-lg" onClick={handleCart}>
                <FaPlus /> Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
