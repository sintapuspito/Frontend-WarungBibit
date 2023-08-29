import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const productAPI = `${import.meta.env.VITE_API}/product`

export const getProduct = createAsyncThunk("product/getProduct", async () => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(`${productAPI}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

export const setProduct = createAsyncThunk("product/setProduct", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await axios.post(productAPI, data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
      body: data
    })

  return response
})

export const updateProduct = createAsyncThunk("product/updateProduct", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await axios.put(`${productAPI}/${data.id}`, data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    })

  // const json = await response.json()

  return response
})

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${productAPI}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

const productEntity = createEntityAdapter({
  selectId: (product) => product.id
})

const productSlice = createSlice({
  name: "product",
  initialState: {
    ...productEntity.getInitialState(),
    status: "idle"
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "success",
          productEntity.setAll(state, action.payload.data)
      })
      .addCase(getProduct.pending, (state) => {
        state.status = "pending"
      })
      .addCase(getProduct.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(setProduct.fulfilled, (state, action) => {
        productEntity.addOne(state, action.payload)
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        productEntity.updateOne(state, { id: action.payload.id, updates: action.payload })
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        productEntity.removeOne(state, action.payload)
      })
  }
})

export const productSelector = productEntity.getSelectors(state => state.productSlice)

// export const { update } = productSlice.actions
export default productSlice.reducer