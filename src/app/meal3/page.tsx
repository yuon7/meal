"use client";

import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import { ProgressBar } from "@/components/Progress/Progress";
import { RadioCard } from "@/components/RadioCard/RadioCard";
import { BlockQuote } from "@/components/BlockQuote/BlockQuote";
import { allQuestions } from "@/data/questions";
import { Button } from "@mantine/core";

const Page = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showSummaryPage, setShowSummaryPage] = useState<boolean>(false);
  const [isSelectionMade, setIsSelectionMade] = useState<boolean>(false);

  const totalSteps: number = allQuestions.length + 1;

  useEffect(() => {
    const currentQuestionId = allQuestions[currentQuestionIndex]?.id;
    setIsSelectionMade(
      Boolean(currentQuestionId !== undefined && answers[currentQuestionId])
    );
  }, [currentQuestionIndex, answers]);

  const handleOptionChange = (selectedValue: string | string[]) => {
    const currentQuestion = allQuestions[currentQuestionIndex];
    if (!currentQuestion) return;
    const questionId = currentQuestion.id;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedValue,
    }));

    setIsSelectionMade(
      Array.isArray(selectedValue)
        ? selectedValue.length > 0
        : Boolean(selectedValue)
    );
  };

  const proceedToNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSummaryPage(true);
    }
  };

  const handleGoBack = () => {
    if (showSummaryPage) {
      setShowSummaryPage(false);
      const lastQuestionId = allQuestions[allQuestions.length - 1]?.id;
      if (lastQuestionId !== undefined) {
        setIsSelectionMade(Boolean(answers[lastQuestionId]));
      }
    } else if (currentQuestionIndex > 0) {
      const prevQuestionIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevQuestionIndex);
      const prevQuestionId = allQuestions[prevQuestionIndex]?.id;
      if (prevQuestionId !== undefined) {
        setIsSelectionMade(Boolean(answers[prevQuestionId]));
      }
    }
  };

  const handleComplete = () => {
    console.log("お店を検索する！");
    console.log("最終的な回答:", answers);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowSummaryPage(false);
    setIsSelectionMade(false);
  };

  const currentQuestion = showSummaryPage
    ? null
    : allQuestions[currentQuestionIndex];

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <ProgressBar
          currentStep={showSummaryPage ? totalSteps : currentQuestionIndex + 1}
          totalSteps={totalSteps}
        />
      </div>

      {!showSummaryPage && currentQuestion && (
        <div className={styles.currentQuestionInputArea}>
          <div className={styles.currentQuestionDisplay}>
            <BlockQuote questionText={currentQuestion.text} />
          </div>

          <div className={styles.area}>
            <RadioCard
              options={currentQuestion.options}
              onOptionChange={handleOptionChange}
              selectedValue={answers[currentQuestion.id] || null}
              allowMultiple={currentQuestion.allowMultiple}
            />
          </div>

          <div className={styles.questionNavButtons}>
            {currentQuestionIndex > 0 && (
              <Button
                onClick={handleGoBack}
                className={styles.backButton}
                variant="default"
                size="md"
              >
                戻る
              </Button>
            )}
            <Button
              onClick={proceedToNext}
              size="md"
              disabled={!isSelectionMade}
              className={styles.nextButton}
            >
              次へ
            </Button>
          </div>
        </div>
      )}

      {showSummaryPage && (
        <div className={styles.finalActionArea}>
          <h2 className={styles.finalActionTitle}>回答を確認してください</h2>
          <div className={styles.summaryAnswers}>
            {allQuestions.map((q) => (
              <div key={q.id} className={styles.answerBlock}>
                <strong>{q.text}</strong>
                <div className={styles.answerContent}>
                  {Array.isArray(answers[q.id])
                    ? (answers[q.id] as string[]).join(", ")
                    : answers[q.id]}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.finalActionButtons}>
            <button onClick={handleComplete} className={styles.completeButton}>
              お店を探す
            </button>
          </div>

          <div className={styles.resetButtonContainer}>
            <button onClick={handleReset} className={styles.resetButton}>
              最初からやり直す
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
