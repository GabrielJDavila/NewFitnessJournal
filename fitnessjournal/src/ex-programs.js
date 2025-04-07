// collection --> user logs workout on desired date(doc) -->
// exList for day(collection) --> each ex is a doc --> setsReps collection -->
// each set is a doc.

// preMadeRoutines collection --> each doc tracks a workout routine split Ex:"upper-lower" -->
// fields will match user inputs: frequency, level, etc. --> each collection
// inside routine doc is the workout for that day Ex: "upper-01, lower-01, upper-02, etc."-->
// within each day collection there are docs that is the list of exercises. Each doc has fields
// that track category, goal sets, goal reps, etc. and also have setsReps collection -->
// each set is tracked as a doc and fields are just reps and weight.

export const WorkoutRoutines = [
    // Beginner Upper/Lower
    {
      programType: "upper/lower beginner",
      level: "beginner",
      equipment: ["machines", "barbells", "dumbbells", "kettlebells", "bodyweight"],
      goals: ["build muscle", "build strength"],
      days: [
        {
            day: "Upper 01",
            exercises: [
               {order: 1, name: "Single arm dumbbell row on bench", goalSets: 3, goalReps: 8},
               {order: 2, name: "Pushup", goalSets: 3, goalReps: 8},
               {order: 3, name: "Lat pulldown", goalSets: 3, goalReps: 10},
               {order: 4, name: "Half kneeling one arm press", goalSets: 3, goalReps: 10},
               {order: 5, name: "EZ bar curl", goalSets: 3, goalReps: 10}
            ]
        },
        {
            day: "Upper 02",
            exercises: [
               {order: 1, name: "Seated cable row", goalSets: 3, goalReps: 8},
               {order: 2, name: "Incline dumbbell chest press", goalSets: 3, goalReps: 8},
               {order: 3, name: "Half kneeling one arm pulldown", goalSets: 3, goalReps: 10},
               {order: 4, name: "Barbell overhead press", goalSets: 3, goalReps: 10},
               {order: 5, name: "EZ grip cable pushdown", goalSets: 3, goalReps: 10}
            ]
        },
        {
          day: "Lower 01",
          exercises: [
            {order: 1, name: "Leg Press", goalSets: 3, goalReps: 10 },
            {order: 2, name: "Romanian Deadlift", goalSets: 3, goalReps: 10 },
            {order: 3, name: "Leg Curl Machine", goalSets: 3, goalReps: 12 },
            {order: 4, name: "Leg Extension Machine", goalSets: 3, goalReps: 12 },
            {order: 5, name: "Calf Raise Machine", goalSets: 3, goalReps: 15 }
          ]
        },
        {
          day: "Lower 02",
          exercises: [
            {order: 1, name: "Barbell Back Squat", goalSets: 3, goalReps: 8 },
            {order: 2, name: "Deadlift", goalSets: 3, goalReps: 8 },
            {order: 3, name: "Bulgarian Split Squat", goalSets: 3, goalReps: 10 },
            {order: 4, name: "Seated Calf Raise", goalSets: 3, goalReps: 15 },
            {order: 5, name: "Ab Rollout", goalSets: 3, goalReps: 12 }
          ]
        }
      ]
    },
    
    // Beginner Full Body
    {
      programType: "full body beginner",
      level: "beginner",
      equipment: ["machines", "barbells", "dumbbells", "kettlebells", "bodyweight"],
      goals: ["build muscle", "build strength"],
      days: [
        {
          day: "Full Body 01",
          exercises: [
            {order: 1, name: "Trap Bar Deadlift", goalSets: 3, goalReps: 8 },
            {order: 2, name: "Incline Dumbbell Press", goalSets: 3, goalReps: 10 },
            {order: 3, name: "Pull-ups or Assisted Pull-ups", goalSets: 3, goalReps: 8 },
            {order: 4, name: "Goblet Squat", goalSets: 3, goalReps: 12 },
            {order: 5, name: "Planks", goalSets: 3, goalReps: 30 } // seconds
          ]
        },
        {
          day: "Full Body 02",
          exercises: [
            {order: 1, name: "Back Squat", goalSets: 3, goalReps: 8 },
            {order: 2, name: "Bench Press", goalSets: 3, goalReps: 8 },
            {order: 3, name: "Bent Over Rows", goalSets: 3, goalReps: 10 },
            {order: 4, name: "Lunges", goalSets: 3, goalReps: 12 },
            {order: 5, name: "Russian Twists", goalSets: 3, goalReps: 15 }
          ]
        }
      ]
    },
    // Push, Pull, Legs routine
    {
        programType: "push/pull/legs beginner",
        level: "beginner",
        equipment: ["machines", "barbells", "dumbbells", "kettlebells", "bodyweight"],
        goals: ["build muscle", "build strength"],
        days: [
          {
            day: "Push Day",
            exercises: [
              {order: 1, name: "Bench Press", goalSets: 3, goalReps: 8 },
              {order: 2, name: "Overhead Dumbbell Press", goalSets: 3, goalReps: 10 },
              {order: 3, name: "Incline Machine Press", goalSets: 3, goalReps: 10 },
              {order: 4, name: "Tricep Pushdowns", goalSets: 3, goalReps: 12 },
              {order: 5, name: "Lateral Raises", goalSets: 3, goalReps: 12 }
            ]
          },
          {
            day: "Pull Day",
            exercises: [
              {order: 1, name: "Deadlifts", goalSets: 3, goalReps: 8 },
              {order: 2, name: "Lat Pulldown", goalSets: 3, goalReps: 10 },
              {order: 3, name: "Seated Cable Row", goalSets: 3, goalReps: 10 },
              {order: 4, name: "Face Pulls", goalSets: 3, goalReps: 12 },
              {order: 5, name: "Bicep Curls", goalSets: 3, goalReps: 12 }
            ]
          },
          {
            day: "Leg Day",
            exercises: [
              {order: 1, name: "Back Squats", goalSets: 3, goalReps: 8 },
              {order: 2, name: "Romanian Deadlifts", goalSets: 3, goalReps: 10 },
              {order: 3, name: "Leg Press", goalSets: 3, goalReps: 10 },
              {order: 4, name: "Leg Curl Machine", goalSets: 3, goalReps: 12 },
              {order: 5, name: "Calf Raises", goalSets: 3, goalReps: 15 }
            ]
          }
        ]
    }
    // Additional Intermediate and Advanced Programs would follow using similar formatting
];
  
