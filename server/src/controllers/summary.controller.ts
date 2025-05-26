import type SummaryService from "../services/summary.service";
import { InternalServerErrorResponse, SuccessResponse } from "../utils/responses";

export default class SummaryController {
  private summaryService: SummaryService;

  constructor(_summaryService: SummaryService) {
    this.summaryService = _summaryService;
  }

  createSummary = async (req: any, res: any) => {
    try {
      const bookmarkId = req.params.id;
      const summary = await this.summaryService.createSummary(bookmarkId);
      SuccessResponse.send(res, summary, "Summary created successfully");
    } catch (error: any) {
      InternalServerErrorResponse.send(res, error.message);
    }
  };
}