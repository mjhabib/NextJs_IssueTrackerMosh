import prisma from '@/root/prisma/client';
import { CustomLink, IssueStatusBadges } from '@/src/app/components';
import { Table } from '@radix-ui/themes';
import IssueActions from './IssueActions';

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <CustomLink href={`/issues/${issue.id}`}>
                  {issue.title}
                </CustomLink>
                <div className='block md:hidden'>
                  <IssueStatusBadges status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadges status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
