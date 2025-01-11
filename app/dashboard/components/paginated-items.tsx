import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginatedItemsProps = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

function PaginatedItems({
  currentPage,
  totalPages,
  onPageChange,
}: PaginatedItemsProps) {
  const getDisplayedPages = () => {
    if (totalPages <= 5) {
      // Show all pages if there are 5 or fewer
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      // Show the first 3 pages and ellipsis for larger numbers
      return [1, 2, 3, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      // Show the last 3 pages and ellipsis for smaller numbers
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    // Show current page, one page before and after, and ellipsis on both sides
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const displayedPages = getDisplayedPages();

  return (
    <div className='self-stretch lg:justify-end  '>
      <Pagination>
        <PaginationContent>
          {/* Show Previous button only if not on the first page */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}

          {/* Render page numbers */}
          {displayedPages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Show Next button only if not on the last page */}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PaginatedItems;
