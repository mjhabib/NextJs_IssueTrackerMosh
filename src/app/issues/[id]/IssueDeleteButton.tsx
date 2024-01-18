// 'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';

export default function IssueDeleteButton({ issueId }: { issueId: number }) {
  return (
    <Button color='red'>Delete Issue</Button>
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
