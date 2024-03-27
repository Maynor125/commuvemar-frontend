// components/Pagination.tsx
import { useEffect } from 'react';
import { Pagination as MuiPagination, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

interface PaginationProps {
  fichasPerPage: number;
  totalFichas: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ fichasPerPage, totalFichas, paginate }: PaginationProps) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [fichasPerPage]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalFichas / fichasPerPage); i++) {
    pageNumbers.push(i);
  }

  const changePage = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
    paginate(pageNumber);
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 2rem', flexWrap: 'wrap' }}>
      <Typography sx={{ flex: '0 1 auto', margin: '0 1rem 0.5rem 0' }}>
        {`${(currentPage - 1) * fichasPerPage + 1} - ${Math.min(currentPage * fichasPerPage, totalFichas)} of ${totalFichas}`}
      </Typography>
      <MuiPagination
        color="primary"
        count={pageNumbers.length}
        page={currentPage}
        onChange={changePage}
        size="medium"
        shape="circular"
        sx={{
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
          marginBottom:'1rem',
        }}
      />
    </div>
  );
};


export default Pagination;