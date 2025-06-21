import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CardDescription } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { Target, Dumbbell, TrendingUp, CalendarDays } from "lucide-react"

export default function Dashboard() {
  // Mock data - in a real app, this would come from a database
  const todayStats = {
    caloriesConsumed: 1650,
    caloriesGoal: 2200,
    workoutsCompleted: 1,
    workoutsPlanned: 2,
    protein: 120,
    proteinGoal: 150,
    carbs: 180,
    carbsGoal: 220,
    fat: 65,
    fatGoal: 80,
  }

  const calorieProgress = (todayStats.caloriesConsumed / todayStats.caloriesGoal) * 100
  const proteinProgress = (todayStats.protein / todayStats.proteinGoal) * 100
  const carbsProgress = (todayStats.carbs / todayStats.carbsGoal) * 100
  const fatProgress = (todayStats.fat / todayStats.fatGoal) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-slate-300 text-lg">Let's crush your fitness goals today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Calories Today</CardTitle>
              <Target className="h-5 w-5 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayStats.caloriesConsumed}</div>
              <p className="text-xs text-blue-100">of {todayStats.caloriesGoal} goal</p>
              <div className="mt-3 bg-blue-400/30 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">Workouts</CardTitle>
              <Dumbbell className="h-5 w-5 text-emerald-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayStats.workoutsCompleted}</div>
              <p className="text-xs text-emerald-100">of {todayStats.workoutsPlanned} planned</p>
              <div className="mt-3 flex space-x-1">
                {[...Array(todayStats.workoutsPlanned)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i < todayStats.workoutsCompleted ? "bg-white" : "bg-emerald-400/30"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Protein</CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayStats.protein}g</div>
              <p className="text-xs text-purple-100">of {todayStats.proteinGoal}g goal</p>
              <div className="mt-3 bg-purple-400/30 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${Math.min(proteinProgress, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600 to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">This Week</CardTitle>
              <CalendarDays className="h-5 w-5 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-xs text-orange-100">workouts completed</p>
              <div className="mt-3 flex justify-center">
                <div className="text-2xl">🔥</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Macros Overview */}
        <Card className="mb-8 bg-slate-800/70 backdrop-blur-sm border-slate-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-slate-200 to-slate-100 bg-clip-text text-transparent">
              Today's Macros
            </CardTitle>
            <CardDescription className="text-slate-300">Track your protein, carbs, and fat intake</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="2"
                      strokeDasharray={`${proteinProgress}, 100`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-400">{Math.round(proteinProgress)}%</span>
                  </div>
                </div>
                <h3 className="font-semibold text-slate-200">Protein</h3>
                <p className="text-sm text-slate-400">
                  {todayStats.protein}g / {todayStats.proteinGoal}g
                </p>
              </div>

              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2"
                      strokeDasharray={`${carbsProgress}, 100`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-emerald-400">{Math.round(carbsProgress)}%</span>
                  </div>
                </div>
                <h3 className="font-semibold text-slate-200">Carbs</h3>
                <p className="text-sm text-slate-400">
                  {todayStats.carbs}g / {todayStats.carbsGoal}g
                </p>
              </div>

              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="2"
                      strokeDasharray={`${fatProgress}, 100`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-amber-400">{Math.round(fatProgress)}%</span>
                  </div>
                </div>
                <h3 className="font-semibold text-slate-200">Fat</h3>
                <p className="text-sm text-slate-400">
                  {todayStats.fat}g / {todayStats.fatGoal}g
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-slate-800/70 backdrop-blur-sm border-slate-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-200">Quick Actions</CardTitle>
              <CardDescription className="text-slate-300">Log your activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/workouts" className="block">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  <Dumbbell className="mr-2 h-5 w-5" />
                  Log Workout
                </Button>
              </Link>
              <Link href="/nutrition" className="block">
                <Button
                  variant="outline"
                  className="w-full border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  <Target className="mr-2 h-5 w-5" />
                  Log Food
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/70 backdrop-blur-sm border-slate-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-200">Recent Activity</CardTitle>
              <CardDescription className="text-slate-300">Your latest entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg border border-blue-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Push Day Workout</p>
                      <p className="text-xs text-slate-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-slate-300">45 min</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-900/50 to-blue-900/50 rounded-lg border border-emerald-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Chicken & Rice</p>
                      <p className="text-xs text-slate-400">4 hours ago</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-slate-300">520 cal</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-lg border border-orange-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Morning Protein Shake</p>
                      <p className="text-xs text-slate-400">6 hours ago</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-slate-300">280 cal</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
