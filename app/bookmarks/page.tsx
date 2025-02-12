// /pages.tsx
'use client';

import DashboardLayout from '@/app/dashboard/DashboardLayout';
import { comments } from '@/lib/data';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@heroui/react";
import React, { SVGProps } from 'react';

const page = () => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(comments.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return comments.slice(start, end);
  }, [page, comments]);

  return (
    <>
      <DashboardLayout title="Dashboard" description="Welcome to the Dashbaord">
        <h1 className="font-bold text-[20px]">All Bookmark</h1>
        <Table
          aria-label="All comments table with client side pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
                className="text-[14px]"
              />
            </div>
          }
          classNames={{
            wrapper: 'min-h-[222px]',
          }}
        >
          <TableHeader>
            <TableColumn className="text-left text-[12px]" key="id">
              ID
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="user_email">
              USER EMAIL
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="created_date">
              CREATED DATE
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="updated_date">
              UPDATED DATE
            </TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id} className="text-left text-[12px]">
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DashboardLayout>
    </>
  );
};

export default page;
