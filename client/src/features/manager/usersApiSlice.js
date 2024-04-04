const { default: apiSlice } = require("../../redux/apiSlice");

const UserApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: "/api/user",
                method:"GET"
            }),
            providesTags: ["Users"]
        }),
        createUser: build.mutation({
            query: (User) => ({
                url: "/api/user",
                method: "POST",
                body: User
            }),
            invalidatesTags: ["Users"]
        }),
        addBasket: build.mutation({
            query: (Product) => ({
                url: "/api/user/addProduct",
                method: "PUT",
                body: Product
            }),
            invalidatesTags: ["Users"]
        }),
      complete: build.mutation({
            query: (payment) => ({
                url: "/api/user/complete",
                method: "PUT",
                body:payment
            }),
            invalidatesTags: ["Users"]
        }),
        updateUser: build.mutation({
            query: (user) => ({
                url: "/api/user",
                method: "PUT",
                body:user
            }),
            invalidatesTags: ["Users"]
        }),
        getBasket: build.query({
            query: () => ({
                url: "/api/user/basket",
                method:"GET"
            }),
            providesTags: ["Users"]
        }),
        deleteUser: build.mutation({
            query: (product) => ({
                url: "/api/user",
                method: "DELETE",
                body:product
            }),
            invalidatesTags: ["Users"]
        })
    })
})
export const { useGetUsersQuery,useUpdateUserMutation, useCreateUserMutation, useAddBasketMutation, useGetBasketQuery,useCompleteMutation, useDeleteUserMutation  } = UserApiSlice
