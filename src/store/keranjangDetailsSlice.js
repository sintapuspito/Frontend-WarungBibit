import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const keranjangDetailsAPI = `${import.meta.env.VITE_API}/keranjangdetail`

export const getKeranjangDetails = createAsyncThunk("keranjangDetails/getKeranjangDetails", async () => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  await new Promise((resolve) => setTimeout(resolve, 400));

  const response = await fetch(`${keranjangDetailsAPI}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

export const setKeranjangDetails = createAsyncThunk("keranjangDetails/setKeranjangDetails", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${keranjangDetailsAPI}/keranjangdetail`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

  const json = await response.json()

  return json
})

export const updateKeranjangDetails = createAsyncThunk("keranjangDetails/updateKeranjangDetails", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${keranjangDetailsAPI}/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

  const json = await response.json()

  return json
})

export const deleteKeranjangDetails = createAsyncThunk("keranjangDetails/deleteKeranjangDetails", async (id) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${keranjangDetailsAPI}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

export const setTambahKeranjangDetails = createAsyncThunk("keranjangDetails/setTambahKeranjangDetails", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${keranjangDetailsAPI}/tambah/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

  const json = await response.json()

  return json
})

export const setKurangKeranjangDetails = createAsyncThunk("keranjangDetails/setKurangKeranjangDetails", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${keranjangDetailsAPI}/kurang/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

  const json = await response.json()

  return json
})

const keranjangDetailsEntity = createEntityAdapter({
  selectId: (keranjangDetails) => keranjangDetails.id
})

const keranjangDetailsSlice = createSlice({
  name: "keranjangDetails",
  initialState: {
    ...keranjangDetailsEntity.getInitialState(),
    status: "idle"
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKeranjangDetails.fulfilled, (state, action) => {
        state.status = "success",
          keranjangDetailsEntity.setAll(state, action.payload.data)
      })
      .addCase(getKeranjangDetails.pending, (state) => {
        state.status = "pending"
      })
      .addCase(getKeranjangDetails.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(setKeranjangDetails.fulfilled, (state, action) => {
        keranjangDetailsEntity.addOne(state, action.payload)
      })
      .addCase(setTambahKeranjangDetails.fulfilled, (state, action) => {
        keranjangDetailsEntity.updateOne(state, { id: action.payload.id, updates: action.payload })
      })
      .addCase(setKurangKeranjangDetails.fulfilled, (state, action) => {
        keranjangDetailsEntity.updateOne(state, { id: action.payload.id, updates: action.payload })
      })
      .addCase(updateKeranjangDetails.fulfilled, (state, action) => {
        keranjangDetailsEntity.updateOne(state, { id: action.payload.id, updates: action.payload })
      })
      .addCase(deleteKeranjangDetails.fulfilled, (state, action) => {
        keranjangDetailsEntity.removeOne(state, action.payload)
      })
  }
})

export const keranjangDetailsSelector = keranjangDetailsEntity.getSelectors(state => state.keranjangDetailsSlice)

// export const { update } = keranjangDetailsSlice.actions
export default keranjangDetailsSlice.reducer