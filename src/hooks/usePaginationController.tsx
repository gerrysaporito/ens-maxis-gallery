import { Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { PaginationController } from '@app/components/frame/PaginationController';

import { useIsMobile } from './useIsMobile';
import { useUpdateRouterQuery } from './useUpdateRouterQuery';

const pageLimits = [20, 40, 60, 80, 100];
export const usePaginationController = ({
  collectionSize,
}: {
  collectionSize: number;
}) => {
  const router = useRouter();
  const { query } = router;
  const { updateRouterQuery } = useUpdateRouterQuery();
  const { isMobile } = useIsMobile();

  const [pageNumber, setPageNumber] = useState(
    query.pageNumber && parseInt(query.pageNumber as string) > 0
      ? parseInt(query.pageNumber as string)
      : 1,
  );
  const [limitPerPage, setLimitPerPage] = useState(
    query.limit ? parseInt(query.limit as string) : pageLimits[0],
  );
  const [resultsSize, setResultsSize] = useState(collectionSize);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumber]);

  const onLimitPerPageChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e,
  ) => {
    const val = parseInt(e.target.value ?? '25');
    setLimitPerPage(parseInt(e.target.value) ?? 25);
    setPageNumber(1);
    updateRouterQuery({ limit: val.toString(), pageNumber: '1' });
  };

  const PageChangeSelector: React.FC = () => (
    <Select
      minW={isMobile ? '100px' : '125px'}
      defaultValue={limitPerPage}
      onChange={onLimitPerPageChange}
    >
      {pageLimits.map((limit) => (
        <option key={limit} value={limit}>
          {limit}
        </option>
      ))}
    </Select>
  );

  const PageController: React.FC<{ isDropdown?: boolean }> = ({
    isDropdown,
  }) => (
    <PaginationController
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      numPages={Math.ceil(resultsSize / limitPerPage)}
      isDropdown={isDropdown}
    />
  );

  return {
    limitPerPage,
    pageNumber,
    PageChangeSelector,
    PageController,
    setPageNumber,
    setResultsSize,
  };
};
