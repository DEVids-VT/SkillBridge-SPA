import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { colors } from '@/lib/design-system';
import { IPaginationHeader } from '@/types/pagination/IPaginationHeader';

interface PaginationProps {
  pagination: IPaginationHeader;
  onPageChange: (page: number) => void;
}

export function ProjectsBoardPagination({ pagination, onPageChange }: PaginationProps) {
  const {
    CurrentPage: currentPage,
    PageSize: pageSize,
    TotalCount: totalCount,
    TotalPages: totalPages,
  } = pagination;

  const startItem = (currentPage - 1) * pageSize + 1;
  console.log('Start Item:', startItem);
  const endItem = Math.min(currentPage * pageSize, totalCount);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      {/* Results info */}
      <div className="text-sm" style={{ color: colors.textSecondary }}>
        Showing{' '}
        <span className="font-medium" style={{ color: colors.white }}>
          {startItem}-{endItem}
        </span>{' '}
        of{' '}
        <span className="font-medium" style={{ color: colors.white }}>
          {totalCount}
        </span>{' '}
        results
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:ml-1">Previous</span>
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  ...
                </span>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;

            return (
              <Button
                key={pageNumber}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
                className={`min-w-[2.5rem] ${
                  isActive ? 'border-0' : 'border-white/20 text-white hover:bg-white/10'
                }`}
                style={isActive ? { backgroundColor: colors.blue, color: colors.white } : undefined}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
        >
          <span className="sr-only sm:not-sr-only sm:mr-1">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default ProjectsBoardPagination;
