"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Activity, Utensils } from "lucide-react"

interface Goals {
  calories: number
  protein: number
  carbs: number
  fat: number
  workoutsPerWeek: number
  activityLevel: string
  goal: string
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goals>({
    calories: 2200,
    protein: 150,
    carbs: 220,
    fat: 80,
    workoutsPerWeek: 4,
    activityLevel: "moderate",
    goal: "maintain",
  })

  const [userStats, setUserStats] = useState({
    age: 25,
    weight: 70,
    height: 175,
    gender: "male",
  })

  const [isEditing, setIsEditing] = useState(false)

  const calculateBMR = () => {
    // Mifflin-St Jeor Equation
    if (userStats.gender === "male") {
      return 10 * userStats.weight + 6.25 * userStats.height - 5 * userStats.age + 5
    } else {
      return 10 * userStats.weight + 6.25 * userStats.height - 5 * userStats.age - 161
    }
  }

  const calculateTDEE = () => {
    const bmr = calculateBMR()
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    }
    return bmr * activityMultipliers[goals.activityLevel as keyof typeof activityMultipliers]
  }

  const getRecommendedCalories = () => {
    const tdee = calculateTDEE()
    switch (goals.goal) {
      case "lose":
        return Math.round(tdee - 500) // 500 calorie deficit
      case "gain":
        return Math.round(tdee + 300) // 300 calorie surplus
      default:
        return Math.round(tdee)
    }
  }

  const getRecommendedMacros = (calories: number) => {
    // Standard macro distribution
    const protein = Math.round((calories * 0.25) / 4) // 25% of calories, 4 cal per gram
    const fat = Math.round((calories * 0.25) / 9) // 25% of calories, 9 cal per gram
    const carbs = Math.round((calories * 0.5) / 4) // 50% of calories, 4 cal per gram

    return { protein, carbs, fat }
  }

  const saveGoals = () => {
    // In a real app, this would save to a database
    setIsEditing(false)
    // Show success message
  }

  const useRecommended = () => {
    const recommendedCalories = getRecommendedCalories()
    const recommendedMacros = getRecommendedMacros(recommendedCalories)

    setGoals((prev) => ({
      ...prev,
      calories: recommendedCalories,
      ...recommendedMacros,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Goals
            </h1>
            <p className="text-slate-300 text-lg">Set your fitness and nutrition targets</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={
              isEditing
                ? "bg-slate-600 hover:bg-slate-700 text-white"
                : "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-white"
            }
          >
            {isEditing ? "Cancel" : "Edit Goals"}
          </Button>
        </div>

        <Tabs defaultValue="nutrition" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/70 backdrop-blur-sm shadow-lg border-slate-700">
            <TabsTrigger
              value="nutrition"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300"
            >
              Nutrition
            </TabsTrigger>
            <TabsTrigger
              value="fitness"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-slate-300"
            >
              Fitness
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-slate-300"
            >
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nutrition" className="space-y-6">
            <Card className="bg-slate-800/70 backdrop-blur-sm border-slate-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Utensils className="h-5 w-5" />
                  Nutrition Goals
                </CardTitle>
                <CardDescription className="text-slate-300">Set your daily calorie and macro targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Recommendations */}
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-slate-200">Recommended for you:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-slate-300">Calories:</span>
                      <div className="font-medium text-slate-100">{getRecommendedCalories()}</div>
                    </div>
                    {Object.entries(getRecommendedMacros(getRecommendedCalories())).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-slate-300 capitalize">{key}:</span>
                        <div className="font-medium text-slate-100">{value}g</div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 border-slate-600 text-slate-300 hover:bg-slate-600"
                    onClick={useRecommended}
                  >
                    Use Recommended
                  </Button>
                </div>

                {/* Current Goals */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="calories" className="text-slate-200">
                      Daily Calories
                    </Label>
                    <Input
                      id="calories"
                      type="number"
                      value={goals.calories}
                      onChange={(e) =>
                        setGoals((prev) => ({ ...prev, calories: Number.parseInt(e.target.value) || 0 }))
                      }
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="protein" className="text-slate-200">
                      Protein (g)
                    </Label>
                    <Input
                      id="protein"
                      type="number"
                      value={goals.protein}
                      onChange={(e) => setGoals((prev) => ({ ...prev, protein: Number.parseInt(e.target.value) || 0 }))}
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="carbs" className="text-slate-200">
                      Carbs (g)
                    </Label>
                    <Input
                      id="carbs"
                      type="number"
                      value={goals.carbs}
                      onChange={(e) => setGoals((prev) => ({ ...prev, carbs: Number.parseInt(e.target.value) || 0 }))}
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fat" className="text-slate-200">
                      Fat (g)
                    </Label>
                    <Input
                      id="fat"
                      type="number"
                      value={goals.fat}
                      onChange={(e) => setGoals((prev) => ({ ...prev, fat: Number.parseInt(e.target.value) || 0 }))}
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                </div>

                {/* Macro Breakdown */}
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-slate-200">Macro Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-300">
                      <span>Protein ({goals.protein}g × 4 cal/g):</span>
                      <span>
                        {goals.protein * 4} calories ({Math.round(((goals.protein * 4) / goals.calories) * 100)}%)
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Carbs ({goals.carbs}g × 4 cal/g):</span>
                      <span>
                        {goals.carbs * 4} calories ({Math.round(((goals.carbs * 4) / goals.calories) * 100)}%)
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Fat ({goals.fat}g × 9 cal/g):</span>
                      <span>
                        {goals.fat * 9} calories ({Math.round(((goals.fat * 9) / goals.calories) * 100)}%)
                      </span>
                    </div>
                    <div className="border-t border-slate-600 pt-2 font-medium">
                      <div className="flex justify-between text-slate-200">
                        <span>Total:</span>
                        <span>{goals.protein * 4 + goals.carbs * 4 + goals.fat * 9} calories</span>
                      </div>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <Button onClick={saveGoals} className="bg-purple-600 hover:bg-purple-700">
                    Save Nutrition Goals
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fitness" className="space-y-6">
            <Card className="bg-slate-800/70 backdrop-blur-sm border-slate-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Activity className="h-5 w-5" />
                  Fitness Goals
                </CardTitle>
                <CardDescription className="text-slate-300">Set your workout and activity targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workouts" className="text-slate-200">
                      Workouts per Week
                    </Label>
                    <Input
                      id="workouts"
                      type="number"
                      value={goals.workoutsPerWeek}
                      onChange={(e) =>
                        setGoals((prev) => ({ ...prev, workoutsPerWeek: Number.parseInt(e.target.value) || 0 }))
                      }
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="activity" className="text-slate-200">
                      Activity Level
                    </Label>
                    <Select
                      value={goals.activityLevel}
                      onValueChange={(value) => setGoals((prev) => ({ ...prev, activityLevel: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="sedentary" className="text-slate-200">
                          Sedentary (little/no exercise)
                        </SelectItem>
                        <SelectItem value="light" className="text-slate-200">
                          Light (1-3 days/week)
                        </SelectItem>
                        <SelectItem value="moderate" className="text-slate-200">
                          Moderate (3-5 days/week)
                        </SelectItem>
                        <SelectItem value="active" className="text-slate-200">
                          Active (6-7 days/week)
                        </SelectItem>
                        <SelectItem value="very_active" className="text-slate-200">
                          Very Active (2x/day, intense)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="goal" className="text-slate-200">
                    Primary Goal
                  </Label>
                  <Select
                    value={goals.goal}
                    onValueChange={(value) => setGoals((prev) => ({ ...prev, goal: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="lose" className="text-slate-200">
                        Lose Weight
                      </SelectItem>
                      <SelectItem value="maintain" className="text-slate-200">
                        Maintain Weight
                      </SelectItem>
                      <SelectItem value="gain" className="text-slate-200">
                        Gain Weight
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isEditing && (
                  <Button onClick={saveGoals} className="bg-blue-600 hover:bg-blue-700">
                    Save Fitness Goals
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-slate-800/70 backdrop-blur-sm border-slate-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Target className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Your personal stats for accurate calculations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-slate-200">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={userStats.age}
                      onChange={(e) => setUserStats((prev) => ({ ...prev, age: Number.parseInt(e.target.value) || 0 }))}
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-slate-200">
                      Gender
                    </Label>
                    <Select
                      value={userStats.gender}
                      onValueChange={(value) => setUserStats((prev) => ({ ...prev, gender: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="male" className="text-slate-200">
                          Male
                        </SelectItem>
                        <SelectItem value="female" className="text-slate-200">
                          Female
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-slate-200">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={userStats.weight}
                      onChange={(e) =>
                        setUserStats((prev) => ({ ...prev, weight: Number.parseInt(e.target.value) || 0 }))
                      }
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-slate-200">
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={userStats.height}
                      onChange={(e) =>
                        setUserStats((prev) => ({ ...prev, height: Number.parseInt(e.target.value) || 0 }))
                      }
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                </div>

                {/* Calculations */}
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-slate-200">Your Calculations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-300">BMR (Basal Metabolic Rate):</span>
                      <div className="font-medium text-slate-100">{Math.round(calculateBMR())} calories/day</div>
                    </div>
                    <div>
                      <span className="text-slate-300">TDEE (Total Daily Energy Expenditure):</span>
                      <div className="font-medium text-slate-100">{Math.round(calculateTDEE())} calories/day</div>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <Button onClick={saveGoals} className="bg-purple-600 hover:bg-purple-700">
                    Save Profile
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
