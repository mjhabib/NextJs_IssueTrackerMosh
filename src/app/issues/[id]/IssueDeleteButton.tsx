'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Spinner } from '../../components';

export default function IssueDeleteButton({ issueId }: { issueId: number }) {
  const router = useRouter();
  const [disableButton, setDisableButton] = useState(false);
  const [error, setError] = useState(false);

  async function deleteIssue() {
    try {
      setDisableButton(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setError(true);
    }
  }

  return (
    <>
      <Button color='red' onClick={deleteIssue} disabled={disableButton}>
        <CrossCircledIcon />
        Delete Issue
        {disableButton && <Spinner />}
      </Button>

      {/* If something goes wrong! */}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted!
          </AlertDialog.Description>
          <Button
            color='gray'
            variant='soft'
            mt='2'
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
    // <AlertDialog.Root>
    //   <AlertDialog.Trigger>
    //     <Button color='red'>Delete Issue</Button>
    //   </AlertDialog.Trigger>
    //   <AlertDialog.Content>
    //     <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
    //     <AlertDialog.Description>
    //       Are you sure you want to delete this issue? This action cannot be
    //       undone.
    //     </AlertDialog.Description>
    //     <Flex mt='4' gap='3'>
    //       <AlertDialog.Cancel>
    //         <Button variant='soft' color='gray'>
    //           Cancel
    //         </Button>
    //       </AlertDialog.Cancel>
    //       <AlertDialog.Action>
    //         <Button color='red'>Delete Issue</Button>
    //       </AlertDialog.Action>
    //     </Flex>
    //   </AlertDialog.Content>
    // </AlertDialog.Root>

    // For some unknown reason, the confirmation box above, does not show the delete button even the codes are exactly the same as documentations/teacher, that's why I deactivated this functionality!
  );
}
