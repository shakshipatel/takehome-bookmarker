import type BookmarkService from "../services/bookmark.service";
import { BadRequestResponse, InternalServerErrorResponse, SuccessResponse } from "../utils/responses";

export default class BookmarkController {
  private bookmarkService: BookmarkService

  constructor(_bookmarkService: BookmarkService) {
    this.bookmarkService = _bookmarkService;  
  };

  createBookmark = async (req: any, res: any) => {
    try {
      const bookmarkData = req.body;
      const { id: userId } = req.user;
      if (!userId || !bookmarkData.url) {
        return BadRequestResponse.send(res, "All fields are required");
      }

      const bookmark = await this.bookmarkService.createBookmark({ userId, url: bookmarkData.url });
      return SuccessResponse.send(res, bookmark, "Bookmark created successfully");
    } catch (error: any) {
      return InternalServerErrorResponse.send(res, error.message);
    }
  };

  getBookmarksByUserId = async (req: any, res: any) => {
    try {
      const userId = req.user.id;
      if (!userId) {
        return BadRequestResponse.send(res, "User ID is required");
      }

      const bookmarks = await this.bookmarkService.getBookmarksByUserId(userId);
      return SuccessResponse.send(res, bookmarks, "Bookmarks fetched successfully");
    } catch (error: any) {
      return InternalServerErrorResponse.send(res, error.message);
    }
  };

  getBookmarkById = async (req: any, res: any) => {
    try {
      const id = req.params.id;
      if (!id) {
        return BadRequestResponse.send(res, "Bookmark ID is required");
      }

      const bookmark = await this.bookmarkService.getBookmarkById(id);
      if (!bookmark) {
        return BadRequestResponse.send(res, "Bookmark not found");
      }
      return SuccessResponse.send(res, bookmark, "Bookmark fetched successfully");
    } catch (error: any) {
      return InternalServerErrorResponse.send(res, error.message);
    }
  };

  deleteBookmark = async (req: any, res: any) => {
    try {
      const id = req.params.id;
      if (!id) {
        return BadRequestResponse.send(res, "Bookmark ID is required");
      }
      const bookmark = await this.bookmarkService.deleteBookmark(id);
      if (!bookmark) {
        return BadRequestResponse.send(res, "Bookmark not found");
      }
      return SuccessResponse.send(res, bookmark, "Bookmark deleted successfully");
    } catch (error: any) {
      return InternalServerErrorResponse.send(res, error.message);
    }
  };
}