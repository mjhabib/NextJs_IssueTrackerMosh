import { Button } from '@radix-ui/themes';

export default function IssueDeleteButton({ issueId }: { issueId: number }) {
  return (
    <div>
      <Button color='red'>Delete Issue</Button>
    </div>
  );
}
