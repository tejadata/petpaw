import type { HomemadeFoodArticle } from "@/types/homemade-food";

export const homemadeFoodArticles: HomemadeFoodArticle[] = [
  {
    id: "hfa-1",
    title: "Veg Puppy Bowl: Gentle Growth Starter",
    slug: "veg-puppy-growth-starter",
    dietType: "Veg",
    ageGroup: "Puppy",
    excerpt:
      "A soft, digestible vegetarian starter meal for puppies with balanced carbs, protein support, and hydration.",
    ingredients: [
      { name: "Cooked sweet potato", grams: 80, notes: "mashed" },
      { name: "Cooked white rice", grams: 70 },
      { name: "Pumpkin puree", grams: 40 },
      { name: "Cooked moong dal", grams: 25, notes: "well-cooked, small amount" },
      { name: "Steamed carrot", grams: 20, notes: "mashed" },
      { name: "Plain yogurt", grams: 10, notes: "optional, only if tolerated" },
      { name: "Warm water", grams: 40, notes: "to soften texture" },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 285,
      caloriesKcal: 240,
      proteinGrams: 7.5,
      fatGrams: 2.2,
      carbsGrams: 46,
      fiberGrams: 5.8,
      moistureGrams: 110,
    },
    prepNotes: [
      "Mash everything well for a soft puppy-friendly texture.",
      "Serve lukewarm, not hot.",
      "Introduce gradually over 5 to 7 days.",
    ],
    content: `## Who This Is For

Best for puppies transitioning to home-cooked meals under veterinary guidance.

## Ingredient Weights

- Cooked mashed sweet potato — 80 g
- Well-cooked white rice — 70 g
- Pumpkin puree — 40 g
- Well-cooked moong dal — 25 g
- Steamed mashed carrot — 20 g
- Plain yogurt — 10 g
- Warm water — 40 g

## Estimated Nutrition Per Serving

- Calories: ~240 kcal
- Protein: ~7.5 g
- Fat: ~2.2 g
- Carbohydrates: ~46 g
- Fiber: ~5.8 g

## Sample Bowl

Combine sweet potato, rice, pumpkin, and carrot into a soft mash. Add a small amount of moong dal and warm water to loosen the texture. Add yogurt only if your puppy tolerates dairy well.

## Portion Notes

Feed smaller portions 3 to 4 times daily. Increase gradually as tolerated.

## Important Reminder

Puppies need precise calcium, phosphorus, amino acid, and trace mineral balance. This is only a starter-style recipe idea and should not be used as a complete long-term puppy diet without veterinary formulation.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-01"),
    featured: true,
  },
  {
    id: "hfa-2",
    title: "Veg Adult Bowl: Daily Balanced Plate",
    slug: "veg-adult-balanced-plate",
    dietType: "Veg",
    ageGroup: "Middle Age",
    excerpt:
      "A practical vegetarian meal structure for adult dogs focusing on steady energy and digestive comfort.",
    ingredients: [
      { name: "Cooked brown rice", grams: 100 },
      { name: "Cooked lentils", grams: 60 },
      { name: "Steamed green beans", grams: 35 },
      { name: "Steamed carrots", grams: 30 },
      { name: "Cooked peas", grams: 25 },
      { name: "Pumpkin puree", grams: 30 },
      { name: "Plain curd/yogurt", grams: 20, notes: "optional if tolerated" },
      { name: "Warm water", grams: 30 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 330,
      caloriesKcal: 285,
      proteinGrams: 11.2,
      fatGrams: 2.8,
      carbsGrams: 54,
      fiberGrams: 9.4,
      moistureGrams: 125,
    },
    prepNotes: [
      "Mix thoroughly so the lentils and vegetables are evenly distributed.",
      "Use unseasoned ingredients only.",
      "Portion by body weight and activity level.",
    ],
    content: `## Who This Is For

Adult dogs with moderate activity and stable weight goals.

## Ingredient Weights

- Cooked brown rice — 100 g
- Well-cooked lentils — 60 g
- Steamed green beans — 35 g
- Steamed carrots — 30 g
- Cooked peas — 25 g
- Pumpkin puree — 30 g
- Plain curd/yogurt — 20 g
- Warm water — 30 g

## Estimated Nutrition Per Serving

- Calories: ~285 kcal
- Protein: ~11.2 g
- Fat: ~2.8 g
- Carbohydrates: ~54 g
- Fiber: ~9.4 g

## Sample Bowl

Mix rice, lentils, pumpkin, and vegetables into a moist bowl. Add yogurt only if tolerated well.

## Portion Notes

Feed twice daily and monitor stool quality, appetite, and body condition score.

## Important Reminder

Long-term vegetarian feeding needs veterinary formulation and supplementation to avoid nutrient gaps, especially in essential amino acids, calcium, vitamin B12, and trace minerals.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-02"),
    featured: true,
  },
  {
    id: "hfa-3",
    title: "Veg Senior Bowl: Soft Joint-Friendly Meal",
    slug: "veg-senior-soft-joint-friendly-meal",
    dietType: "Veg",
    ageGroup: "Senior",
    excerpt:
      "A softer vegetarian option for senior dogs with easy digestion and gentle calorie control.",
    ingredients: [
      { name: "Soft cooked oats", grams: 90 },
      { name: "Pumpkin puree", grams: 50 },
      { name: "Boiled bottle gourd", grams: 50, notes: "mashed" },
      { name: "Cooked moong dal", grams: 35 },
      { name: "Mashed carrot", grams: 20 },
      { name: "Mashed green beans", grams: 20 },
      { name: "Warm water", grams: 35 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 300,
      caloriesKcal: 210,
      proteinGrams: 7.8,
      fatGrams: 1.9,
      carbsGrams: 40,
      fiberGrams: 6.9,
      moistureGrams: 135,
    },
    prepNotes: [
      "Mash well for easy chewing.",
      "Useful for dogs preferring soft textures.",
      "Adjust calories if activity level has dropped.",
    ],
    content: `## Who This Is For

Senior dogs needing easier-to-chew textures and mild digestion support.

## Ingredient Weights

- Soft cooked oats — 90 g
- Pumpkin puree — 50 g
- Boiled bottle gourd — 50 g
- Well-cooked moong dal — 35 g
- Mashed carrot — 20 g
- Mashed green beans — 20 g
- Warm water — 35 g

## Estimated Nutrition Per Serving

- Calories: ~210 kcal
- Protein: ~7.8 g
- Fat: ~1.9 g
- Carbohydrates: ~40 g
- Fiber: ~6.9 g

## Sample Bowl

Serve a moist mash using oats, vegetables, and a small dal portion. Keep all seasoning out.

## Portion Notes

Use smaller portions and adjust calories if activity has reduced.

## Important Reminder

Seniors may need protein and mineral adjustments depending on kidney, liver, dental, or endocrine health. Vet review is essential before long-term use.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-03"),
    featured: false,
  },
  {
    id: "hfa-4",
    title: "Non-Veg Puppy Bowl: Chicken Rice Starter",
    slug: "non-veg-puppy-chicken-rice-starter",
    dietType: "Non-Veg",
    ageGroup: "Puppy",
    excerpt:
      "A beginner-friendly non-veg puppy meal with soft texture and digestible ingredients.",
    ingredients: [
      { name: "Boiled shredded chicken breast", grams: 55 },
      { name: "Cooked white rice", grams: 90 },
      { name: "Pumpkin puree", grams: 35 },
      { name: "Steamed carrot", grams: 20, notes: "mashed" },
      { name: "Warm water", grams: 40 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 240,
      caloriesKcal: 255,
      proteinGrams: 16.5,
      fatGrams: 2.9,
      carbsGrams: 37,
      fiberGrams: 2.7,
      moistureGrams: 95,
    },
    prepNotes: [
      "Shred chicken finely for easier chewing.",
      "Mix until soft and moist.",
      "Transition gradually over several days.",
    ],
    content: `## Who This Is For

Puppies starting controlled home-cooked non-veg meals.

## Ingredient Weights

- Boiled shredded chicken (boneless, skinless) — 55 g
- Plain cooked rice — 90 g
- Pumpkin puree — 35 g
- Steamed carrot — 20 g
- Warm water — 40 g

## Estimated Nutrition Per Serving

- Calories: ~255 kcal
- Protein: ~16.5 g
- Fat: ~2.9 g
- Carbohydrates: ~37 g
- Fiber: ~2.7 g

## Sample Bowl

Use mostly rice and pumpkin with a smaller amount of shredded chicken for easy digestion. Add warm water for softness.

## Portion Notes

Feed 3 to 4 times daily in small portions and transition gradually over 5 to 7 days.

## Important Reminder

Never use bones, oils, onions, garlic, or spice mixes. Puppies still need complete nutrient balancing for long-term feeding.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-04"),
    featured: true,
  },
  {
    id: "hfa-5",
    title: "Non-Veg Adult Bowl: Lean Protein Plate",
    slug: "non-veg-adult-lean-protein-plate",
    dietType: "Non-Veg",
    ageGroup: "Middle Age",
    excerpt:
      "A balanced adult meal template using lean meat, complex carbs, and fiber-rich vegetables.",
    ingredients: [
      { name: "Boiled chicken breast or turkey", grams: 90 },
      { name: "Cooked rice or oats", grams: 95 },
      { name: "Steamed spinach", grams: 20 },
      { name: "Steamed carrots", grams: 25 },
      { name: "Steamed beans", grams: 25 },
      { name: "Cooked egg", grams: 25, notes: "about half an egg" },
      { name: "Warm water", grams: 30 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 310,
      caloriesKcal: 320,
      proteinGrams: 25.4,
      fatGrams: 5.6,
      carbsGrams: 32,
      fiberGrams: 4.2,
      moistureGrams: 118,
    },
    prepNotes: [
      "Chop vegetables finely for easier digestion.",
      "Use lean protein only.",
      "Keep meal moist and unseasoned.",
    ],
    content: `## Who This Is For

Adult dogs needing steady energy and muscle maintenance.

## Ingredient Weights

- Boiled chicken or turkey — 90 g
- Cooked rice or oats — 95 g
- Steamed spinach — 20 g
- Steamed carrots — 25 g
- Steamed beans — 25 g
- Well-cooked egg — 25 g
- Warm water — 30 g

## Estimated Nutrition Per Serving

- Calories: ~320 kcal
- Protein: ~25.4 g
- Fat: ~5.6 g
- Carbohydrates: ~32 g
- Fiber: ~4.2 g

## Sample Bowl

Use a balanced plate with lean protein, cooked carbs, and vegetables. Keep moisture in the meal.

## Portion Notes

Feed twice daily. Reassess portions every 2 to 4 weeks based on weight trend.

## Important Reminder

Home-cooked meals are safest when measured by grams and reviewed by your veterinarian, especially for long-term feeding.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-05"),
    featured: true,
  },
  {
    id: "hfa-6",
    title: "Non-Veg Senior Bowl: Soft Turkey & Pumpkin Mix",
    slug: "non-veg-senior-soft-turkey-pumpkin-mix",
    dietType: "Non-Veg",
    ageGroup: "Senior",
    excerpt:
      "A soft senior-friendly meal with digestible protein and gentle fiber for aging dogs.",
    ingredients: [
      { name: "Lean minced turkey or chicken", grams: 80, notes: "fully cooked" },
      { name: "Soft cooked rice or oats", grams: 85 },
      { name: "Pumpkin puree", grams: 45 },
      { name: "Steamed zucchini", grams: 30 },
      { name: "Scrambled egg", grams: 20, notes: "plain, fully cooked" },
      { name: "Warm water", grams: 35 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 295,
      caloriesKcal: 275,
      proteinGrams: 22.1,
      fatGrams: 5.1,
      carbsGrams: 28,
      fiberGrams: 3.1,
      moistureGrams: 120,
    },
    prepNotes: [
      "Serve lukewarm for comfort.",
      "Mash lightly if chewing is difficult.",
      "Watch appetite and stool quality closely in seniors.",
    ],
    content: `## Who This Is For

Senior dogs who need softer textures, controlled calories, and easy digestion.

## Ingredient Weights

- Lean minced turkey or chicken — 80 g
- Soft cooked rice or oats — 85 g
- Pumpkin puree — 45 g
- Steamed zucchini — 30 g
- Scrambled egg — 20 g
- Warm water — 35 g

## Estimated Nutrition Per Serving

- Calories: ~275 kcal
- Protein: ~22.1 g
- Fat: ~5.1 g
- Carbohydrates: ~28 g
- Fiber: ~3.1 g

## Sample Bowl

Prepare a moist mash with turkey, pumpkin, soft carbs, and zucchini. Serve lukewarm for comfort.

## Portion Notes

Offer smaller meals twice daily and monitor appetite, stool consistency, and mobility.

## Important Reminder

If your senior dog has kidney, heart, liver, or endocrine conditions, use a veterinarian-designed diet plan instead of a generic homemade bowl.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-06"),
    featured: false,
  },
  {
    id: "hfa-7",
    title: "Veg Puppy Bowl: Rice Pumpkin Comfort Mash",
    slug: "veg-puppy-rice-pumpkin-comfort-mash",
    dietType: "Veg",
    ageGroup: "Puppy",
    excerpt:
      "A soft vegetarian puppy meal with easy-to-digest rice, pumpkin, and gentle fiber support.",
    ingredients: [
      { name: "Cooked white rice", grams: 85 },
      { name: "Pumpkin puree", grams: 45 },
      { name: "Mashed boiled carrot", grams: 25 },
      { name: "Cooked moong dal", grams: 20 },
      { name: "Warm water", grams: 35 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 210,
      caloriesKcal: 195,
      proteinGrams: 4.9,
      fatGrams: 0.9,
      carbsGrams: 41,
      fiberGrams: 4.3,
      moistureGrams: 82,
    },
    prepNotes: [
      "Keep the texture soft and smooth.",
      "Use small dal quantity for better tolerance.",
      "Introduce slowly if the puppy is new to homemade food.",
    ],
    content: `## Who This Is For

Best for puppies needing a soft-texture homemade meal idea during transition periods.

## Ingredient Weights

- Plain cooked rice — 85 g
- Pumpkin puree — 45 g
- Mashed boiled carrot — 25 g
- Well-cooked moong dal — 20 g
- Warm water — 35 g

## Estimated Nutrition Per Serving

- Calories: ~195 kcal
- Protein: ~4.9 g
- Fat: ~0.9 g
- Carbohydrates: ~41 g
- Fiber: ~4.3 g

## Sample Bowl

Mash rice, pumpkin, and carrot together until soft. Add a very small amount of moong dal and warm water to create a puppy-friendly consistency.

## Portion Notes

Feed small portions 3 to 4 times daily and adjust gradually based on stool quality and appetite.

## Important Reminder

Growing puppies have strict nutrient requirements. Homemade feeding should be reviewed by your veterinarian to avoid calcium and protein imbalance.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-07"),
    featured: false,
  },
  {
    id: "hfa-8",
    title: "Veg Adult Bowl: Quinoa Paneer Veg Mix",
    slug: "veg-adult-quinoa-paneer-veg-mix",
    dietType: "Veg",
    ageGroup: "Middle Age",
    excerpt:
      "A vegetarian adult meal idea using quinoa, vegetables, and a small amount of paneer for variety.",
    ingredients: [
      { name: "Cooked quinoa", grams: 100 },
      { name: "Plain paneer", grams: 30 },
      { name: "Steamed carrots", grams: 30 },
      { name: "Steamed beans", grams: 30 },
      { name: "Pumpkin puree", grams: 35 },
      { name: "Warm water", grams: 25 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 250,
      caloriesKcal: 255,
      proteinGrams: 10.3,
      fatGrams: 8.1,
      carbsGrams: 32,
      fiberGrams: 5.1,
      moistureGrams: 95,
    },
    prepNotes: [
      "Crumble paneer finely.",
      "Use paneer in moderation.",
      "Mix thoroughly for even texture.",
    ],
    content: `## Who This Is For

Adult dogs needing a home-cooked vegetarian meal idea with moderate calories and soft texture.

## Ingredient Weights

- Well-cooked quinoa — 100 g
- Plain paneer — 30 g
- Steamed carrots — 30 g
- Steamed beans — 30 g
- Pumpkin puree — 35 g
- Warm water — 25 g

## Estimated Nutrition Per Serving

- Calories: ~255 kcal
- Protein: ~10.3 g
- Fat: ~8.1 g
- Carbohydrates: ~32 g
- Fiber: ~5.1 g

## Sample Bowl

Mix cooked quinoa with mashed pumpkin, chopped steamed vegetables, and a small amount of crumbled paneer.

## Portion Notes

Serve twice daily and monitor digestion, skin comfort, and body condition.

## Important Reminder

Paneer should be used carefully and in moderation. Long-term vegetarian diets need veterinary review for protein quality, vitamin balance, and mineral supplementation.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-08"),
    featured: false,
  },
  {
    id: "hfa-9",
    title: "Veg Senior Bowl: Pumpkin Oats Recovery Meal",
    slug: "veg-senior-pumpkin-oats-recovery-meal",
    dietType: "Veg",
    ageGroup: "Senior",
    excerpt:
      "A soft vegetarian meal idea for older dogs needing gentle digestion and easy chewing.",
    ingredients: [
      { name: "Soft cooked oats", grams: 95 },
      { name: "Pumpkin puree", grams: 50 },
      { name: "Boiled mashed bottle gourd", grams: 45 },
      { name: "Cooked moong dal", grams: 25 },
      { name: "Warm water", grams: 35 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 250,
      caloriesKcal: 185,
      proteinGrams: 6.1,
      fatGrams: 1.7,
      carbsGrams: 35,
      fiberGrams: 5.7,
      moistureGrams: 108,
    },
    prepNotes: [
      "Keep the meal smooth and moist.",
      "Useful for dogs needing soft textures.",
      "Serve lukewarm.",
    ],
    content: `## Who This Is For

Senior dogs who prefer softer meals or need a simpler bowl during mild digestive sensitivity.

## Ingredient Weights

- Soft cooked oats — 95 g
- Pumpkin puree — 50 g
- Boiled mashed bottle gourd — 45 g
- Small amount of cooked moong dal — 25 g
- Warm water — 35 g

## Estimated Nutrition Per Serving

- Calories: ~185 kcal
- Protein: ~6.1 g
- Fat: ~1.7 g
- Carbohydrates: ~35 g
- Fiber: ~5.7 g

## Sample Bowl

Combine oats, pumpkin, and bottle gourd into a smooth mash. Add a small spoon of moong dal for extra substance.

## Portion Notes

Offer smaller portions twice daily and adjust based on appetite, weight trend, and stool consistency.

## Important Reminder

Senior dogs may have kidney, dental, or digestive issues that change protein and mineral needs. Use homemade meals only with veterinary guidance for long-term feeding.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-09"),
    featured: false,
  },
  {
    id: "hfa-10",
    title: "Non-Veg Puppy Bowl: Chicken Pumpkin Soft Mix",
    slug: "non-veg-puppy-chicken-pumpkin-soft-mix",
    dietType: "Non-Veg",
    ageGroup: "Puppy",
    excerpt:
      "A gentle puppy-friendly homemade meal using boiled chicken, pumpkin, and rice for a soft texture.",
    ingredients: [
      { name: "Boiled shredded chicken", grams: 60 },
      { name: "Cooked white rice", grams: 80 },
      { name: "Pumpkin puree", grams: 40 },
      { name: "Soft cooked carrot", grams: 20 },
      { name: "Warm water", grams: 35 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 235,
      caloriesKcal: 250,
      proteinGrams: 17.8,
      fatGrams: 2.6,
      carbsGrams: 34,
      fiberGrams: 2.9,
      moistureGrams: 92,
    },
    prepNotes: [
      "Use finely shredded chicken.",
      "Mix to a soft, easy-to-eat texture.",
      "Transition gradually over several days.",
    ],
    content: `## Who This Is For

Puppies beginning home-cooked meals under careful supervision and slow transition.

## Ingredient Weights

- Boiled shredded chicken — 60 g
- Plain cooked rice — 80 g
- Pumpkin puree — 40 g
- Soft cooked carrot — 20 g
- Warm water — 35 g

## Estimated Nutrition Per Serving

- Calories: ~250 kcal
- Protein: ~17.8 g
- Fat: ~2.6 g
- Carbohydrates: ~34 g
- Fiber: ~2.9 g

## Sample Bowl

Use mostly rice and pumpkin with a modest amount of shredded chicken. Mix with warm water until soft and easy to eat.

## Portion Notes

Divide into 3 to 4 small meals daily and transition slowly over several days.

## Important Reminder

Do not add salt, spices, butter, onion, garlic, or bones. Puppies need complete nutrient balance, so this should not replace a full veterinary feeding plan.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-10"),
    featured: false,
  },
  {
    id: "hfa-11",
    title: "Non-Veg Adult Bowl: Egg Rice Energy Meal",
    slug: "non-veg-adult-egg-rice-energy-meal",
    dietType: "Non-Veg",
    ageGroup: "Middle Age",
    excerpt:
      "A simple adult meal idea with cooked egg, rice, and vegetables for variety and digestibility.",
    ingredients: [
      { name: "Cooked white rice", grams: 100 },
      { name: "Fully cooked egg", grams: 50, notes: "about 1 medium egg" },
      { name: "Steamed carrots", grams: 25 },
      { name: "Cooked peas", grams: 25 },
      { name: "Pumpkin puree", grams: 30 },
      { name: "Warm water", grams: 25 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 255,
      caloriesKcal: 255,
      proteinGrams: 10.4,
      fatGrams: 6.1,
      carbsGrams: 38,
      fiberGrams: 4.1,
      moistureGrams: 82,
    },
    prepNotes: [
      "Egg must be fully cooked.",
      "Mix with rice while warm for softer texture.",
      "Good as a simple variety meal.",
    ],
    content: `## Who This Is For

Adult dogs needing a simple homemade meal option with easy ingredients.

## Ingredient Weights

- Plain cooked rice — 100 g
- Fully cooked egg — 50 g
- Steamed carrots — 25 g
- Cooked peas — 25 g
- Pumpkin puree — 30 g
- Warm water — 25 g

## Estimated Nutrition Per Serving

- Calories: ~255 kcal
- Protein: ~10.4 g
- Fat: ~6.1 g
- Carbohydrates: ~38 g
- Fiber: ~4.1 g

## Sample Bowl

Mix rice with chopped cooked egg, vegetables, and pumpkin. Add warm water to keep the bowl moist.

## Portion Notes

Feed twice daily and measure portions based on weight, activity level, and body condition.

## Important Reminder

Egg should always be fully cooked. Homemade diets need proper long-term balancing, especially if used regularly instead of commercial food.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-11"),
    featured: false,
  },
  {
    id: "hfa-12",
    title: "Non-Veg Adult Bowl: Fish Rice Gentle Digestion Plate",
    slug: "non-veg-adult-fish-rice-gentle-digestion-plate",
    dietType: "Non-Veg",
    ageGroup: "Middle Age",
    excerpt:
      "A light homemade bowl using boneless cooked fish, rice, and pumpkin for dogs needing a simple meal idea.",
    ingredients: [
      { name: "Fully cooked boneless fish", grams: 75 },
      { name: "Plain cooked rice", grams: 95 },
      { name: "Pumpkin puree", grams: 35 },
      { name: "Steamed zucchini", grams: 25 },
      { name: "Warm water", grams: 30 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 260,
      caloriesKcal: 245,
      proteinGrams: 17.2,
      fatGrams: 3.1,
      carbsGrams: 34,
      fiberGrams: 2.8,
      moistureGrams: 96,
    },
    prepNotes: [
      "Check very carefully for bones.",
      "Use plain cooked fish only.",
      "Introduce slowly if fish is new to the dog.",
    ],
    content: `## Who This Is For

Adult dogs who tolerate fish well and need a lighter homemade meal option.

## Ingredient Weights

- Fully cooked boneless fish — 75 g
- Plain rice — 95 g
- Pumpkin puree — 35 g
- Steamed zucchini or carrot — 25 g
- Warm water — 30 g

## Estimated Nutrition Per Serving

- Calories: ~245 kcal
- Protein: ~17.2 g
- Fat: ~3.1 g
- Carbohydrates: ~34 g
- Fiber: ~2.8 g

## Sample Bowl

Flake the fish carefully to ensure there are no bones. Mix with rice, pumpkin, and soft vegetables into a moist bowl.

## Portion Notes

Serve twice daily and monitor stool quality carefully when introducing fish for the first time.

## Important Reminder

Use only fully cooked, boneless fish. Avoid heavily oily preparation, seasoning, and sauces. Introduce slowly if your dog has not eaten fish before.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-12"),
    featured: false,
  },
  {
    id: "hfa-13",
    title: "Non-Veg Senior Bowl: Chicken Oats Soft Supper",
    slug: "non-veg-senior-chicken-oats-soft-supper",
    dietType: "Non-Veg",
    ageGroup: "Senior",
    excerpt:
      "A warm, soft meal idea for senior dogs using lean chicken, oats, and pumpkin for easy chewing.",
    ingredients: [
      { name: "Boiled shredded chicken", grams: 75 },
      { name: "Soft cooked oats", grams: 90 },
      { name: "Pumpkin puree", grams: 40 },
      { name: "Steamed zucchini", grams: 25 },
      { name: "Warm water", grams: 35 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 265,
      caloriesKcal: 255,
      proteinGrams: 20.4,
      fatGrams: 3.2,
      carbsGrams: 26,
      fiberGrams: 3.7,
      moistureGrams: 104,
    },
    prepNotes: [
      "Add extra warm water if the dog likes softer food.",
      "Shred chicken finely.",
      "Serve lukewarm.",
    ],
    content: `## Who This Is For

Senior dogs who prefer soft textures or need easier-to-chew homemade food ideas.

## Ingredient Weights

- Boiled shredded chicken — 75 g
- Soft cooked oats — 90 g
- Pumpkin puree — 40 g
- Steamed zucchini — 25 g
- Warm water — 35 g

## Estimated Nutrition Per Serving

- Calories: ~255 kcal
- Protein: ~20.4 g
- Fat: ~3.2 g
- Carbohydrates: ~26 g
- Fiber: ~3.7 g

## Sample Bowl

Mix oats, chicken, and pumpkin into a soft mash. Add extra warm water if your dog prefers a looser texture.

## Portion Notes

Offer 2 smaller meals daily and adjust based on appetite, stool quality, and body weight.

## Important Reminder

Older dogs may have medical needs that change protein, phosphorus, or calorie targets. Long-term homemade feeding should be reviewed by your veterinarian.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-13"),
    featured: false,
  },
  {
    id: "hfa-14",
    title: "Veg Adult Bowl: Sweet Potato Lentil Comfort Plate",
    slug: "veg-adult-sweet-potato-lentil-comfort-plate",
    dietType: "Veg",
    ageGroup: "Middle Age",
    excerpt:
      "A warming vegetarian meal idea using sweet potato, lentils, and vegetables for steady energy.",
    ingredients: [
      { name: "Mashed boiled sweet potato", grams: 90 },
      { name: "Well-cooked lentils", grams: 50 },
      { name: "Steamed carrots", grams: 25 },
      { name: "Steamed beans", grams: 25 },
      { name: "Cooked rice", grams: 50 },
      { name: "Warm water", grams: 25 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 265,
      caloriesKcal: 235,
      proteinGrams: 8.3,
      fatGrams: 1.1,
      carbsGrams: 48,
      fiberGrams: 7.2,
      moistureGrams: 92,
    },
    prepNotes: [
      "Mash sweet potato well.",
      "Use lentils in moderate quantity.",
      "Keep meal soft and moist.",
    ],
    content: `## Who This Is For

Adult dogs doing well on carefully supervised vegetarian feeding plans.

## Ingredient Weights

- Mashed boiled sweet potato — 90 g
- Well-cooked lentils — 50 g
- Steamed carrots — 25 g
- Steamed beans — 25 g
- Small amount of cooked rice — 50 g
- Warm water — 25 g

## Estimated Nutrition Per Serving

- Calories: ~235 kcal
- Protein: ~8.3 g
- Fat: ~1.1 g
- Carbohydrates: ~48 g
- Fiber: ~7.2 g

## Sample Bowl

Combine sweet potato and rice as the base, then add a modest amount of lentils and vegetables for texture and fiber.

## Portion Notes

Feed twice daily and make changes slowly over several days.

## Important Reminder

Vegetarian feeding for dogs should be formulated carefully to avoid nutrient gaps. Use this only as a meal idea, not a complete long-term plan without veterinary guidance.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-14"),
    featured: false,
  },
  {
    id: "hfa-15",
    title: "Non-Veg Puppy Bowl: Turkey Rice Gentle Starter",
    slug: "non-veg-puppy-turkey-rice-gentle-starter",
    dietType: "Non-Veg",
    ageGroup: "Puppy",
    excerpt:
      "A soft homemade puppy meal using lean turkey, rice, and pumpkin for gradual transition feeding.",
    ingredients: [
      { name: "Fully cooked lean turkey", grams: 55 },
      { name: "Plain cooked rice", grams: 85 },
      { name: "Pumpkin puree", grams: 35 },
      { name: "Soft cooked carrot", grams: 20 },
      { name: "Warm water", grams: 35 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 230,
      caloriesKcal: 240,
      proteinGrams: 16.7,
      fatGrams: 2.4,
      carbsGrams: 34,
      fiberGrams: 2.6,
      moistureGrams: 88,
    },
    prepNotes: [
      "Use plain lean turkey only.",
      "Mix to a soft texture.",
      "Transition gradually over several days.",
    ],
    content: `## Who This Is For

Puppies beginning carefully supervised non-veg home-cooked meals.

## Ingredient Weights

- Fully cooked lean turkey — 55 g
- Plain rice — 85 g
- Pumpkin puree — 35 g
- Soft cooked carrot — 20 g
- Warm water — 35 g

## Estimated Nutrition Per Serving

- Calories: ~240 kcal
- Protein: ~16.7 g
- Fat: ~2.4 g
- Carbohydrates: ~34 g
- Fiber: ~2.6 g

## Sample Bowl

Mix rice and pumpkin as the base, then add a smaller amount of turkey to keep the bowl gentle and easy to digest.

## Portion Notes

Feed in small portions 3 to 4 times a day and increase only if tolerated well.

## Important Reminder

Puppies should not be fed homemade diets long term unless formulated by a veterinarian or qualified veterinary nutrition professional.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-07-15"),
    featured: false,
  },
  {
    id: "hfa-16",
    title: "Veg Puppy Bowl: Banana Oats Soft Porridge",
    slug: "veg-puppy-banana-oats-porridge",
    dietType: "Veg",
    ageGroup: "Puppy",
    excerpt:
      "A warm, easily digestible oats-based meal with banana and sweet potato for growing puppies.",
    ingredients: [
      { name: "Rolled oats", grams: 50, notes: "cooked soft" },
      { name: "Ripe banana", grams: 40, notes: "mashed" },
      { name: "Cooked sweet potato", grams: 60, notes: "mashed" },
      { name: "Plain yogurt", grams: 15, notes: "live culture, optional" },
      { name: "Coconut oil", grams: 3, notes: "melted" },
      { name: "Warm water", grams: 30, notes: "to adjust consistency" },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 198,
      caloriesKcal: 210,
      proteinGrams: 5.5,
      fatGrams: 4.8,
      carbsGrams: 38,
      fiberGrams: 4.2,
      moistureGrams: 85,
    },
    prepNotes: [
      "Cook oats until very soft and porridge-like.",
      "Mash banana and sweet potato together, then fold into the oats.",
      "Serve lukewarm. Do not add sugar or honey.",
    ],
    content: `## Who This Is For

A gentle vegetarian porridge for puppies aged 8 weeks and older who are transitioning to solid foods.

## Ingredient Weights

- Soft-cooked rolled oats — 50 g
- Ripe mashed banana — 40 g
- Cooked mashed sweet potato — 60 g
- Plain yogurt — 15 g
- Coconut oil — 3 g
- Warm water — 30 g

## Estimated Nutrition Per Serving

- Calories: ~210 kcal
- Protein: ~5.5 g
- Fat: ~4.8 g
- Carbohydrates: ~38 g
- Fiber: ~4.2 g

## Sample Bowl

Cook oats with extra water until very soft. Mash banana and sweet potato together and fold into the porridge. Add a small amount of yogurt on top and drizzle coconut oil. Use warm water to thin if needed.

## Portion Notes

Feed in 3 to 4 small meals per day. Start with half portions and increase over a week.

## Important Reminder

This recipe is a transitional starter meal and does not provide complete nutrition for long-term puppy feeding. Consult your veterinarian for a balanced diet plan.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-08-01"),
    featured: false,
  },
  {
    id: "hfa-17",
    title: "Non-Veg Puppy Bowl: Egg Rice Soft Meal",
    slug: "non-veg-puppy-egg-rice-soft-meal",
    dietType: "Non-Veg",
    ageGroup: "Puppy",
    excerpt:
      "A protein-rich egg and rice bowl for puppies, easy to digest and great for building muscle during growth spurts.",
    ingredients: [
      { name: "Boiled egg", grams: 50, notes: "mashed with fork" },
      { name: "Cooked white rice", grams: 80 },
      { name: "Pumpkin puree", grams: 30 },
      { name: "Steamed carrot", grams: 20, notes: "finely chopped" },
      { name: "Coconut oil", grams: 3 },
      { name: "Warm water", grams: 25 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 208,
      caloriesKcal: 235,
      proteinGrams: 10.5,
      fatGrams: 7.2,
      carbsGrams: 32,
      fiberGrams: 3.0,
      moistureGrams: 80,
    },
    prepNotes: [
      "Boil egg fully and mash well — no runny yolk for puppies.",
      "Mix rice and pumpkin first, then fold in egg and carrot.",
      "Serve at room temperature or slightly warm.",
    ],
    content: `## Who This Is For

A gentle non-vegetarian meal for puppies aged 10 weeks and older. Eggs provide high-quality protein for growing muscles and bones.

## Ingredient Weights

- Boiled egg (mashed) — 50 g
- Cooked white rice — 80 g
- Pumpkin puree — 30 g
- Steamed finely chopped carrot — 20 g
- Coconut oil — 3 g
- Warm water — 25 g

## Estimated Nutrition Per Serving

- Calories: ~235 kcal
- Protein: ~10.5 g
- Fat: ~7.2 g
- Carbohydrates: ~32 g
- Fiber: ~3.0 g

## Sample Bowl

Mix rice and pumpkin as the base. Fold in the mashed boiled egg and diced carrot. Drizzle coconut oil and add warm water to soften if needed.

## Portion Notes

Feed 3 to 4 times daily in small portions. Eggs can be fed daily but limit to one egg per day for small-breed puppies.

## Important Reminder

Puppies require precise nutrient ratios. This recipe is a supplemental meal idea, not a complete diet. Always consult your veterinarian.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-08-05"),
    featured: false,
  },
  {
    id: "hfa-18",
    title: "Non-Veg Puppy Bowl: Fish Oats Gentle Meal",
    slug: "non-veg-puppy-fish-oats-gentle",
    dietType: "Non-Veg",
    ageGroup: "Puppy",
    excerpt:
      "An omega-3 rich fish and oats meal to support puppy brain development and healthy coat growth.",
    ingredients: [
      { name: "Boneless cooked fish", grams: 50, notes: "flaked, ensure no bones" },
      { name: "Rolled oats", grams: 45, notes: "cooked soft" },
      { name: "Cooked sweet potato", grams: 40, notes: "mashed" },
      { name: "Steamed spinach", grams: 10, notes: "finely chopped, small amount" },
      { name: "Coconut oil", grams: 3 },
      { name: "Warm water", grams: 30 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 178,
      caloriesKcal: 220,
      proteinGrams: 14.0,
      fatGrams: 6.5,
      carbsGrams: 26,
      fiberGrams: 3.5,
      moistureGrams: 75,
    },
    prepNotes: [
      "Use mild white fish like rohu or tilapia — avoid strong-flavoured fish.",
      "Check thoroughly for bones before serving.",
      "Cook oats until very soft and mix everything together.",
    ],
    content: `## Who This Is For

A nutrient-dense fish meal for puppies aged 12 weeks and older. Fish provides omega-3 fatty acids important for brain and coat development.

## Ingredient Weights

- Flaked boneless cooked fish — 50 g
- Soft-cooked rolled oats — 45 g
- Cooked mashed sweet potato — 40 g
- Finely chopped steamed spinach — 10 g
- Coconut oil — 3 g
- Warm water — 30 g

## Estimated Nutrition Per Serving

- Calories: ~220 kcal
- Protein: ~14.0 g
- Fat: ~6.5 g
- Carbohydrates: ~26 g
- Fiber: ~3.5 g

## Sample Bowl

Cook oats soft, mash sweet potato, and flake the fish carefully. Combine everything and add a tiny amount of spinach. Drizzle coconut oil and add warm water for a softer texture.

## Portion Notes

Feed 3 times daily. Introduce fish gradually — start with half portions to check for allergies.

## Important Reminder

Some puppies may be allergic to certain fish. Introduce slowly and watch for itching, redness, or digestive upset. Consult your vet before adding fish regularly.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-08-10"),
    featured: false,
  },
  {
    id: "hfa-19",
    title: "Veg Puppy Bowl: Moong Dal Khichdi for Puppies",
    slug: "veg-puppy-moong-dal-khichdi",
    dietType: "Veg",
    ageGroup: "Puppy",
    excerpt:
      "A traditional Indian khichdi adapted for puppies — soft, warm, and easy on the tummy with no spices.",
    ingredients: [
      { name: "Cooked white rice", grams: 60 },
      { name: "Cooked moong dal", grams: 40, notes: "well-cooked, mushy" },
      { name: "Pumpkin puree", grams: 30 },
      { name: "Steamed carrot", grams: 20, notes: "mashed" },
      { name: "Ghee", grams: 3, notes: "pure, no spices" },
      { name: "Warm water", grams: 40, notes: "to make soupy" },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 193,
      caloriesKcal: 200,
      proteinGrams: 7.0,
      fatGrams: 3.5,
      carbsGrams: 36,
      fiberGrams: 4.0,
      moistureGrams: 95,
    },
    prepNotes: [
      "Cook dal until completely mushy — no whole pieces.",
      "Do NOT add salt, turmeric, or any spices.",
      "Mix everything into a soupy, porridge-like consistency.",
    ],
    content: `## Who This Is For

An Indian-kitchen-friendly vegetarian meal for puppies aged 8 weeks and older. Khichdi is naturally soft and gentle, making it ideal for puppy digestion.

## Ingredient Weights

- Cooked white rice — 60 g
- Mushy cooked moong dal — 40 g
- Pumpkin puree — 30 g
- Steamed mashed carrot — 20 g
- Plain ghee (no spices) — 3 g
- Warm water — 40 g

## Estimated Nutrition Per Serving

- Calories: ~200 kcal
- Protein: ~7.0 g
- Fat: ~3.5 g
- Carbohydrates: ~36 g
- Fiber: ~4.0 g

## Sample Bowl

Cook rice and dal together until very soft and mushy — essentially a plain khichdi. Mix in mashed pumpkin and carrot. Add ghee and warm water to achieve a soupy porridge texture.

## Portion Notes

Feed in small portions 3 to 4 times daily. This is one of the easiest meals for Indian pet owners to prepare at home.

## Important Reminder

Do not add any spices, salt, onion, garlic, or tempering (tadka). Dog khichdi must be completely plain. This is not nutritionally complete for long-term use — consult your vet.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-08-15"),
    featured: true,
  },
  {
    id: "hfa-20",
    title: "Non-Veg Adult Bowl: Chicken Vegetable Biryani-Style Plate",
    slug: "non-veg-adult-chicken-veg-biryani-style",
    dietType: "Non-Veg",
    ageGroup: "Middle Age",
    excerpt:
      "A flavourful (but spice-free) chicken and rice meal inspired by biryani — packed with vegetables for adult dogs.",
    ingredients: [
      { name: "Boiled chicken breast", grams: 100, notes: "shredded" },
      { name: "Cooked basmati rice", grams: 80 },
      { name: "Steamed green beans", grams: 25, notes: "chopped" },
      { name: "Steamed carrot", grams: 25, notes: "diced" },
      { name: "Cooked peas", grams: 15 },
      { name: "Coconut oil", grams: 5 },
      { name: "Plain yogurt", grams: 10, notes: "optional topper" },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 260,
      caloriesKcal: 340,
      proteinGrams: 28.0,
      fatGrams: 8.5,
      carbsGrams: 36,
      fiberGrams: 4.0,
      moistureGrams: 70,
    },
    prepNotes: [
      "Boil chicken without any spices, salt, or oil.",
      "Cook rice separately — do not use any masala or colouring.",
      "Mix everything together and serve at room temperature.",
    ],
    content: `## Who This Is For

A hearty, protein-packed meal for adult dogs (1 year and older) who enjoy chicken. Inspired by the idea of biryani but completely free of spices, onion, and garlic.

## Ingredient Weights

- Shredded boiled chicken breast — 100 g
- Cooked basmati rice — 80 g
- Steamed chopped green beans — 25 g
- Steamed diced carrot — 25 g
- Cooked peas — 15 g
- Coconut oil — 5 g
- Plain yogurt (optional) — 10 g

## Estimated Nutrition Per Serving

- Calories: ~340 kcal
- Protein: ~28.0 g
- Fat: ~8.5 g
- Carbohydrates: ~36 g
- Fiber: ~4.0 g

## Sample Bowl

Layer rice at the bottom, add shredded chicken and steamed vegetables on top. Drizzle coconut oil and add a dollop of yogurt if your dog tolerates dairy.

## Portion Notes

Serve once or twice daily depending on your dog's size and activity level. Adjust portions based on weight management goals.

## Important Reminder

Do NOT add biryani masala, onion, garlic, or any spices. This is a plain, dog-safe version. Not nutritionally complete as a sole diet — consult your vet about supplements.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-08-20"),
    featured: true,
  },
  {
    id: "hfa-21",
    title: "Veg Adult Bowl: Paneer Rice Protein Bowl",
    slug: "veg-adult-paneer-rice-protein-bowl",
    dietType: "Veg",
    ageGroup: "Middle Age",
    excerpt:
      "A protein-rich vegetarian meal using paneer and rice with steamed vegetables — great for active adult dogs.",
    ingredients: [
      { name: "Fresh paneer", grams: 50, notes: "crumbled, plain" },
      { name: "Cooked white rice", grams: 70 },
      { name: "Steamed bottle gourd (lauki)", grams: 40, notes: "chopped" },
      { name: "Steamed carrot", grams: 25, notes: "diced" },
      { name: "Cooked pumpkin", grams: 25, notes: "mashed" },
      { name: "Ghee", grams: 5 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 215,
      caloriesKcal: 295,
      proteinGrams: 14.0,
      fatGrams: 12.0,
      carbsGrams: 32,
      fiberGrams: 3.5,
      moistureGrams: 65,
    },
    prepNotes: [
      "Use fresh, unsalted paneer only — avoid store-bought seasoned varieties.",
      "Crumble paneer into small pieces for easier digestion.",
      "Do not fry the paneer — serve it plain or lightly warmed.",
    ],
    content: `## Who This Is For

A hearty vegetarian meal for adult dogs (1 year and older). Paneer is a good protein source for dogs on a vegetarian diet, and most Indian dogs enjoy it.

## Ingredient Weights

- Crumbled plain paneer — 50 g
- Cooked white rice — 70 g
- Steamed chopped bottle gourd — 40 g
- Steamed diced carrot — 25 g
- Cooked mashed pumpkin — 25 g
- Ghee — 5 g

## Estimated Nutrition Per Serving

- Calories: ~295 kcal
- Protein: ~14.0 g
- Fat: ~12.0 g
- Carbohydrates: ~32 g
- Fiber: ~3.5 g

## Sample Bowl

Mix rice and mashed pumpkin as the base. Add steamed lauki and carrot. Top with crumbled paneer and a small amount of ghee.

## Portion Notes

Serve once or twice daily. Some dogs may be sensitive to dairy — introduce paneer gradually and watch for loose stools.

## Important Reminder

Paneer alone does not provide all essential amino acids dogs need. Rotate protein sources and consult your vet about supplementation.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-08-25"),
    featured: false,
  },
  {
    id: "hfa-22",
    title: "Non-Veg Adult Bowl: Mutton Rice Hearty Meal",
    slug: "non-veg-adult-mutton-rice-hearty",
    dietType: "Non-Veg",
    ageGroup: "Middle Age",
    excerpt:
      "A rich, protein-dense mutton and rice meal for active adult dogs who need sustained energy throughout the day.",
    ingredients: [
      { name: "Boiled mutton", grams: 80, notes: "boneless, lean cuts, shredded" },
      { name: "Cooked white rice", grams: 80 },
      { name: "Cooked pumpkin", grams: 30, notes: "mashed" },
      { name: "Steamed carrot", grams: 20, notes: "diced" },
      { name: "Steamed spinach", grams: 10, notes: "finely chopped" },
      { name: "Coconut oil", grams: 5 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 225,
      caloriesKcal: 365,
      proteinGrams: 25.0,
      fatGrams: 14.0,
      carbsGrams: 34,
      fiberGrams: 3.0,
      moistureGrams: 60,
    },
    prepNotes: [
      "Boil mutton thoroughly until soft — pressure cook if needed.",
      "Use only lean cuts — trim visible fat before cooking.",
      "Do not add any spices or salt while cooking.",
    ],
    content: `## Who This Is For

A hearty non-vegetarian meal for active adult dogs (1 year and older). Mutton provides high-quality protein and iron, and is well-accepted by most Indian dogs.

## Ingredient Weights

- Boneless boiled mutton (shredded) — 80 g
- Cooked white rice — 80 g
- Cooked mashed pumpkin — 30 g
- Steamed diced carrot — 20 g
- Finely chopped steamed spinach — 10 g
- Coconut oil — 5 g

## Estimated Nutrition Per Serving

- Calories: ~365 kcal
- Protein: ~25.0 g
- Fat: ~14.0 g
- Carbohydrates: ~34 g
- Fiber: ~3.0 g

## Sample Bowl

Mix rice and mashed pumpkin as the base. Add shredded mutton and vegetables on top. Drizzle coconut oil for coat health.

## Portion Notes

Feed once or twice daily depending on weight and activity level. Mutton is richer than chicken, so portions may be slightly smaller. Not recommended for dogs with pancreatitis or fat-sensitive conditions.

## Important Reminder

Mutton bones are dangerous — never feed cooked bones. Always use boneless, lean cuts. Consult your vet about appropriate feeding frequency.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-09-01"),
    featured: false,
  },
  {
    id: "hfa-23",
    title: "Veg Adult Bowl: Dal Chawal Everyday Meal",
    slug: "veg-adult-dal-chawal-everyday",
    dietType: "Veg",
    ageGroup: "Middle Age",
    excerpt:
      "The classic Indian dal-chawal adapted for dogs — simple, affordable, and easy to prepare every day.",
    ingredients: [
      { name: "Cooked white rice", grams: 80 },
      { name: "Cooked moong dal", grams: 50, notes: "well-cooked, mushy" },
      { name: "Steamed bottle gourd (lauki)", grams: 30, notes: "chopped" },
      { name: "Cooked pumpkin", grams: 25, notes: "mashed" },
      { name: "Boiled egg", grams: 50, notes: "mashed — optional for extra protein" },
      { name: "Ghee", grams: 5 },
    ],
    servings: 1,
    nutritionEstimate: {
      servingSizeGrams: 240,
      caloriesKcal: 310,
      proteinGrams: 14.5,
      fatGrams: 8.0,
      carbsGrams: 44,
      fiberGrams: 5.0,
      moistureGrams: 75,
    },
    prepNotes: [
      "Cook dal until completely mushy — no whole pieces should remain.",
      "This is plain dal-chawal — absolutely no tempering, spices, salt, or onion.",
      "The egg is optional but recommended for better protein balance.",
    ],
    content: `## Who This Is For

An everyday vegetarian meal for adult dogs (1 year and older). Dal-chawal is the most accessible Indian home food, and when prepared plain, it works well for dogs.

## Ingredient Weights

- Cooked white rice — 80 g
- Mushy cooked moong dal — 50 g
- Steamed chopped bottle gourd — 30 g
- Cooked mashed pumpkin — 25 g
- Mashed boiled egg (optional) — 50 g
- Ghee — 5 g

## Estimated Nutrition Per Serving

- Calories: ~310 kcal
- Protein: ~14.5 g (with egg)
- Fat: ~8.0 g
- Carbohydrates: ~44 g
- Fiber: ~5.0 g

## Sample Bowl

Mix dal and rice together. Add vegetables and ghee. Top with mashed egg if using. The consistency should be soft and slightly soupy — add warm water if needed.

## Portion Notes

Can be fed once or twice daily. This is an affordable, everyday-friendly recipe that most Indian households can easily prepare alongside their own meals.

## Important Reminder

Human dal contains tadka (tempering), salt, and often onion or garlic — all harmful to dogs. Dog dal-chawal must be completely plain. Supplement with calcium and vitamins as advised by your vet.

*Educational content only. Not a substitute for veterinary advice.*`,
    publishedAt: new Date("2024-09-05"),
    featured: true,
  },
];