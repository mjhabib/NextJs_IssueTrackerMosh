import prisma from '@root/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('@app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

export default async function EditIssuePage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
