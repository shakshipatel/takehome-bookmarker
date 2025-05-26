import type BookmarkDao from "../dao/bookmark.dao";
import type SummaryDao from "../dao/summary.dao";

export default class SummaryService {
  private summaryDao: SummaryDao;
  private bookmarkDao: BookmarkDao;

  constructor(_summaryDao: SummaryDao, _bookmarkDao: BookmarkDao) {
    this.summaryDao = _summaryDao;
    this.bookmarkDao = _bookmarkDao;
  }

  createSummary = async (bookmarkId: string) => {
    try {
      const bookmark = await this.bookmarkDao.getBookmarkById(bookmarkId);
      if (!bookmark) {
        throw new Error("Bookmark not found");
      }
      const target = encodeURIComponent(
        bookmark.url.replace(/https?:\/\//, "")
      );

      const res = await fetch(`https://r.jina.ai/http://${target}`); 
      const _summary = await res.text();

      const summary = await this.summaryDao.createSummary({
        bookmarkId: bookmark.id,
        content: _summary.substring(0, 1000) + "...",
      });

      return summary;
    } catch (error: any) {
      throw new Error(`Error creating summary: ${error?.message}`);
    }
  };
}