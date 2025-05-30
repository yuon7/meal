"use client";

import { useState } from "react";
import useAkinator, { questions } from "../hooks/useAkinator";

export type Answer = {
  questionId: number;
  answer: string[];
};

export const useAkinatorForm = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [textInput, setTextInput] = useState<string>("");

  const currentQuestionId = answers.length;
  const isFinished = currentQuestionId >= questions.length;
  const question = !isFinished ? useAkinator(currentQuestionId) : null;

  const handleOptionChange = (option: string) => {
    if (question?.allowMultiple) {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleNext = () => {
    const finalAnswer = question?.freeInput ? [textInput] : selectedOptions;
    if (!question?.allowEmpty && finalAnswer.length === 0) return;

    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestionId, answer: finalAnswer },
    ]);
    setSelectedOptions([]);
    setTextInput("");
  };

  return {
    question,
    isFinished,
    answers,
    selectedOptions,
    textInput,
    handleOptionChange,
    handleNext,
    setTextInput,
  };
};
