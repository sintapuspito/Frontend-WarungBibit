import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const keranjangAPI = `${import.meta.env.VITE_API}/keranjang`

export const getKeranjang = createAsyncThunk("keranjang/getKeranjang", async () => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(`${keranjangAPI}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

export const setKeranjangByIdUser = createAsyncThunk("keranjang/setKeranjangByIdUser", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(`${keranjangAPI}/keranjang`, {
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

export const setKeranjang = createAsyncThunk("keranjang/setKeranjang", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(keranjangAPI,
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

export const updateKeranjang = createAsyncThunk("keranjang/updateKeranjang", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${keranjangAPI}/${data.id}`,
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

export const deleteKeranjang = createAsyncThunk("keranjang/deleteKeranjang", async (id) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${keranjangAPI}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

const keranjangEntity = createEntityAdapter({
  selectId: (keranjang) => keranjang.id
})

const keranjangSlice = createSlice({
  name: "keranjang",
  initialState: {
    ...keranjangEntity.getInitialState(),
    status: "idle"
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKeranjang.fulfilled, (state, action) => {
        state.status = "success",
          keranjangEntity.setAll(state, action.payload.data)
      })
      .addCase(setKeranjangByIdUser.fulfilled, (state, action) => {
        keranjangEntity.setAll(state, action.payload)
      })
      .addCase(getKeranjang.pending, (state) => {
        state.status = "pending"
      })
      .addCase(getKeranjang.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(setKeranjang.fulfilled, (state, action) => {
        keranjangEntity.addOne(state, action.payload)
      })
      .addCase(updateKeranjang.fulfilled, (state, action) => {
        keranjangEntity.updateOne(state, { id: action.payload.id, updates: action.payload })
      })
      .addCase(deleteKeranjang.fulfilled, (state, action) => {
        keranjangEntity.removeOne(state, action.payload)
      })
  }
})

export const keranjangSelector = keranjangEntity.getSelectors(state => state.keranjangSlice)

// export const { update } = keranjangSlice.actions
export default keranjangSlice.reducer