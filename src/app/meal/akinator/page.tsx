"use client";

import { useAkinatorForm } from "@/components/Akinator/hooks/useAkinatorForm";
import AkinatorResult from "@/components/Akinator/AkinatorResult";
import AkinatorQuestionForm from "@/components/Akinator/AkinatorQuestionForm";

const Page = () => {
  const {
    question,
    isFinished,
    answers,
    selectedOptions,
    textInput,
    handleOptionChange,
    handleNext,
    setTextInput,
  } = useAkinatorForm();

  return (
    <div>
      {isFinished ? (
        <AkinatorResult answers={answers} />
      ) : (
        <AkinatorQuestionForm
          question={question}
          selectedOptions={selectedOptions}
          textInput={textInput}
          handleOptionChange={handleOptionChange}
          handleNext={handleNext}
          setTextInput={setTextInput}
        />
      )}
    </div>
  );
};

export default Page;
