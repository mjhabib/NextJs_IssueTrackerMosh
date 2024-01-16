'use client';

import { Button, Callout, TextField, Text } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '../../validationSchemas';
import { TypeOf, z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('An unexpected error occurred!');
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder='title' {...register('title')} />
        </TextField.Root>
        {errors.title && (
          <Text color='red' as='p'>
            {errors.title.message}
          </Text>
        )}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='description' {...field} />
          )}
        />
        {errors.description && (
          <Text color='red' as='p'>
            {errors.description.message}
          </Text>
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}
