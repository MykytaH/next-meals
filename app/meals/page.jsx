import Link from "next/link";
import classes from "./page.module.css";
import MealGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

export default async function MealsPage() {
  const meals = await getMeals();
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delitious meals created
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
        <MealGrid meals={meals} />
      </main>
    </>
  );
}
