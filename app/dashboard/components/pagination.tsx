"use client";

import { Input } from "@/components/ui/input";
import PaginatedItems from "./paginated-items";

type PaginationProps = {
  itemsPerPage: number;
  handleItemsPerPage: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
};

const Pagination = ({
  itemsPerPage,
  handleItemsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='w-full   flex flex-col lg:flex-row space-y-4 lg:justify-between items-center  my-6 lg:py-10  lg:px-10'>
      <div className='self-stretch justify-center  flex items-center gap-x-2'>
        <p className='block text-nowrap'>Items per page: </p>
        <Input
          type='number'
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPage(e.target.value)}
          className='max-w-20 bg-topBackground border-[1px] border-border dark:border-borderF'
        />
      </div>
      <PaginatedItems
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Pagination;
