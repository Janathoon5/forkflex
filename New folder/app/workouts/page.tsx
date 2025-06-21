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
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, Calendar, Dumbbell } from "lucide-react"

interface Exercise {
  id: string
  name: string
  sets: { reps: number; weight: number }[]
}

interface Workout {
  id: string
  name: string
  date: string
  duration: number
  exercises: Exercise[]
}

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: "1",
      name: "Push Day",
      date: "2024-01-15",
      duration: 45,
      exercises: [
        {
          id: "1",
          name: "Bench Press",
          sets: [
            { reps: 10, weight: 135 },
            { reps: 8, weight: 155 },
            { reps: 6, weight: 175 },
          ],
        },
        {
          id: "2",
          name: "Shoulder Press",
          sets: [
            { reps: 12, weight: 65 },
            { reps: 10, weight: 75 },
            { reps: 8, weight: 85 },
          ],
        },
      ],
    },
  ])

  const [isAddingWorkout, setIsAddingWorkout] = useState(false)
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    exercises: [] as Exercise[],
  })
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: [{ reps: 0, weight: 0 }],
  })

  const addExerciseToWorkout = () => {
    if (newExercise.name) {
      const exercise: Exercise = {
        id: Date.now().toString(),
        name: newExercise.name,
        sets: newExercise.sets.filter((set) => set.reps > 0),
      }
      setNewWorkout((prev) => ({
        ...prev,
        exercises: [...prev.exercises, exercise],
      }))
      setNewExercise({ name: "", sets: [{ reps: 0, weight: 0 }] })
    }
  }

  const addSetToExercise = () => {
    setNewExercise((prev) => ({
      ...prev,
      sets: [...prev.sets, { reps: 0, weight: 0 }],
    }))
  }

  const updateSet = (index: number, field: "reps" | "weight", value: number) => {
    setNewExercise((prev) => ({
      ...prev,
      sets: prev.sets.map((set, i) => (i === index ? { ...set, [field]: value } : set)),
    }))
  }

  const saveWorkout = () => {
    if (newWorkout.name && newWorkout.exercises.length > 0) {
      const workout: Workout = {
        id: Date.now().toString(),
        name: newWorkout.name,
        date: new Date().toISOString().split("T")[0],
        duration: 0, // Would be calculated based on actual workout time
        exercises: newWorkout.exercises,
      }
      setWorkouts((prev) => [workout, ...prev])
      setNewWorkout({ name: "", exercises: [] })
      setIsAddingWorkout(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Workouts
            </h1>
            <p className="text-slate-300 text-lg">Track your training sessions</p>
          </div>
          <Dialog open={isAddingWorkout} onOpenChange={setIsAddingWorkout}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Plus className="mr-2 h-4 w-4" />
                New Workout
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-100">Add New Workout</DialogTitle>
                <DialogDescription className="text-slate-300">
                  Create a new workout session with exercises and sets
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="workout-name" className="text-slate-200">
                    Workout Name
                  </Label>
                  <Input
                    id="workout-name"
                    value={newWorkout.name}
                    onChange={(e) => setNewWorkout((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Push Day, Leg Day"
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-200">Add Exercise</h3>
                  <div>
                    <Label htmlFor="exercise-name" className="text-slate-200">
                      Exercise Name
                    </Label>
                    <Input
                      id="exercise-name"
                      value={newExercise.name}
                      onChange={(e) => setNewExercise((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Bench Press, Squats"
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-200">Sets</Label>
                    {newExercise.sets.map((set, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <span className="text-sm w-12 text-slate-300">Set {index + 1}:</span>
                        <Input
                          type="number"
                          placeholder="Reps"
                          value={set.reps || ""}
                          onChange={(e) => updateSet(index, "reps", Number.parseInt(e.target.value) || 0)}
                          className="w-20 bg-slate-700 border-slate-600 text-slate-100"
                        />
                        <span className="text-sm text-slate-300">reps @</span>
                        <Input
                          type="number"
                          placeholder="Weight"
                          value={set.weight || ""}
                          onChange={(e) => updateSet(index, "weight", Number.parseInt(e.target.value) || 0)}
                          className="w-24 bg-slate-700 border-slate-600 text-slate-100"
                        />
                        <span className="text-sm text-slate-300">lbs</span>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSetToExercise}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Add Set
                    </Button>
                  </div>

                  <Button type="button" onClick={addExerciseToWorkout} className="bg-blue-600 hover:bg-blue-700">
                    Add Exercise
                  </Button>
                </div>

                {newWorkout.exercises.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-200">Workout Preview</h3>
                    {newWorkout.exercises.map((exercise, index) => (
                      <Card key={index} className="bg-slate-700 border-slate-600">
                        <CardContent className="pt-4">
                          <h4 className="font-medium text-slate-200">{exercise.name}</h4>
                          <div className="text-sm text-slate-300">
                            {exercise.sets.map((set, setIndex) => (
                              <span key={setIndex} className="mr-2">
                                {set.reps} × {set.weight}lbs
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingWorkout(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={saveWorkout}
                    disabled={!newWorkout.name || newWorkout.exercises.length === 0}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Save Workout
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {workouts.map((workout) => (
            <Card
              key={workout.id}
              className="bg-slate-800/70 backdrop-blur-sm border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-slate-100">{workout.name}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2 text-slate-300">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(workout.date).toLocaleDateString()}
                      </span>
                      {workout.duration > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {workout.duration} min
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                    {workout.exercises.length} exercises
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workout.exercises.map((exercise) => (
                    <div key={exercise.id} className="border border-slate-600 rounded-lg p-4 bg-slate-700/50">
                      <h4 className="font-medium mb-2 text-slate-200">{exercise.name}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {exercise.sets.map((set, setIndex) => (
                          <div key={setIndex} className="text-sm bg-slate-600 rounded px-2 py-1 text-slate-200">
                            Set {setIndex + 1}: {set.reps} reps × {set.weight} lbs
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {workouts.length === 0 && (
            <Card className="bg-slate-800/70 backdrop-blur-sm border-slate-700 shadow-lg">
              <CardContent className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Dumbbell className="h-12 w-12 text-white" />
                </div>
                <p className="text-slate-300 mb-6 text-lg">No workouts logged yet</p>
                <Button
                  onClick={() => setIsAddingWorkout(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Log Your First Workout
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
