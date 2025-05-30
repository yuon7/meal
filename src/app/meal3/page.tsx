"use client";

import styles from "./page.module.css";
import { Footer } from "@/components/Footer/Footer";
import React, { useState, useEffect, useRef } from "react";
import { ProgressBar } from "@/components/Progress/Progress";
import { RadioCard } from "@/components/RadioCard/RadioCard";
import { BlockQuote } from "@/components/BlockQuote/BlockQuote";
import { ChatMessage } from "@/components/ChatMessage/ChatMessage";

interface Question {
  id: number;
  type: "question";
  text: string;
  quote?: string;
  author?: string;
  options: string[];
}

interface ChatMessageData {
  id: number;
  type: "question" | "answer";
  text: string;
  quote?: string;
  author?: string;
  questionId?: number;
}

const allQuestions: Question[] = [
  {
    id: 1,
    type: "question",
    text: "どんな雰囲気のお店がいいですか？",
    quote:
      "Life is like an npm install – you never know what you are going to get.",
    author: "Forrest Gump",
    options: ["カジュアル", "落ち着いた", "賑やか", "おしゃれ"],
  },
  {
    id: 2,
    type: "question",
    text: "どんな料理のジャンルがお好みですか？",
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    options: ["和食", "洋食", "中華", "イタリアン", "カフェ"],
  },
  {
    id: 3,
    type: "question",
    text: "予算はどれくらいですか？",
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    options: ["〜1,000円", "1,000円〜3,000円", "3,000円〜5,000円", "5,000円〜"],
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

  const handleOptionChange = (selectedValue: string) => {
    const currentQuestion = allQuestions[currentQuestionIndex];

    setChatHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      const questionId = currentQuestion.id;

      if (
        !newHistory.some(
          (item) => item.id === questionId && item.type === "question"
        )
      ) {
        newHistory.push({
          id: questionId,
          type: "question",
          text: currentQuestion.text,
          quote: currentQuestion.quote,
          author: currentQuestion.author,
        });
      }

      const existingAnswerIndex = newHistory.findIndex(
        (item) => item.type === "answer" && item.questionId === questionId
      );

      if (existingAnswerIndex !== -1) {
        newHistory[existingAnswerIndex] = {
          id: Date.now(),
          type: "answer",
          text: selectedValue,
          questionId: questionId,
        };
      } else {
        newHistory.push({
          id: Date.now(),
          type: "answer",
          text: selectedValue,
          questionId: questionId,
        });
      }

      return newHistory;
    });

    setTimeout(() => {
      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowSummaryPage(true);
        console.log("全ての質問に回答しました！最終確認画面へ遷移します。");
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
          (item) => item.id === prevQuestionId && item.type === "question"
        );

        if (indexToKeepFrom !== -1) {
          return prevHistory
            .slice(0, indexToKeepFrom + 1)
            .filter(
              (item) =>
                !(item.type === "answer" && item.questionId === prevQuestionId)
            );
        }
        return [];
      });
    }
  };

  const handleComplete = () => {
    console.log("お店を検索する！");
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setChatHistory([]);
    setShowSummaryPage(false);
    console.log("質問を最初からやり直します。");
  };

  const currentQuestion = allQuestions[currentQuestionIndex];

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
              text={message.text}
              quote={message.quote}
              author={message.author}
            />
          ))}
          {!showSummaryPage && currentQuestion && (
            <div className={styles.currentQuestionBubble}>
              <BlockQuote
                quote={currentQuestion.quote}
                author={currentQuestion.author}
                questionText={currentQuestion.text}
              />
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
                      item.questionId === currentQuestion.id
                  )?.text || null
                }
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
          <div className={styles.summaryPageArea}>
            <h2 className={styles.summaryTitle}>選択内容の確認</h2>
            <div className={styles.summaryContent}>
              {allQuestions.map((q) => {
                const answer = chatHistory.find(
                  (item) => item.type === "answer" && item.questionId === q.id
                );
                return (
                  <div key={q.id} className={styles.summaryItem}>
                    <p className={styles.summaryQuestion}>{q.text}</p>
                    <p className={styles.summaryAnswer}>
                      選択: {answer ? answer.text : "未回答"}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className={styles.summaryButtons}>
              <button onClick={handleGoBack} className={styles.backButton}>
                修正する
              </button>
              <button
                onClick={handleComplete}
                className={styles.completeButton}
              >
                この内容でお店を探す
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
