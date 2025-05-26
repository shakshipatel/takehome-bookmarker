import type { PrismaClient } from "../generated/prisma";

export default class BookmarkDao {
  private _prisma: PrismaClient;

  constructor(_prisma: PrismaClient) {
    this._prisma = _prisma;
  }

  createBookmark = async (bookmarkData: {
    userId: string;
    url: string;
    title: string;
    favicon: string;
  }) => {
    try {
      const bookmark = await this._prisma.bookmark.create({
        data: bookmarkData,
      });
      return bookmark;
    } catch (error: any) {
      throw new Error(`Error creating bookmark: ${error?.message}`);
    }
  };

  getBookmarksByUserId = async (userId: string) => {
    try {
      const bookmarks = await this._prisma.bookmark.findMany({
        where: { userId },
        include: {
          Summary: true
        }
      });
      return bookmarks;
    } catch (error: any) {
      throw new Error(`Error fetching bookmarks by user ID: ${error?.message}`);
    }
  };

  getBookmarkById = async (id: string) => {
    try {
      const bookmark = await this._prisma.bookmark.findUnique({
        where: { id },
        include: {
          Summary: true
        }
      });
      return bookmark;
    } catch (error: any) {
      throw new Error(`Error fetching bookmark by ID: ${error?.message}`);
    }
  }

  deleteBookmark = async (id: string) => {
    try {
      const bookmark = await this._prisma.bookmark.delete({
        where: { id },
      });
      return bookmark;
    } catch (error: any) {
      throw new Error(`Error deleting bookmark: ${error?.message}`);
    }
  }
}