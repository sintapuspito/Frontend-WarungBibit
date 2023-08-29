import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const pesananDetailsAPI = `${import.meta.env.VITE_API}/pesanandetail`

export const getPesananDetails = createAsyncThunk("pesananDetails/getPesananDetails", async () => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(`${pesananDetailsAPI}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

export const setPesananDetails = createAsyncThunk("pesananDetails/setPesananDetails", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${pesananDetailsAPI}/pesanandetail`,
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

export const updatePesananDetails = createAsyncThunk("pesananDetails/updatePesananDetails", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${pesananDetailsAPI}/${data.id}`,
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

export const deletePesananDetails = createAsyncThunk("pesananDetails/deletePesananDetails", async (id) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${pesananDetailsAPI}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

const pesananDetailsEntity = createEntityAdapter({
  selectId: (pesananDetails) => pesananDetails.id
})

const pesananDetailsSlice = createSlice({
  name: "pesananDetails",
  initialState: {
    ...pesananDetailsEntity.getInitialState(),
    status: "idle"
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPesananDetails.fulfilled, (state, action) => {
        state.status = "success",
          pesananDetailsEntity.setAll(state, action.payload.data)
      })
      .addCase(getPesananDetails.pending, (state) => {
        state.status = "pending"
      })
      .addCase(getPesananDetails.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(setPesananDetails.fulfilled, (state, action) => {
        pesananDetailsEntity.addOne(state, action.payload)
      })
      .addCase(updatePesananDetails.fulfilled, (state, action) => {
        pesananDetailsEntity.updateOne(state, { id: action.payload.id, updates: action.payload })
      })
      .addCase(deletePesananDetails.fulfilled, (state, action) => {
        pesananDetailsEntity.removeOne(state, action.payload)
      })
  }
})

export const pesananDetailsSelector = pesananDetailsEntity.getSelectors(state => state.pesananDetailsSlice)

// export const { update } = pesananDetailsSlice.actions
export default pesananDetailsSlice.reducer