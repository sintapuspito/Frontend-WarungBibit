import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

const pesananAPI = `${import.meta.env.VITE_API}/pesanan`

export const getPesanan = createAsyncThunk("pesanan/getPesanan", async () => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(`${pesananAPI}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

export const getPesananByIdUser = createAsyncThunk("pesanan/getPesananByIdUser", async () => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const id = jwtDecode(token).id
  await new Promise((resolve) => setTimeout(resolve, 400));

  const response = await fetch(`${pesananAPI}/riwayat/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

export const setPesanan = createAsyncThunk("pesanan/setPesanan", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(pesananAPI,
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

export const updatePesanan = createAsyncThunk("pesanan/updatePesanan", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await axios.put(`${pesananAPI}/${data.id}`, data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    })

  // const json = await response.json()

  return response
})

export const deletePesanan = createAsyncThunk("pesanan/deletePesanan", async (id) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${pesananAPI}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

const pesananEntity = createEntityAdapter({
  selectId: (pesanan) => pesanan.id
})

const pesananSlice = createSlice({
  name: "pesanan",
  initialState: {
    ...pesananEntity.getInitialState(),
    status: "idle"
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPesanan.fulfilled, (state, action) => {
        state.status = "success",
          pesananEntity.setAll(state, action.payload.data)
      })
      .addCase(getPesanan.pending, (state) => {
        state.status = "pending"
      })
      .addCase(getPesanan.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(getPesananByIdUser.fulfilled, (state, action) => {
        state.status = "success",
          pesananEntity.setAll(state, action.payload.data)
      })
      .addCase(getPesananByIdUser.pending, (state) => {
        state.status = "pending"
      })
      .addCase(getPesananByIdUser.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(setPesanan.fulfilled, (state, action) => {
        pesananEntity.addOne(state, action.payload)
      })
      .addCase(updatePesanan.fulfilled, (state, action) => {
        state.status = "success",
          pesananEntity.updateOne(state, { id: action.payload.id, updates: action.payload })
      })
      .addCase(updatePesanan.pending, (state) => {
        state.status = "pending"
      })
      .addCase(updatePesanan.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(deletePesanan.fulfilled, (state, action) => {
        pesananEntity.removeOne(state, action.payload)
      })
  }
})

export const pesananSelector = pesananEntity.getSelectors(state => state.pesananSlice)

// export const { update } = pesananSlice.actions
export default pesananSlice.reducer