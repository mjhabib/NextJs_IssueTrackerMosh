import prisma from '@root/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '@src/app/validationSchemas';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validate = issueSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.format());
  }

  // const checkIssue = await prisma.issue.findUnique({
  //   where: { title: body.title },
  // });

  // if (checkIssue) {
  //   return NextResponse.json({
  //     error:
  //       'An issue with this exact title exists. Check other issues or change your title to something else!',
  //   });
  // }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue);
}
