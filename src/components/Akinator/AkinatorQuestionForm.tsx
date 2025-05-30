import React from "react";

type Props = {
  question: ReturnType<
    typeof import("@/components/Akinator/hooks/useAkinator").default
  > | null;
  selectedOptions: string[];
  textInput: string;
  handleOptionChange: (opt: string) => void;
  setTextInput: (text: string) => void;
  handleNext: () => void;
};

const AkinatorQuestionForm = ({
  question,
  selectedOptions,
  textInput,
  handleOptionChange,
  setTextInput,
  handleNext,
}: Props) => {
  if (!question) return null;

  const isDisabled =
    !question.allowEmpty &&
    ((question.freeInput && textInput.trim() === "") ||
      (!question.freeInput && selectedOptions.length === 0));

  return (
    <div>
      <h2>{question.text}</h2>

      {question.options && (
        <form>
          {question.options.map((option) => (
            <label key={option} style={{ display: "block", margin: "8px 0" }}>
              <input
                type={question.allowMultiple ? "checkbox" : "radio"}
                name="option"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          ))}
        </form>
      )}

      {question.freeInput && (
        <div style={{ marginTop: "1em" }}>
          <input
            type="text"
            placeholder="キーワードを入力"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>
      )}

      <button onClick={handleNext} disabled={isDisabled}>
        次へ
      </button>
    </div>
  );
};

export default AkinatorQuestionForm;
