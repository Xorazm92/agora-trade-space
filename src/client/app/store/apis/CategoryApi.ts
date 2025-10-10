import { apiSlice } from "../slices/ApiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (params = {}) => ({
        url: "/categories",
        method: "GET",
        params: params,
      }),
      providesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/categories",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, categoryData }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

getCategoryAttributes: builder.query({
  query: (categoryId: string) => `/attributes`,
  transformResponse: (response: any, meta: any, arg: string) => ({
    attributes: response.attributes
      .filter((attr: any) => 
        attr.categories.some((cat: any) => cat.categoryId === arg)
      )
      .map((attr: any) => {
        const categoryRelation = attr.categories.find((cat: any) => cat.categoryId === arg);
        return {
          id: attr.id,
          name: attr.name,
          isRequired: categoryRelation?.isRequired || false,
          values: attr.values.map((v: any) => ({
            id: v.id,
            value: v.value,
            slug: v.slug,
          })),
        };
      }),
  }),
}),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useGetCategoryAttributesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
