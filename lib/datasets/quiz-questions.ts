import type { QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "livingSpace",
    questionText: "What is your living situation?",
    description: "This helps us find breeds that will be comfortable in your space.",
    trait: "apartmentSuitability",
    options: [
      { value: "apartment", label: "Apartment", description: "Studio or apartment with limited outdoor space", icon: "Building" },
      { value: "house-small", label: "Small House", description: "House with a small yard", icon: "Home" },
      { value: "house-large", label: "Large House", description: "House with a large yard or acreage", icon: "Castle" },
    ],
  },
  {
    id: "activityLevel",
    questionText: "How active is your daily lifestyle?",
    description: "Dogs thrive best when their energy levels match their owner's.",
    trait: "exerciseNeeds",
    options: [
      { value: "sedentary", label: "Sedentary", description: "Mostly indoors, light daily activity" },
      { value: "moderate", label: "Moderately Active", description: "Regular walks and some weekend activities" },
      { value: "active", label: "Active", description: "Daily exercise, hiking, running, or sports" },
      { value: "very-active", label: "Very Active", description: "Vigorous daily outdoor activity and adventures" },
    ],
  },
  {
    id: "experience",
    questionText: "What is your experience with dogs?",
    description: "Some breeds are better suited for experienced handlers.",
    trait: "firstTimeOwnerSuitability",
    options: [
      { value: "first-time", label: "First-Time Owner", description: "Never owned a dog before" },
      { value: "some", label: "Some Experience", description: "Grew up with dogs or helped care for one" },
      { value: "experienced", label: "Experienced", description: "Have owned and trained multiple dogs" },
    ],
  },
  {
    id: "familyKids",
    questionText: "Do you have children in your household?",
    description: "Family-friendliness varies significantly by breed.",
    trait: "familyFriendliness",
    options: [
      { value: "no-kids", label: "No Children" },
      { value: "older-kids", label: "Older Children (8+)" },
      { value: "young-kids", label: "Young Children (under 8)" },
      { value: "toddlers", label: "Toddlers or Babies" },
    ],
  },
  {
    id: "timeAvailable",
    questionText: "How much daily time can you dedicate to your dog?",
    description: "Include walks, training, play, and grooming time.",
    trait: "exerciseNeeds",
    options: [
      { value: "minimal", label: "Under 1 Hour", description: "Busy schedule with limited free time" },
      { value: "moderate", label: "1-2 Hours", description: "Can commit to regular daily care" },
      { value: "plenty", label: "2-3 Hours", description: "Flexible schedule with good availability" },
      { value: "extensive", label: "3+ Hours", description: "Lots of free time for your dog" },
    ],
  },
  {
    id: "groomingTolerance",
    questionText: "How much grooming are you willing to do?",
    description: "Some breeds need daily brushing, while others are low-maintenance.",
    trait: "groomingNeeds",
    options: [
      { value: "minimal", label: "Minimal", description: "Quick weekly brush at most" },
      { value: "moderate", label: "Moderate", description: "A few brushing sessions per week" },
      { value: "extensive", label: "Extensive", description: "Happy to do daily grooming and regular professional grooming" },
    ],
  },
  {
    id: "climate",
    questionText: "What climate do you live in?",
    description: "Some breeds are better suited to certain temperatures.",
    trait: "climateSuitability",
    options: [
      { value: "cold", label: "Cold", description: "Snowy winters, cool summers" },
      { value: "temperate", label: "Temperate", description: "Mild year-round with seasonal changes" },
      { value: "hot", label: "Hot", description: "Warm to hot most of the year" },
    ],
  },
  {
    id: "budget",
    questionText: "What is your monthly budget for dog care?",
    description: "Includes food, grooming, health care, and supplies.",
    trait: "estimatedMonthlyCost",
    options: [
      { value: "low", label: "Under $100", description: "Budget-conscious care" },
      { value: "moderate", label: "$100-$150", description: "Moderate spending" },
      { value: "comfortable", label: "$150-$200", description: "Comfortable budget" },
      { value: "flexible", label: "$200+", description: "Flexible budget for premium care" },
    ],
  },
  {
    id: "sizePreference",
    questionText: "What size dog do you prefer?",
    description: "Size affects space requirements, food costs, and exercise needs.",
    trait: "sizeCategory",
    options: [
      { value: "small", label: "Small", description: "Under 25 pounds" },
      { value: "medium", label: "Medium", description: "25-60 pounds" },
      { value: "large", label: "Large", description: "60-100 pounds" },
      { value: "giant", label: "Giant", description: "Over 100 pounds" },
      { value: "no-preference", label: "No Preference" },
    ],
  },
  {
    id: "barkingTolerance",
    questionText: "How much barking can you tolerate?",
    description: "Important for apartment living and close neighbors.",
    trait: "barkingTendency",
    options: [
      { value: "quiet", label: "Prefer Quiet", description: "Minimal barking or vocalizing" },
      { value: "some", label: "Some Barking is Fine", description: "Alerts and occasional barking" },
      { value: "doesnt-matter", label: "Doesn't Matter", description: "Barking doesn't bother me" },
    ],
  },
  {
    id: "trainabilityPreference",
    questionText: "How important is ease of training to you?",
    description: "Highly trainable breeds pick up commands quickly but may need more mental stimulation.",
    trait: "trainability",
    options: [
      { value: "very-important", label: "Very Important", description: "I want a dog that learns quickly" },
      { value: "somewhat", label: "Somewhat Important", description: "Willing to be patient with training" },
      { value: "not-important", label: "Not a Priority", description: "I'm okay with an independent thinker" },
    ],
  },
  {
    id: "sheddingTolerance",
    questionText: "How much shedding can you handle?",
    description: "Shedding levels vary dramatically between breeds.",
    trait: "sheddingLevel",
    options: [
      { value: "none", label: "Minimal Shedding", description: "Prefer hypoallergenic or low-shed breeds" },
      { value: "some", label: "Moderate Shedding", description: "Can handle regular vacuuming" },
      { value: "lots", label: "Heavy Shedding is Fine", description: "Fur everywhere doesn't bother me" },
    ],
  },
  {
    id: "guardDog",
    questionText: "Do you want a dog with protective instincts?",
    description: "Some breeds are naturally more watchful and protective.",
    trait: "guardDog",
    options: [
      { value: "yes", label: "Yes", description: "I value a dog that is alert and protective" },
      { value: "somewhat", label: "Somewhat", description: "Alert but not aggressive" },
      { value: "no", label: "Not Important", description: "I prefer a friendly, non-confrontational dog" },
    ],
  },
  {
    id: "companionDog",
    questionText: "How important is affection and companionship?",
    description: "Some breeds are more independent, while others crave constant attention.",
    trait: "companionDog",
    options: [
      { value: "velcro", label: "Very Affectionate", description: "I want a shadow that follows me everywhere" },
      { value: "balanced", label: "Balanced", description: "Affectionate but also independent at times" },
      { value: "independent", label: "Independent", description: "I prefer a dog that's content on their own" },
    ],
  },
];
