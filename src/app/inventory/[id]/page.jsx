import inventoryClient from "@/components/inventory/inventoryClient";
export default async function InventoryDetail({ params }) {
  const { id } = await params;
  return <inventoryClient id={id} />;
}
