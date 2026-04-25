import { APP_URL } from "@/lib/constants";

export default function QuizResultsHead() {
  return (
    <>
      <title>Breed Quiz Results | PetsPaw</title>
      <meta
        name="description"
        content="Review your personalized dog breed quiz results from PetsPaw."
      />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href={`${APP_URL}/quiz`} />
    </>
  );
}
