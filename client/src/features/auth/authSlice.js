import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        id:"",
        token: localStorage.getItem("token") || "",
        role: localStorage.getItem("role") || "",
        isUserLoggedIn: localStorage.getItem("token") ? true : false
    },
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.accessToken
            const role=action.payload.role
            state.token = token
            state.isUserLoggedIn = true
            localStorage.setItem("token", token)
            localStorage.setItem("role", role)
        },
        removeToken: (state) => {
            state.token = ""
            state.role=""
            state.isUserLoggedIn = false
            localStorage.removeItem("token")
            localStorage.removeItem("role")

        }
    }
})
export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions