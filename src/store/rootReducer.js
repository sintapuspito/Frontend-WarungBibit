import loginSlice from "./loginSlice"
import registerSlice from "./registerSlice"
import productSlice from "./productSlice"
import keranjangSlice from "./keranjangSlice"
import keranjangDetailsSlice from "./keranjangDetailsSlice"
import pesananSlice from "./pesananSlice"
import pesananDetailsSlice from "./pesananDetailsSlice"
import userSlice from "./userSlice"

const rootReducer = {
  loginSlice,
  registerSlice,
  productSlice,
  keranjangSlice,
  keranjangDetailsSlice,
  pesananSlice,
  pesananDetailsSlice,
  userSlice
}

export default rootReducer