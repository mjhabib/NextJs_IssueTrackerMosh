import prisma from '@root/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetails from './IssueDetails';
import IssueDetailsButton from './IssueDetailsButton';
import IssueDeleteButton from './IssueDeleteButton';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

export default async function IssueDetailPage({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) {
    notFound();
    // return is not required because the return type of this function is 'never'
  }

  // await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
        {/* Single Responsibility Principle */}
      </Box>
      <Box>
        <Flex direction='column' gap='4'>
          <AssigneeSelect issue={issue} />
          <IssueDetailsButton issueId={issue.id} />
          <IssueDeleteButton issueId={issue.id} />
          {/* Single Responsibility Principle */}
        </Flex>
      </Box>
    </Grid>
  );
}

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  };
}
