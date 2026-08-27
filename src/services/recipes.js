import axios from 'axios';
import cheerio from 'cheerio';
import { missingIngredients } from '../utils/ingredients';

const appId = process.env.EXPO_PUBLIC_EDAMAM_APP_ID;
const appKey = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY;
const apiUrl = 'https://api.edamam.com/api/recipes/v2';

function credentials() {
  if (!appId || !appKey) throw new Error('Missing Edamam API configuration');
  return { app_id: appId, app_key: appKey };
}

export async function searchRecipes(ingredients) {
  const response = await axios.get(apiUrl, {
    params: { ...credentials(), type: 'public', q: ingredients.join(',') },
  });

  return response.data.hits
    .map(({ recipe }) => ({
      label: recipe.label,
      image: recipe.image,
      url: recipe.url,
      ingredientLines: recipe.ingredientLines ?? [],
      calories: recipe.calories ?? 0,
      dietLabels: recipe.dietLabels ?? [],
      mealType: recipe.mealType ?? [],
      dishType: recipe.dishType ?? [],
      cuisineType: recipe.cuisineType ?? [],
      missingIngredients: missingIngredients(recipe.ingredientLines, ingredients),
    }))
    .filter((recipe) => recipe.url?.includes('bbcgoodfood.com'));
}

export async function trendingRecipes() {
  const response = await axios.get(apiUrl, {
    params: { ...credentials(), type: 'public', q: 'mushroom' },
  });
  return response.data.hits.slice(0, 5).map(({ recipe }) => ({
    label: recipe.label,
    image: recipe.image,
    url: recipe.url,
  }));
}

export async function scrapeRecipeDetails(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const title = $('.post-header__title').text().trim() || $('h1').first().text().trim();
  const ingredients = [];
  $('.recipe__ingredients .list-item').each((_, element) => ingredients.push($(element).text().trim()));
  const methods = [];
  $('.recipe__method-steps p').each((_, element) => methods.push($(element).text().trim()));
  return { title, ingredients, methods };
}
