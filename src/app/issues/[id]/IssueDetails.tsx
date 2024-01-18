import { Heading, Flex, Card, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import { IssueStatusBadges } from '../../components';
import { Issue } from '@prisma/client';

export default function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap='3' my='2'>
        <IssueStatusBadges status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose max-w-full' mt='4'>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}
