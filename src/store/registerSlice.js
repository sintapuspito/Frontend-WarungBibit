import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const registerAPI = `${import.meta.env.VITE_API}/auth/register`

export const setRegister = createAsyncThunk("register/setRegister", async (data) => {
  const response = await fetch(registerAPI,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  const json = await response.json()

  return json
})

const registerEntity = createEntityAdapter({
  selectId: (register) => register
})

const registerSlice = createSlice({
  name: "register",
  initialState: {
    ...registerEntity.getInitialState()
  },
  extraReducers: (builder) => {
    builder
      .addCase(setRegister.fulfilled, (state, action) => {
        registerEntity.setAll(state, action.payload)
      })
      .addCase(setRegister.rejected, (state, action) => {
        registerEntity.setAll(state, action.payload)
      })
  }
})

export const registerSelector = registerEntity.getSelectors(state => state.registerSlice)

export const { update } = registerSlice.actions
export default registerSlice.reducer