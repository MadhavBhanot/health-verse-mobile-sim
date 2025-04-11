
import React, { useState } from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockMeals } from '@/utils/mockData';
import { Plus, PieChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PatientDiet = () => {
  const [meals, setMeals] = useState(mockMeals);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    time: '',
  });
  const { toast } = useToast();

  // Calculate total macros
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  const handleAddMeal = () => {
    const mealToAdd = {
      id: `m${meals.length + 1}`,
      name: newMeal.name,
      calories: parseInt(newMeal.calories),
      protein: parseInt(newMeal.protein),
      carbs: parseInt(newMeal.carbs),
      fat: parseInt(newMeal.fat),
      time: newMeal.time,
    };

    setMeals([...meals, mealToAdd]);
    setNewMeal({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      time: '',
    });

    toast({
      title: "Meal added",
      description: `${mealToAdd.name} has been added to your diary`,
    });
  };

  return (
    <AuthenticatedLayout requiredRole="patient">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Diet Tracker</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-health-primary" size="icon">
                <Plus size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Meal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="meal-name">Meal Name</Label>
                  <Input
                    id="meal-name"
                    value={newMeal.name}
                    onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                    placeholder="Breakfast, Lunch, etc."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      value={newMeal.calories}
                      onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                      placeholder="kcal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      value={newMeal.time}
                      onChange={(e) => setNewMeal({ ...newMeal, time: e.target.value })}
                      placeholder="08:00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="protein">Protein (g)</Label>
                    <Input
                      id="protein"
                      type="number"
                      value={newMeal.protein}
                      onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carbs">Carbs (g)</Label>
                    <Input
                      id="carbs"
                      type="number"
                      value={newMeal.carbs}
                      onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fat">Fat (g)</Label>
                    <Input
                      id="fat"
                      type="number"
                      value={newMeal.fat}
                      onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddMeal}>Add Meal</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Daily Summary</h2>
            <PieChart size={20} className="text-health-primary" />
          </div>
          <div className="grid grid-cols-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Calories</p>
              <p className="font-bold">{totalCalories}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Protein</p>
              <p className="font-bold">{totalProtein}g</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Carbs</p>
              <p className="font-bold">{totalCarbs}g</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fat</p>
              <p className="font-bold">{totalFat}g</p>
            </div>
          </div>
        </Card>

        <h2 className="text-lg font-semibold mb-3">Today's Meals</h2>
        <div className="space-y-3">
          {meals.map((meal) => (
            <Card key={meal.id} className="p-3">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold">{meal.name}</h3>
                    <span className="text-xs text-gray-600 ml-2">{meal.time}</span>
                  </div>
                  <div className="flex space-x-2 text-xs text-gray-600 mt-1">
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>F: {meal.fat}g</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold">{meal.calories}</span>
                  <span className="text-xs text-gray-600 ml-1">kcal</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default PatientDiet;
