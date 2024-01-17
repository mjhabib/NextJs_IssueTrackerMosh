// Note: We created this _component folder inside the issues folder, because the only place we're gonna use it is here. Also the name '_components' is gonna exclude this route from our routing system even if we create a page file inside it.

'use client';

import ErrorMessage from '@/src/app/components/ErrorMessage';
import Spinner from '@/src/app/components/Spinner';
import SimpleMDE from 'react-simplemde-editor';
import { issueSchema } from '@/src/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Issue } from '@prisma/client';

type IssueFormData = z.infer<typeof issueSchema>;

// this optional issue is passed from our PATCH api
interface Props {
  issue?: Issue;
}

export default function IssueForm({ issue }: Props) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      // PATCH an issue
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        // POST an issue
        await axios.post('/api/issues', data);
        router.push('/issues');
      }
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred!');
    }
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder='title'
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
