import { apiSlice } from "../slices/ApiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsByProductId: builder.query({
      query: (productId) => ({
        url: `/reviews/${productId}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/reviews",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
    }),

    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: "/reviews",
        method: "DELETE",
        body: { reviewId },
      }),
      invalidatesTags: ["Review"],
    }),

    getAllReviews: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Review"],
    }),

    updateReviewStatus: builder.mutation({
      query: ({ reviewId, status }) => ({
        url: `/reviews/${reviewId}/status`,
        method: "PATCH",
        body: { status },
        credentials: "include",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetReviewsByProductIdQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useUpdateReviewStatusMutation,
} = reviewApi;
