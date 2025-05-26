import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Link, Loader2, X } from "lucide-react";

import useBookMark from "@/api/useBookMark";

import { setBookmarks } from "@/store/reducers/bookmarkSlice";

import { errorToast } from "@/lib/toast";

interface AddBookmarkFormProps {
  onSubmit: (url: string) => void;
  onCancel: () => void;
  setBookmarkData: React.Dispatch<React.SetStateAction<any[]>>;
}

export const AddBookmarkForm: React.FC<AddBookmarkFormProps> = ({
  onSubmit,
  onCancel,
  setBookmarkData,
}) => {
  const dispatch = useDispatch();
  const { addBookmark, bookmarkLoading, getBookmarks } = useBookMark();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const fetchBookmarks = async () => {
    getBookmarks((res, err) => {
      if (err) {
        errorToast(
          err?.message || "Failed to fetch bookmarks. Please try again."
        );
        return;
      }
      dispatch(setBookmarks(res?.data));
      setBookmarkData(res?.data);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookmarkLoading) return;

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setError("");

    try {
      addBookmark({ url: url }, (res, err) => {
        if (err) {
          errorToast(
            err?.message || "Failed to save bookmark. Please try again."
          );
          return;
        }
        fetchBookmarks();
      });
      setUrl("");
    } catch (err) {
      setError("Failed to save bookmark. Please try again.");
    } finally {
      console.log("Bookmark submission completed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Bookmark
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Website URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              disabled={bookmarkLoading}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              disabled={bookmarkLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={bookmarkLoading || !url.trim()}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {bookmarkLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Save Bookmark"
              )}
            </button>
          </div>
        </form>

        {bookmarkLoading && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              🤖 Fetching page content and generating AI summary...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
