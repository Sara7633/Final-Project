import apiSlice from "../../redux/apiSlice"

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation(
            {
            query: (registerUser) => ({
                url: "/api/auth/register",
                method: "POST",
                body: registerUser
            })
        }),
        login: build.mutation({
            query: (loginData) => ({
                url: "/api/auth/login",
                method: "POST",
                body: loginData
            })
        }),
        sendEmail: build.mutation({
            query: (email) => ({
                url: "/api/auth/email",
                method: "POST",
                body: email
            })
        }),
    })
})
export const { useRegisterMutation, useLoginMutation,useSendEmailMutation } =authApiSlice
