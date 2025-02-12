// pages/index.tsx
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
        <h1 className="font-bold text-[20px]">All Posts</h1>
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
              POST ID
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="title">
              TITLE
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="blocks">
              BLOCKS
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="version">
              VERSION
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="author">
              AUTHOR
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="description">
              DESCRIPTIONS
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="keywords">
              KEYWORDS
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="type">
              TYPE
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="post_url">
              POST URL
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="post_image_url">
              POST IMAGE URL
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="tags">
              TAGS
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="card">
              CARD
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="time">
              TIME
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="view_count">
              VIEW COUNT
            </TableColumn>
            <TableColumn className="text-left text-[12px]" key="read_duration">
              READ DURATION
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
