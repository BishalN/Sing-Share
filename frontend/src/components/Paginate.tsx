import { Box, Button, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { QueryClient } from 'react-query';

interface PaginateProps {
  pages: number;
  page: number;
  title: string;
  tags: string;
  changePage;
}

export const Paginate: React.FC<PaginateProps> = ({
  pages,
  page,
  title,
  tags,
  changePage,
  children,
}) => {
  return (
    pages > 1 && (
      <Box>
        {[...Array(pages).keys()].map((x) => (
          <Link key={x + 1}>
            {/* <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item> */}
            <Button
              mx='1'
              isActive={x + 1 === page}
              onClick={() => {
                changePage(x + 1);
              }}
            >
              {x + 1}
            </Button>
          </Link>
        ))}
      </Box>
    )
  );
};
