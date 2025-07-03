import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import { v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'


export const CreateProduct  = asyncHandler(async(req, res) => {
  const newProduct = await Product.create(req.body)

  return res.status(201).json({
    message: "Success Create Product",
    data: newProduct
  })
})

export const AllProduct  = asyncHandler(async(req, res) => {
  // Req Query
  const queryObj = {...req.query}

  // fungsi untuk mengabaikan jika ada req page dan limit
  const excludeField = ["page", "limit", "name"]
  excludeField.forEach((element)=> delete queryObj[element])

  let query ;

  if(req.query.name){
    query = Product.find({
      name: {$regex: req.query.name, $options: 'i'}
    })
  }else{
    query = Product.find(queryObj)
  }

  

  // Pagination
  const page = req.query.page * 1 || 1
  const limitData = req.query.limit * 1 || 10
  const skipData = (page - 1) * limitData

  query = query.skip(skipData).limit(limitData)

  let countProduct = await Product.countDocuments(queryObj)
  if(req.query.page) {
    if(skipData >= countProduct){
      res.status(404)
      throw new Error("Page Not Found")
    }
  }

  const data = await query
  const totalPage = Math.ceil(countProduct/limitData)

  return res.status(200).json({
    message: "Success Get All Product",
    data,
    pagination: {
      totalPage,
      page,
      totalProduct: countProduct
    }
  })
})

export const DetailProduct  = asyncHandler(async(req, res) => {
  const paramsId = req.params.id

  const productData = await Product.findById(paramsId)

  if(!productData) {
    res.status(404)
    throw new Error("Product Not Found")
  }

  return res.status(200).json({
    message: "Success Get Detail Product",
    data: productData
  })
})

export const UpdateProduct  = asyncHandler(async(req, res) => {
  const paramsId = req.params.id

  const updateProduct = await Product.findByIdAndUpdate(paramsId, req.body, {
    runValidators:false,
    new: true
  })
  return res.status(201).json({
    message: "Success Update Product",
    data: updateProduct
  })
})

export const DeleteProduct  = asyncHandler(async(req, res) => {
  const paramsId = req.params.id

  await Product.findByIdAndDelete(paramsId)

  return res.status(200).json({
    message: "Success Delete Product",
  })
})

export const FileUpload  = asyncHandler(async(req, res) => {
  const stream = cloudinary.uploader.upload_stream({
    folder: 'uploads',
    allowed_formats: ['jpg', 'png'],
  },
function(err, result){
  if(err){
    console.log(err)
    return res.status(500).json({
      message: 'Invalid Upload Image',
      error: err
    })
  }
  res.json({
    message: 'Success Upload Image',
    url: result.secure_url
  })
})
streamifier.createReadStream(req.file.buffer).pipe(stream)
})


