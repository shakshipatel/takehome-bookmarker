import { axios_instance } from "@/lib/axios";
import { errorToast } from "@/lib/toast";

import { useState } from "react";

const useSummary = () => {
  const [summaryLoading, setSummaryLoading] = useState(false);

  const generateSummary = async (id: string, callback: Function) => {
    setSummaryLoading(true);
    try {
      const response = await axios_instance.get(`/summary/${id}`);
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message ||
            "Failed to generate summary. Please try again"
        );
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error);
    } finally {
      setSummaryLoading(false);
    }
  };

  return {
    summaryLoading,
    generateSummary,
  };
};

export default useSummary;
