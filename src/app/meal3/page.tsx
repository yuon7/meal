import React, { Suspense } from "react";
import QuizPage from "@/features/Quiz/QuizPage";
import { Loader } from "@mantine/core";

export default function Page() {
  return (
    <Suspense fallback={<Loader color="blue" size="xl" />}>
      <QuizPage />
    </Suspense>
  );
}
