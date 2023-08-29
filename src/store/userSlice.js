import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const userAPI = `${import.meta.env.VITE_API}/auth`

export const getUser = createAsyncThunk("user/getUser", async () => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(`${userAPI}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

export const setUser = createAsyncThunk("user/setUser", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(userAPI,
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

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${userAPI}/${data.id}`,
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

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const response = await fetch(`${userAPI}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

const userEntity = createEntityAdapter({
  selectId: (user) => user.id
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    ...userEntity.getInitialState(),
    status: "idle"
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "success",
          userEntity.setAll(state, action.payload.data)
      })
      .addCase(getUser.pending, (state) => {
        state.status = "pending"
      })
      .addCase(getUser.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(setUser.fulfilled, (state, action) => {
        userEntity.addOne(state, action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        userEntity.updateOne(state, { id: action.payload.id, updates: action.payload })
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        userEntity.removeOne(state, action.payload)
      })
  }
})

export const userSelector = userEntity.getSelectors(state => state.userSlice)

// export const { update } = userSlice.actions
export default userSlice.reducer