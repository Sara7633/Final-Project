const { default: apiSlice } = require("../../redux/apiSlice");

const OrderApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => ({
                url: "/api/order",
                method: "GET"
            }),
            providesTags: ["Orders"]
        }),
        addOrder: build.mutation({
            query: (Order) => ({
                url: "/api/order",
                method: "POST",
                body: Order
            }),
            invalidatesTags: ["Orders"]
        }),
        addBasket: build.mutation({
            query: (order) => ({
                url: "/api/order/addProduct",
                method: "PUT",
                body: order
            }),
            invalidatesTags: ["Orders"]
        }),
        complete: build.mutation({
            query: (payment) => ({
                url: "/api/order/complete",
                method: "PUT",
                body: payment
            }),
            invalidatesTags: ["Orders"]
        }),
        getBasket: build.query({
            query: () => ({
                url: "/api/order/basket",
                method: "GET"
            }),
            providesTags: ["Orders"]
        }),
        addProductValue: build.mutation({
            query: (product) => ({
                url: "/api/order/addProductValue",
                method: "PUT",
                body: product
            }),
            invalidatesTags: ["Orders"]
        }),
        deleteOrder: build.mutation({
            query: (order) => ({
                url: `/api/order`,
                method: "DELETE",
                body: order
            }),
            invalidatesTags: ["Orders"]
        }),
        updateOrder: build.mutation({
            query: (order) => ({
                url: `/api/order/${order._id}`,
                method: "PUT",
                body: order
            }),
            invalidatesTags: ["Orders"]
        }),
        addComment: build.mutation({
            query: (order) => ({
                url: `/api/order/comment`,
                method: "PUT",
                body: order
            }),
            invalidatesTags: ["Orders"]
        }),
    })
})
export const { useGetOrdersQuery, useAddOrderMutation, useAddBasketMutation, useGetBasketQuery, useCompleteMutation, useAddProductValueMutation, useDeleteOrderMutation, useUpdateOrderMutation ,useAddCommentMutation} = OrderApiSlice