// export const preMadeRoutines = [
//     {
//         programType: "upper/lower",
//         level: "beginner",
//         equipment: ["machines, barbells, dumbbells, kettlebells, bodyweight"],
//         goals: ["build muscle", "build strength"],
//         days: [
//             {
//                 day: "Upper 01",
//                 exercises: [
//                    {name: "Single arm dumbbell row on bench", goalSets: 3, goalReps: 8},
//                    {name: "Pushup", goalSets: 3, goalReps: 8},
//                    {name: "Lat pulldown", goalSets: 3, goalReps: 10},
//                    {name: "Half kneeling one arm press", goalSets: 3, goalReps: 10},
//                    {name: "EZ bar curl", goalSets: 3, goalReps: 10}
//                 ]
//             },
//             {
//                 day: "Upper 02",
//                 exercises: [
//                    {name: "Seated cable row", goalSets: 3, goalReps: 8},
//                    {name: "Incline dumbbell chest press", goalSets: 3, goalReps: 8},
//                    {name: "Half kneeling one arm pulldown", goalSets: 3, goalReps: 10},
//                    {name: "Barbell overhead press", goalSets: 3, goalReps: 10},
//                    {name: "EZ grip cable pushdown", goalSets: 3, goalReps: 10}
//                 ]
//             }
//         ]
//     }
// ]
