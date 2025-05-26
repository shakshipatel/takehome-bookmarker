
import React from 'react';
import { ExternalLink, Trash2, Calendar } from 'lucide-react';
import useSummary from '@/api/useSummary';
import { errorToast, infoToast, successToast } from '@/lib/toast';

interface Bookmark {
  id: string;
  url: string;
  title: string;
  Summary: {
    content: string;
  }
  favicon?: string;
  createdAt: string;
}

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
  fetchBookmarks: () => void;
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark, onDelete, fetchBookmarks }) => {
  const { generateSummary, summaryLoading } = useSummary();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const summaryClick = (bookmarkId: string) => {
    if (summaryLoading) return;

    infoToast('Generating summary...');

    generateSummary(bookmarkId, (res, err) => {
      if (err) {
        errorToast(err?.message || 'Failed to generate summary. Please try again.');
        return;
      }
      fetchBookmarks();
    });
  }

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group overflow-hidden h-fit">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {bookmark.favicon && (
              <img
                src={bookmark.favicon}
                alt=""
                className="w-6 h-6 rounded flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                {bookmark.title}
              </h3>
              <p className="text-sm text-gray-500 truncate">{getDomain(bookmark.url)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => onDelete(bookmark.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {bookmark?.Summary?.content}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(bookmark.createdAt)}
          </div>
          {/* <span className="text-gray-300">•</span> */}
          {!bookmark?.Summary && <span onClick={() => summaryClick(bookmark.id)} className=' cursor-pointer'>AI Summary</span>}
        </div>
      </div>
    </div>
  );
};
