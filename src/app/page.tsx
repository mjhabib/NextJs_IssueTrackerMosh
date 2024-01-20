import Pagination from './components/Pagination';

export default function HomePage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </div>
  );
}
