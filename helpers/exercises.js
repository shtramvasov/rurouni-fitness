function assignExerciseHistory(exercise, exercisesHistory) {
  for (session of exercisesHistory) {
    exercise.history.push({
      id: session.session_id,
      date: session.created_on_tz,
      weight: Number(session.weight)
    });

  exercise.total_calories += Number(session.burned_calories);
  };

  exercise.weight = exercisesHistory.at(0).weight;
}

module.exports = { assignExerciseHistory }