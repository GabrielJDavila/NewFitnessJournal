// collection --> user logs workout on desired date(doc) -->
// exList for day(collection) --> each ex is a doc --> setsReps collection -->
// each set is a doc.

// preMadeRoutines collection --> each doc tracks a workout routine split Ex:"upper-lower" -->
// fields will match user inputs: frequency, level, etc. --> each collection
// inside routine doc is the workout for that day Ex: "upper-01, lower-01, upper-02, etc."-->
// within each day collection there are docs that is the list of exercises. Each doc has fields
// that track category, goal sets, goal reps, etc. and also have setsReps collection -->
// each set is tracked as a doc and fields are just reps and weight.

