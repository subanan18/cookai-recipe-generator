import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { detectLabels } from './services/vision';
import { scrapeRecipeDetails, searchRecipes, trendingRecipes } from './services/recipes';
import { normaliseFoodLabels } from './utils/ingredients';

export default function CookAIApp() {
  const [images, setImages] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [trending, setTrending] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [minCalories, setMinCalories] = useState('0');
  const [maxCalories, setMaxCalories] = useState('10000');
  const [allergens, setAllergens] = useState('pineapple');

  useEffect(() => {
    trendingRecipes().then(setTrending).catch(() => setTrending([]));
  }, []);

  const filteredRecipes = useMemo(() => {
    const min = Number(minCalories || 0);
    const max = Number(maxCalories || Number.MAX_SAFE_INTEGER);
    return recipes.filter((recipe) => recipe.calories >= min && recipe.calories <= max);
  }, [recipes, minCalories, maxCalories]);

  async function addFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) setImages((current) => [...current, ...result.assets.map((asset) => asset.uri)]);
  }

  async function addFromCamera() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return Alert.alert('Camera permission is required.');
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setImages((current) => [...current, result.assets[0].uri]);
  }

  async function findRecipes() {
    if (!images.length) return Alert.alert('Add at least one ingredient image first.');
    setLoading(true);
    try {
      const labels = await detectLabels(images);
      const blocked = allergens.split(',');
      const ingredients = normaliseFoodLabels(labels, blocked);
      if (!ingredients.length) return Alert.alert('No supported food ingredients were recognised.');
      setRecipes(await searchRecipes(ingredients));
    } catch (error) {
      Alert.alert('Recipe search failed', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function openRecipe(recipe) {
    try {
      const details = await scrapeRecipeDetails(recipe.url);
      setSelected({ ...recipe, ...details });
    } catch {
      setSelected({ ...recipe, title: recipe.label, ingredients: recipe.ingredientLines, methods: [] });
    }
  }

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to cookAI</Text>
          <View style={styles.avatar}><Text style={styles.avatarText}>👤</Text></View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={addFromGallery}><Text style={styles.buttonText}>Choose from Gallery</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={addFromCamera}><Text style={styles.buttonText}>Take a Picture</Text></TouchableOpacity>
        </View>

        {!!images.length && <ScrollView horizontal>{images.map((uri) => (
          <View key={uri} style={styles.imageWrap}>
            <Image source={{ uri }} style={styles.ingredientImage} />
            <TouchableOpacity onPress={() => setImages((items) => items.filter((item) => item !== uri))}><Text style={styles.delete}>Delete</Text></TouchableOpacity>
          </View>
        ))}</ScrollView>}

        <Text style={styles.label}>Allergens to exclude (comma separated)</Text>
        <TextInput value={allergens} onChangeText={setAllergens} style={styles.input} placeholder="e.g. peanut, pineapple" />
        <TouchableOpacity style={styles.primary} onPress={findRecipes}><Text style={styles.primaryText}>{loading ? 'Analysing…' : 'Get Recipes'}</Text></TouchableOpacity>

        {!!recipes.length && <>
          <Text style={styles.sectionTitle}>Recipes</Text>
          <View style={styles.calorieRow}>
            <TextInput value={minCalories} onChangeText={setMinCalories} keyboardType="numeric" style={styles.calorieInput} placeholder="Min kcal" />
            <Text style={styles.range}>—</Text>
            <TextInput value={maxCalories} onChangeText={setMaxCalories} keyboardType="numeric" style={styles.calorieInput} placeholder="Max kcal" />
          </View>
          {filteredRecipes.map((recipe) => <RecipeCard key={`${recipe.label}-${recipe.url}`} recipe={recipe} onPress={() => openRecipe(recipe)} />)}
        </>}

        {!recipes.length && !!trending.length && <>
          <Text style={styles.sectionTitle}>Trending Recipes</Text>
          {trending.map((recipe) => <RecipeCard key={`${recipe.label}-${recipe.url}`} recipe={recipe} onPress={() => openRecipe(recipe)} compact />)}
        </>}
      </ScrollView>

      <Modal transparent visible={Boolean(selected)} animationType="slide" onRequestClose={() => setSelected(null)}>
        <View style={styles.modalBackdrop}><View style={styles.modal}>
          <Text style={styles.modalTitle}>{selected?.title || selected?.label}</Text>
          <ScrollView>
            <Text style={styles.modalHeading}>Ingredients</Text>
            {(selected?.ingredients ?? []).map((item, index) => <Text key={index} style={styles.modalText}>{item}</Text>)}
            {!!selected?.methods?.length && <Text style={styles.modalHeading}>Method</Text>}
            {(selected?.methods ?? []).map((item, index) => <Text key={index} style={styles.modalText}>{item}</Text>)}
          </ScrollView>
          <TouchableOpacity style={styles.primary} onPress={() => setSelected(null)}><Text style={styles.primaryText}>Close</Text></TouchableOpacity>
        </View></View>
      </Modal>
    </View>
  );
}

function RecipeCard({ recipe, onPress, compact = false }) {
  return <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: recipe.image }} style={[styles.recipeImage, compact && styles.compactImage]} />
    <Text style={styles.cardTitle}>{recipe.label}</Text>
    {!compact && <>
      <Text style={styles.meta}>Total Calories: {recipe.calories.toFixed(0)}</Text>
      <Text style={styles.meta}>Diet: {recipe.dietLabels.join(', ') || '—'}</Text>
      <Text style={styles.meta}>Meal: {recipe.mealType.join(', ') || '—'}</Text>
      <Text style={styles.meta}>Cuisine: {recipe.cuisineType.join(', ') || '—'}</Text>
      {!!recipe.missingIngredients.length && <Text style={styles.missing}>Missing Ingredients: {recipe.missingIngredients.join(', ')}</Text>}
    </>}
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  background:{flex:1,backgroundColor:'#161922'},page:{padding:20,paddingTop:55},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},title:{fontSize:30,fontWeight:'800',color:'#fff'},avatar:{width:48,height:48,borderRadius:24,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},avatarText:{fontSize:24},actions:{alignItems:'center',marginVertical:25},button:{backgroundColor:'#5f9ea0',padding:11,borderRadius:8,marginVertical:5},buttonText:{color:'#fff',fontWeight:'600'},imageWrap:{marginRight:12,alignItems:'center'},ingredientImage:{width:160,height:160,borderRadius:8},delete:{color:'#fff',backgroundColor:'#d22',padding:5,marginTop:5,borderRadius:4},label:{color:'#fff',fontWeight:'700',marginTop:15},input:{backgroundColor:'#fff',padding:10,borderRadius:8,marginTop:7},primary:{backgroundColor:'#5f9ea0',padding:12,borderRadius:8,alignItems:'center',marginTop:14},primaryText:{color:'#fff',fontWeight:'800'},sectionTitle:{fontSize:30,fontWeight:'800',color:'#fff',marginVertical:20},calorieRow:{flexDirection:'row',alignItems:'center',justifyContent:'center'},calorieInput:{width:110,borderWidth:1,borderColor:'#aaa',borderRadius:6,padding:8,color:'#fff'},range:{color:'#fff',marginHorizontal:10},card:{backgroundColor:'#5f9ea0',padding:12,borderRadius:10,marginBottom:12,alignItems:'center'},recipeImage:{width:'100%',height:240,borderRadius:8},compactImage:{height:200},cardTitle:{fontSize:19,fontWeight:'800',color:'#fff',marginTop:8,textAlign:'center'},meta:{color:'#fff',textAlign:'center'},missing:{color:'#fff',fontStyle:'italic',textAlign:'center',marginTop:6},modalBackdrop:{flex:1,backgroundColor:'rgba(0,0,0,.55)',justifyContent:'center',alignItems:'center'},modal:{width:'86%',maxHeight:'80%',backgroundColor:'#fff',borderRadius:12,padding:18},modalTitle:{fontSize:24,fontWeight:'800'},modalHeading:{fontSize:17,fontWeight:'800',marginTop:12},modalText:{marginTop:5,color:'#222'}
});
