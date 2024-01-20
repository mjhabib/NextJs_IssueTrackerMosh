import { NextRequest, NextResponse } from 'next/server';
import { patchIssueSchema } from '@app/validationSchemas';
import prisma from '@root/prisma/client';

interface Props {
  params: { id: string };
}

// Update an issue
export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format());
  }

  // assign issues to users
  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: 'Invalid User' });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid Issue!' });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
      assignedToUserId: body.assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

// Delete an issue
export async function DELETE(request: NextRequest, { params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid Issue' });
  }

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({ message: 'The Issue was deleted' });
}
