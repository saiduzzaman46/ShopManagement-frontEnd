import { use } from "react";

export default function UpdaeProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <>
      <h1>Update Product Page</h1>
      <p>This is the update page for product ID: {id}</p>
    </>
  );
}
