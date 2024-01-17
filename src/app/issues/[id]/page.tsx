import prisma from '@/root/prisma/client';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
  if (typeof params.id !== 'number') notFound();
  // to prevent crashing the app in case of user type any path besides type int into the address bar, because the 'parseInt' function below can't parse other params like string

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
    // return is not required because the return type of this function is 'never'
  }

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.status}</p>
      <p>{issue.description}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
}
