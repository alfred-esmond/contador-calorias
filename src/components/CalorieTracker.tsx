import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  const normalizedActivities = useMemo(
    () =>
      activities.map((activity) => ({
        ...activity,
        category: Number(activity.category),
        calories: Number(activity.calories),
      })),
    [activities]
  );

  const caloriesConsumed = useMemo(
    () =>
      normalizedActivities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [normalizedActivities]
  );

  const caloriesBurned = useMemo(
    () =>
      normalizedActivities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [normalizedActivities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorías
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Calorías ingeridas" />
        <CalorieDisplay calories={caloriesBurned} text="Calorías gastadas" />
        <CalorieDisplay calories={netCalories} text="Calorías finales" />
      </div>
    </>
  );
}
