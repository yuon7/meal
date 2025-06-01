// app/page.tsx (または適切なパス)
"use client";

import styles from "./page.module.css";
import React, { useState } from "react";
import { ProgressBar } from "@/components/Progress/Progress";
import { RadioCard } from "@/components/RadioCard/RadioCard";
import { BlockQuote } from "@/components/BlockQuote/BlockQuote";
import { allQuestions, Question } from "@/data/questions"; // questions.tsからインポート

const Page = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showSummaryPage, setShowSummaryPage] = useState<boolean>(false);

  const totalSteps: number = allQuestions.length + 1;

  const handleOptionChange = (selectedValue: string | string[]) => {
    const currentQuestion = allQuestions[currentQuestionIndex];
    const questionId = currentQuestion.id;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedValue,
    }));

    setTimeout(() => {
      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowSummaryPage(true);
      }
    }, 500);
  };

  const handleGoBack = () => {
    if (showSummaryPage) {
      setShowSummaryPage(false);
    } else if (currentQuestionIndex > 0) {
      const prevQuestionIndex = currentQuestionIndex - 1;
      const questionToReAnswerId = allQuestions[prevQuestionIndex].id;

      setCurrentQuestionIndex(prevQuestionIndex);
      setAnswers(prevAnswers => {
        const newAnswers = { ...prevAnswers };
        delete newAnswers[questionToReAnswerId];
        return newAnswers;
      });
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
  };

  const currentQuestion = showSummaryPage
    ? null
    : allQuestions[currentQuestionIndex];

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.progress}>
          <ProgressBar
            currentStep={
              showSummaryPage ? totalSteps : currentQuestionIndex + 1
            }
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
                <button onClick={handleGoBack} className={styles.backButton}>
                  戻る
                </button>
              )}
              <button onClick={handleReset} className={styles.resetButtonSmall}>
                最初から
              </button>
            </div>
          </div>
        )}

        {showSummaryPage && (
          <div className={styles.finalActionArea}>
            <h2 className={styles.finalActionTitle}>お店を探しますか？</h2>
            <div className={styles.finalActionButtons}>
              <button onClick={handleGoBack} className={styles.backButton}>
                質問を修正する
              </button>
              <button
                onClick={handleComplete}
                className={styles.completeButton}
              >
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
    </div>
  );
};

export default Page;