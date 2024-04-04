const { default: apiSlice } = require("../../redux/apiSlice")

const ProductApiSlice = apiSlice.injectEndpoints({
    
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => ({
                url: "/api/product"
            }),
            providesTags: ["Products"]
        }),
        addProduct: build.mutation({
            query: (Product) => ({
                url: "/api/product",
                method: "POST",
                body: Product
            }),
            invalidatesTags: ["Products"]
        }),
        deleteProduct: build.mutation({
            query: (product) => ({
                url: "/api/product",
                method: "DELETE",
                body: product
            }),
            invalidatesTags: ["Products"]
        }),    
        updateProduct: build.mutation({
            query: (Product) => ({
                url: "/api/product",
                method: "PUT",
                body: Product
            }),
            invalidatesTags: ["Products"]
        }),
    })
})
export const {useGetProductsQuery, useAddProductMutation,useDeleteProductMutation,useUpdateProductMutation}=ProductApiSlice
