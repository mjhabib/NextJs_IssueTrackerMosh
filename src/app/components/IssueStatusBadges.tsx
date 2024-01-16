import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRES: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
};

export default function IssueStatusBadges({ status }: { status: Status }) {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
}
