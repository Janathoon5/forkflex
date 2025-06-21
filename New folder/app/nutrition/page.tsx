"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Plus, Trash2 } from "lucide-react"

interface FoodEntry {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  quantity: number
  meal: string
}

export default function NutritionPage() {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([
    {
      id: "1",
      name: "Chicken Breast",
      calories: 231,
      protein: 43.5,
      carbs: 0,
      fat: 5,
      quantity: 100,
      meal: "lunch",
    },
    {
      id: "2",
      name: "Brown Rice",
      calories: 216,
      protein: 5,
      carbs: 45,
      fat: 1.8,
      quantity: 100,
      meal: "lunch",
    },
  ])

  const [isAddingFood, setIsAddingFood] = useState(false)
  const [newFood, setNewFood] = useState({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    quantity: 100,
    meal: "breakfast",
  })

  // Goals (would come from user settings)
  const goals = {
    calories: 2200,
    protein: 150,
    carbs: 220,
    fat: 80,
  }

  // Calculate totals
  const totals = foodEntries.reduce(
    (acc, entry) => {
      const multiplier = entry.quantity / 100
      return {
        calories: acc.calories + entry.calories * multiplier,
        protein: acc.protein + entry.protein * multiplier,
        carbs: acc.carbs + entry.carbs * multiplier,
        fat: acc.fat + entry.fat * multiplier,
      }
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )

  const addFood = () => {
    if (newFood.name && newFood.calories > 0) {
      const food: FoodEntry = {
        ...newFood,
        id: Date.now().toString(),
      }
      setFoodEntries((prev) => [...prev, food])
      setNewFood({
        name: "",
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        quantity: 100,
        meal: "breakfast",
      })
      setIsAddingFood(false)
    }
  }

  const removeFood = (id: string) => {
    setFoodEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  const mealGroups = {
    breakfast: foodEntries.filter((entry) => entry.meal === "breakfast"),
    lunch: foodEntries.filter((entry) => entry.meal === "lunch"),
    dinner: foodEntries.filter((entry) => entry.meal === "dinner"),
    snacks: foodEntries.filter((entry) => entry.meal === "snacks"),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Nutrition
            </h1>
            <p className="text-slate-300 text-lg">Track your daily food intake</p>
          </div>
          <Dialog open={isAddingFood} onOpenChange={setIsAddingFood}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Plus className="mr-2 h-4 w-4" />
                Add Food
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-100">Add Food Entry</DialogTitle>
                <DialogDescription className="text-slate-300">
                  Log your food intake with nutritional information
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="food-name" className="text-slate-200">
                    Food Name
                  </Label>
                  <Input
                    id="food-name"
                    value={newFood.name}
                    onChange={(e) => setNewFood((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Chicken Breast"
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity" className="text-slate-200">
                      Quantity (g)
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newFood.quantity}
                      onChange={(e) =>
                        setNewFood((prev) => ({ ...prev, quantity: Number.parseInt(e.target.value) || 0 }))
                      }
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="meal" className="text-slate-200">
                      Meal
                    </Label>
                    <select
                      id="meal"
                      value={newFood.meal}
                      onChange={(e) => setNewFood((prev) => ({ ...prev, meal: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-600 bg-slate-700 text-slate-100 rounded-md"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snacks">Snacks</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="calories" className="text-slate-200">
                      Calories (per 100g)
                    </Label>
                    <Input
                      id="calories"
                      type="number"
                      value={newFood.calories}
                      onChange={(e) =>
                        setNewFood((prev) => ({ ...prev, calories: Number.parseInt(e.target.value) || 0 }))
                      }
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="protein" className="text-slate-200">
                      Protein (g per 100g)
                    </Label>
                    <Input
                      id="protein"
                      type="number"
                      step="0.1"
                      value={newFood.protein}
                      onChange={(e) =>
                        setNewFood((prev) => ({ ...prev, protein: Number.parseFloat(e.target.value) || 0 }))
                      }
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="carbs" className="text-slate-200">
                      Carbs (g per 100g)
                    </Label>
                    <Input
                      id="carbs"
                      type="number"
                      step="0.1"
                      value={newFood.carbs}
                      onChange={(e) =>
                        setNewFood((prev) => ({ ...prev, carbs: Number.parseFloat(e.target.value) || 0 }))
                      }
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fat" className="text-slate-200">
                      Fat (g per 100g)
                    </Label>
                    <Input
                      id="fat"
                      type="number"
                      step="0.1"
                      value={newFood.fat}
                      onChange={(e) => setNewFood((prev) => ({ ...prev, fat: Number.parseFloat(e.target.value) || 0 }))}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingFood(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={addFood}
                    disabled={!newFood.name || newFood.calories === 0}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Add Food
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Daily Summary */}
        <Card className="mb-8 bg-slate-800/70 backdrop-blur-sm border-slate-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-100">Today's Summary</CardTitle>
            <CardDescription className="text-slate-300">Your daily nutritional intake</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-200">Calories</span>
                  <span className="text-sm text-slate-300">
                    {Math.round(totals.calories)} / {goals.calories}
                  </span>
                </div>
                <Progress value={(totals.calories / goals.calories) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-200">Protein</span>
                  <span className="text-sm text-slate-300">
                    {Math.round(totals.protein)}g / {goals.protein}g
                  </span>
                </div>
                <Progress value={(totals.protein / goals.protein) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-200">Carbs</span>
                  <span className="text-sm text-slate-300">
                    {Math.round(totals.carbs)}g / {goals.carbs}g
                  </span>
                </div>
                <Progress value={(totals.carbs / goals.carbs) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-200">Fat</span>
                  <span className="text-sm text-slate-300">
                    {Math.round(totals.fat)}g / {goals.fat}g
                  </span>
                </div>
                <Progress value={(totals.fat / goals.fat) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meals */}
        <div className="space-y-6">
          {Object.entries(mealGroups).map(([mealName, entries]) => (
            <Card
              key={mealName}
              className="bg-slate-800/70 backdrop-blur-sm border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="capitalize text-slate-100">{mealName}</CardTitle>
                <CardDescription className="text-slate-300">
                  {entries.length} {entries.length === 1 ? "item" : "items"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {entries.length > 0 ? (
                  <div className="space-y-3">
                    {entries.map((entry) => {
                      const multiplier = entry.quantity / 100
                      return (
                        <div
                          key={entry.id}
                          className="flex items-center justify-between p-3 border border-slate-600 rounded-lg bg-slate-700/50"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-200">{entry.name}</h4>
                            <p className="text-sm text-slate-300">
                              {entry.quantity}g - {Math.round(entry.calories * multiplier)} cal
                            </p>
                            <div className="text-xs text-slate-400 mt-1">
                              P: {Math.round(entry.protein * multiplier)}g | C: {Math.round(entry.carbs * multiplier)}g
                              | F: {Math.round(entry.fat * multiplier)}g
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFood(entry.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-slate-400 text-center py-4">No items logged for {mealName}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
