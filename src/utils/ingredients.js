const FOOD_KEYWORDS = new Set([
  'apple','banana','orange','mango','strawberry','tomato','carrot','broccoli','chicken','beef','fish',
  'rice','pasta','onion','potato','garlic','bell pepper','lettuce','spinach','pineapple','kiwi','grape',
  'lemon','lime','peach','pear','plum','watermelon','blueberry','raspberry','avocado','cucumber',
  'zucchini','eggplant','mushroom','turkey','pork','lamb','shrimp','salmon','cod','lobster','crab',
  'quinoa','beans','lentils','chickpeas','peas','walnut','almond','cashew','coconut','milk','cheese',
  'butter','olive oil','vinegar','honey','sugar','flour','baking soda','cinnamon','vanilla','cocoa',
  'nutmeg','ginger','jasmine rice','cherry tomatoes'
]);

const GENERIC_LABELS = ['plant', 'vegetable', 'fruit', 'food'];

export function normaliseFoodLabels(labels, allergens = []) {
  const blocked = new Set(allergens.map((value) => value.trim().toLowerCase()).filter(Boolean));
  const found = new Set();

  for (const label of labels) {
    const value = label.description?.trim().toLowerCase();
    if (!value || GENERIC_LABELS.some((generic) => value.includes(generic))) continue;
    if (FOOD_KEYWORDS.has(value) && !blocked.has(value)) found.add(value);
  }
  return [...found];
}

export function missingIngredients(recipeLines = [], recognised = []) {
  const known = recognised.map((item) => item.toLowerCase());
  return recipeLines.filter((line) => {
    const text = line.toLowerCase();
    return !known.some((ingredient) => text.includes(ingredient));
  });
}
