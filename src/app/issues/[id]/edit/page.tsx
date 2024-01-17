import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';
import prisma from '@/root/prisma/client';

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
