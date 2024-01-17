import prisma from '@/root/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetails from './IssueDetails';
import IssueDetailsButton from './IssueDetailsButton';

interface Props {
  params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
    // return is not required because the return type of this function is 'never'
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Box>
        <IssueDetails issue={issue} />
        {/* Single Responsibility Principle */}
      </Box>
      <Box>
        <IssueDetailsButton issueId={issue.id} />
        {/* Single Responsibility Principle */}
      </Box>
    </Grid>
  );
}
