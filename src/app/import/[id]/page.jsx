import ImportDetailClientPage from "@/components/import/detail/importDetailClientPage";

export default async function InventoryDetailPage({ params }) {
  const { id } = await params;
  return (
    <>
      <ImportDetailClientPage id={id} />
    </>
  );
}
