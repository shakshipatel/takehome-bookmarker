import type BookmarkDao from "../dao/bookmark.dao";

export default class BookmarkService {
  private bookmarkDao: BookmarkDao;

  constructor(_bookmarkDao: BookmarkDao) {
    this.bookmarkDao = _bookmarkDao;
  }

  createBookmark = async (bookmarkData: {
    userId: string;
    url: string;
  }) => {
    try {
      // get page title without domparser
      const response = await fetch(bookmarkData.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch the page: ${response.statusText}`);
      }
      const text = await response.text();
      const titleMatch = text.match(/<title>(.*?)<\/title>/);
      const title = titleMatch?.[1] || "No Title Found";
      
      const favicon = `https://www.google.com/s2/favicons?domain=${new URL(bookmarkData.url)}`;
      const bookmark = await this.bookmarkDao.createBookmark({...bookmarkData, favicon, title});
      return bookmark;
    } catch (error: any) {
      throw new Error(`Error creating bookmark: ${error?.message}`);
    }
  };

  getBookmarksByUserId = async (userId: string) => {
    try {
      const bookmarks = await this.bookmarkDao.getBookmarksByUserId(userId);
      return bookmarks;
    } catch (error: any) {
      throw new Error(`Error fetching bookmarks by user ID: ${error?.message}`);
    }
  };

  getBookmarkById = async (id: string) => {
    try {
      const bookmark = await this.bookmarkDao.getBookmarkById(id);
      return bookmark;
    } catch (error: any) {
      throw new Error(`Error fetching bookmark by ID: ${error?.message}`);
    }
  };

  deleteBookmark = async (id: string) => {
    try {
      const bookmark = await this.bookmarkDao.deleteBookmark(id);
      return bookmark;
    } catch (error: any) {
      throw new Error(`Error deleting bookmark: ${error?.message}`);
    }
  };
}