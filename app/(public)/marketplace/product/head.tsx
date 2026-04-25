import { APP_URL } from "@/lib/constants";

export default function MarketplaceProductHead() {
  return (
    <>
      <title>Marketplace Product | PetsPaw</title>
      <meta
        name="description"
        content="View a marketplace pet product listing on PetsPaw."
      />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href={`${APP_URL}/marketplace`} />
    </>
  );
}
