"use server";

import { redirect } from "next/navigation";
import { saveMeals } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalid(text) {
  return !text || text.trim() === "";
}
//  !this function is triggered by useFormState, which gives 2 parameters - current state, and data submitted in action
export async function shareMeal(prevState, formData) {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  if (
    isInvalid(meal.creator) ||
    isInvalid(meal.creator_email) ||
    isInvalid(meal.title) ||
    isInvalid(meal.summary) ||
    isInvalid(meal.instructions) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.size === 0
  ) {
    // throw new Error("Wasnt able to submit");
    return {
      message: "Invalid input !!",
    };
  }

  await saveMeals(meal);
  // !next uses pages prerendered on build stage and dont revalidates them on client side
  // !revalidate path is used to force Next to revalidate page including new data
  // ! "page" revalidates only current page, "layout" revalidates all nested pages as well

  // Note: images added at request won't be available.
  // Only images that are in the data at the moment of BUILD are served by NEXT

  revalidatePath("/meals", "page");
  redirect("/meals");
}
