import type { PrismaClient } from "../generated/prisma";

export default class SummaryDao {
  private _prisma: PrismaClient;

  constructor(_prisma: PrismaClient) {
    this._prisma = _prisma;
  }

  createSummary = async (summaryData: {
    bookmarkId: string,
    content: string,
  }) => {
    try {
      const summary = await this._prisma.summary.create({
        data: summaryData,
      });
      return summary;
    } catch (error: any) {
      throw new Error(`Error creating summary: ${error?.message}`);
    }
  }
}