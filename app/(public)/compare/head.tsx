import { APP_URL } from "@/lib/constants";

export default function CompareHead() {
  return (
    <>
      <title>Compare Dog Breeds | PetsPaw</title>
      <meta
        name="description"
        content="Compare dog breeds side by side on PetsPaw to review traits, lifestyle fit, and temperament."
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={`${APP_URL}/compare`} />
    </>
  );
}
