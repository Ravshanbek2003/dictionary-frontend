import { baseApi } from "../baseApi";
import { UploadImageRequest, UploadImageResponse } from "./types";

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation<UploadImageResponse, UploadImageRequest>({
      query: (file) => ({
        url: '/upload',
        method: "POST",
        body: file,
      }),
    }),
  }),
});
export const { useUploadImageMutation } = uploadApi;
