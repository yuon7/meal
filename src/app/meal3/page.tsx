"use client";

import styles from "./page.module.css";
// import { Footer } from "@/components/Footer/Footer";
import React, { useState, useEffect, useRef } from "react";
import { ProgressBar } from "@/components/Progress/Progress";
import { RadioCard } from "@/components/RadioCard/RadioCard";
import { BlockQuote } from "@/components/BlockQuote/BlockQuote";
import { ChatMessage } from "@/components/ChatMessage/ChatMessage";

interface Question {
  id: number;
  type: "question";
  text: string;
  options: string[];
  allowMultiple?: boolean;
}

interface ChatMessageData {
  id: number;
  type: "question" | "answer";
  text: string | string[];
  questionId?: number;
}

const allQuestions: Question[] = [
  {
    id: 1,
    type: "question",
    text: "どんな雰囲気のお店がいいですか？",
    options: ["カジュアル", "落ち着いた", "賑やか", "おしゃれ"],
  },
  {
    id: 2,
    type: "question",
    text: "どんな料理のジャンルがお好みですか？",
    options: ["和食", "洋食", "中華", "イタリアン", "カフェ"],
    allowMultiple: true,
  },
  {
    id: 3,
    type: "question",
    text: "予算はどれくらいですか？",
    options: ["〜1,000円", "1,000円〜3,000円", "3,000円〜5,000円", "5,000円〜"],
  },
  {
    id: 4,
    type: "question",
    text: "こだわりはありますか？",
    options: ["個室", "飲み放題", "食べ放題", "ペット可"],
    allowMultiple: true,
  },
];

const Page = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<ChatMessageData[]>([]);
  const [showSummaryPage, setShowSummaryPage] = useState<boolean>(false);

  const totalSteps: number = allQuestions.length + 1;
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleOptionChange = (selectedValue: string | string[]) => {
    const currentQuestion = allQuestions[currentQuestionIndex];

    setChatHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      const questionId = currentQuestion.id;

      if (
        !newHistory.some(
          (item) => item.id === questionId && item.type === "question",
        )
      ) {
        newHistory.push({
          id: questionId,
          type: "question",
          text: currentQuestion.text,
        });
      }

      const existingAnswerIndex = newHistory.findIndex(
        (item) => item.type === "answer" && item.questionId === questionId,
      );

      if (existingAnswerIndex !== -1) {
        newHistory[existingAnswerIndex] = {
          id: Date.now(),
          type: "answer",
          text: selectedValue, 
          questionId,
        };
      } else {
        newHistory.push({
          id: Date.now(),
          type: "answer",
          text: selectedValue,
          questionId,
        });
      }
      return newHistory;
    });

    setTimeout(() => {
      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowSummaryPage(true);
        console.log("全ての質問に回答しました！お店を探すステップへ。");
      }
    }, 500);
  };

  const handleGoBack = () => {
    if (showSummaryPage) {
      setShowSummaryPage(false);
      setCurrentQuestionIndex(allQuestions.length - 1);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestionId = allQuestions[currentQuestionIndex - 1].id;
      setChatHistory((prevHistory) => {
        const indexToKeepFrom = prevHistory.findIndex(
          (item) => item.id === prevQuestionId && item.type === "question",
        );
        if (indexToKeepFrom !== -1) {
          let filteredHistory = prevHistory.slice(0, indexToKeepFrom + 1);
          filteredHistory = filteredHistory.filter(
            (item) =>
              !(item.type === "answer" && item.questionId === prevQuestionId),
          );
          return filteredHistory;
        }
        return [];
      });
    }
  };

  const handleComplete = () => {
    console.log("お店を検索する！");
    console.log(
      "最終的な選択肢:",
      chatHistory.filter((item) => item.type === "answer"),
    );
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setChatHistory([]);
    setShowSummaryPage(false);
    console.log("質問を最初からやり直します。");
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

        <div className={styles.chatHistoryContainer} ref={chatHistoryRef}>
          {chatHistory.map((message) => (
            <ChatMessage
              key={message.id}
              type={message.type}
              text={
                Array.isArray(message.text) 
                  ? message.text.join(", ") 
                  : message.text
              }
            />
          ))}
          {!showSummaryPage && currentQuestion && (
            <div className={styles.currentQuestionBubble}>
              <BlockQuote questionText={currentQuestion.text} />
            </div>
          )}
        </div>

        {!showSummaryPage && currentQuestion && (
          <div className={styles.currentQuestionInputArea}>
            <div className={styles.area}>
              <RadioCard
                options={currentQuestion.options}
                onOptionChange={handleOptionChange}
                selectedValue={
                  chatHistory.findLast(
                    (item) =>
                      item.type === "answer" &&
                      item.questionId === currentQuestion.id,
                  )?.text || null
                }
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
      {/* <Footer /> */}
    </div>
  );
};

export default Page;
