import { axios_instance } from "@/lib/axios";
import { errorToast } from "@/lib/toast";

import { useState } from "react";

const useBookMark = () => {
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const addBookmark = async (payload: { url: string }, callback: Function) => {
    setBookmarkLoading(true);
    try {
      const response = await axios_instance.post("/bookmark", payload);
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message || "Failed to add bookmark. Please try again"
        );
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const getBookmarks = async (callback: Function) => {
    setBookmarkLoading(true);
    try {
      const response = await axios_instance.get("/bookmark");
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message ||
            "Failed to fetch bookmarks. Please try again"
        );
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const deleteBookmark = async (id: string, callback: Function) => {
    setBookmarkLoading(true);
    try {
      const response = await axios_instance.delete(`/bookmark/${id}`);
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message ||
            "Failed to delete bookmark. Please try again"
        );
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  return {
    bookmarkLoading,
    addBookmark,
    getBookmarks,
    deleteBookmark,
  };
};

export default useBookMark;
