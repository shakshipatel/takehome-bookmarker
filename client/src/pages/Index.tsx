import React, { useEffect, useState } from "react";
import { BookmarkCard } from "../components/BookmarkCard";
import { AddBookmarkForm } from "../components/AddBookmarkForm";
import { Header } from "../components/Header";
import { Bookmark, Plus } from "lucide-react";
import useBookMark from "@/api/useBookMark";
import { useDispatch, useSelector } from "react-redux";
import { errorToast } from "@/lib/toast";
import { setBookmarks } from "@/store/reducers/bookmarkSlice";

// Mock data to demonstrate the interface
const mockBookmarks = [
  {
    id: "1",
    url: "https://react.dev",
    title: "React - The library for web and native user interfaces",
    summary:
      "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components.",
    favicon: "https://react.dev/favicon.ico",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    url: "https://tailwindcss.com",
    title: "Tailwind CSS - Rapidly build modern websites",
    summary:
      "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
    favicon: "https://tailwindcss.com/favicons/favicon-32x32.png",
    createdAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "3",
    url: "https://supabase.com",
    title: "Supabase | The Open Source Firebase Alternative",
    summary:
      "Build production-ready apps with an open-source backend-as-a-service. Get a dedicated Postgres database, Authentication, instant APIs, and more.",
    favicon: "https://supabase.com/favicon.ico",
    createdAt: "2024-01-13T09:20:00Z",
  },
];

const Index = () => {
  const APP_USER = useSelector((state) => state?.user?.user || null);
  const dispatch = useDispatch();
  const { getBookmarks, deleteBookmark } = useBookMark();
  const [bookmarkData, setBookmarkData] = useState(
    APP_USER ? [] : mockBookmarks
  );
  const bookmarks = useSelector(
    (state: any) => state?.bookmarks?.bookmarks || []
  );
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddBookmark = (url: string) => {
    // This will be connected to your backend API later

    setShowAddForm(false);
  };

  const deleteBookmark_ = (id: string) => {
    deleteBookmark(id, (res, err) => {
      if (err) {
        errorToast(
          err?.message || "Failed to delete bookmark. Please try again."
        );
        return;
      }
      fetchBookmarks();
    });
    fetchBookmarks();
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
      console.log(bookmarkData);
      setBookmarkData(res?.data);
    });
  };

  useEffect(() => {
    if (!APP_USER) {
      return;
    }
    fetchBookmarks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bookmark className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Link Saver</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Save your favorite links and get AI-powered summaries instantly.
            Never lose track of important content again.
          </p>
        </div>

        {/* Add Bookmark Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Bookmark
          </button>
        </div>

        {/* Add Bookmark Form */}
        {showAddForm && (
          <div className="mb-8">
            <AddBookmarkForm
              onSubmit={handleAddBookmark}
              onCancel={() => setShowAddForm(false)}
              setBookmarkData={setBookmarkData}
            />
          </div>
        )}

        {/* Bookmarks Grid */}
        {bookmarkData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkData?.map((bookmark) => {
              console.log(bookmark);
              return (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onDelete={deleteBookmark_}
                  fetchBookmarks={fetchBookmarks}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No bookmarks yet
            </h3>
            <p className="text-gray-500">
              Add your first bookmark to get started!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
