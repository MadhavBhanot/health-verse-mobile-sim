
import React, { useState } from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockRecipes } from '@/utils/mockData';
import { Search } from 'lucide-react';

const PatientRecipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(mockRecipes[0]);
  
  const filteredRecipes = mockRecipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highProteinRecipes = mockRecipes.filter(recipe => recipe.protein >= 20);
  const lowCarbRecipes = mockRecipes.filter(recipe => recipe.carbs <= 30);

  return (
    <AuthenticatedLayout requiredRole="patient">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Healthy Recipes</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search recipes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="high-protein" className="flex-1">High Protein</TabsTrigger>
            <TabsTrigger value="low-carb" className="flex-1">Low Carb</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} setSelectedRecipe={setSelectedRecipe} />
            ))}
          </TabsContent>
          
          <TabsContent value="high-protein" className="space-y-4">
            {highProteinRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} setSelectedRecipe={setSelectedRecipe} />
            ))}
          </TabsContent>
          
          <TabsContent value="low-carb" className="space-y-4">
            {lowCarbRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} setSelectedRecipe={setSelectedRecipe} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AuthenticatedLayout>
  );
};

const RecipeCard = ({ recipe, setSelectedRecipe }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="flex overflow-hidden cursor-pointer" onClick={() => setSelectedRecipe(recipe)}>
          <div 
            className="w-1/3 h-24 bg-cover bg-center"
            style={{ backgroundImage: `url(${recipe.image})` }}
          ></div>
          <div className="w-2/3 p-3">
            <h3 className="font-semibold text-sm line-clamp-1">{recipe.name}</h3>
            <div className="flex space-x-3 text-xs text-gray-600 mt-1">
              <span>{recipe.calories} kcal</span>
              <span>P: {recipe.protein}g</span>
              <span>C: {recipe.carbs}g</span>
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{recipe.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <div 
            className="w-full h-48 bg-cover bg-center rounded-md mb-4"
            style={{ backgroundImage: `url(${recipe.image})` }}
          ></div>
          
          <div className="grid grid-cols-4 text-center mb-4">
            <div>
              <p className="text-sm text-gray-600">Calories</p>
              <p className="font-bold">{recipe.calories}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Protein</p>
              <p className="font-bold">{recipe.protein}g</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Carbs</p>
              <p className="font-bold">{recipe.carbs}g</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fat</p>
              <p className="font-bold">{recipe.fat}g</p>
            </div>
          </div>
          
          <h3 className="font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc pl-5 mb-4 text-sm">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          
          <h3 className="font-semibold mb-2">Instructions</h3>
          <p className="text-sm">{recipe.instructions}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientRecipes;
