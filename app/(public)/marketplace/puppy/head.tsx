import { APP_URL } from "@/lib/constants";

export default function MarketplacePuppyHead() {
  return (
    <>
      <title>Puppy Listing | PetsPaw</title>
      <meta
        name="description"
        content="View a puppy listing from the PetsPaw marketplace."
      />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href={`${APP_URL}/marketplace`} />
    </>
  );
}
