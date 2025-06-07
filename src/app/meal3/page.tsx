"use client";

import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import { ProgressBar } from "@/components/Progress/Progress";
import { RadioCard } from "@/components/RadioCard/RadioCard";
import { BlockQuote } from "@/components/BlockQuote/BlockQuote";
import { allQuestions } from "@/data/questions";
import { Button, ScrollArea } from "@mantine/core";

const Page = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showSummaryPage, setShowSummaryPage] = useState<boolean>(false);
  const [isSelectionMade, setIsSelectionMade] = useState<boolean>(false);

  const totalSteps: number = allQuestions.length;

  useEffect(() => {
    const currentQuestion = allQuestions[currentQuestionIndex];
    if (!currentQuestion) return;

    const currentQuestionId = currentQuestion.id;
    const answer = answers[currentQuestionId];

    if (currentQuestion.required === false) {
      setIsSelectionMade(true);
    } else {
      setIsSelectionMade(
        Array.isArray(answer) ? answer.length > 0 : Boolean(answer)
      );
    }
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
        const answer = answers[lastQuestionId];
        setIsSelectionMade(
          Array.isArray(answer) ? answer.length > 0 : Boolean(answer)
        );
      }
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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
      <div className={styles.mainPanel}>
        <div className={styles.progress}>
          <ProgressBar
            currentStep={
              showSummaryPage ? totalSteps : currentQuestionIndex
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
                styles={{
                  root: {
                    backgroundColor: "#ff6b95",
                    "&:hover": {
                      backgroundColor: "#ff497a",
                    },
                    "&:disabled": {
                      backgroundColor: "#f8c8d0",
                      color: "#aaa",
                    },
                  },
                }}
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
              <ScrollArea.Autosize mah="55vh" scrollbarSize={8} type="auto">
                <div className={styles.summaryContent}>
                  {allQuestions.map((q) => {
                    const answer = answers[q.id];
                    const hasAnswer = Array.isArray(answer)
                      ? answer.length > 0
                      : Boolean(answer);

                    return hasAnswer ? (
                      <div key={q.id} className={styles.answerBlock}>
                        <strong>{q.text}</strong>
                        <div className={styles.answerContent}>
                          {Array.isArray(answer) ? answer.join(", ") : answer}
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </ScrollArea.Autosize>
            </div>
            <div className={styles.finalActionButtons}>
              {/* <Button size="lg" onClick={handleGoBack} variant="default">
                修正する
              </Button> */}
              <Button
                size="lg"
                onClick={handleComplete}
                className={styles.completeButton}
              >
                お店を探す
              </Button>
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