import Link from "next/link";
import classes from "./page.module.css";
import MealGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

async function GetMeals() {
  const meals = await getMeals();
  return <MealGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals created
          <span className={classes.highlight}>{" by you "}</span> ,
          <span className={classes.highlight}>{" for you "}</span>
        </h1>
        <p>Choose your meal and cook it. Its fun and easy!</p>
        <p>or</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favourite meal with world</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<h2 className={classes.loading}>Loading meals data...</h2>}
        >
          <GetMeals />
        </Suspense>
      </main>
    </>
  );
}
