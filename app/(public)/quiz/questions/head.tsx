import { APP_URL } from "@/lib/constants";

export default function QuizQuestionsHead() {
  return (
    <>
      <title>Breed Quiz Questions | PetsPaw</title>
      <meta
        name="description"
        content="Answer PetsPaw's dog breed quiz questions to find a breed match for your lifestyle."
      />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href={`${APP_URL}/quiz`} />
    </>
  );
}
