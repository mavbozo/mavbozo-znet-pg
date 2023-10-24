"use client";

// app/practice/page.tsx
import React from "react";
import { interpret, State } from "xstate";
import { practiceMachine } from "./machine";
import { questions } from "./../../data";
import { Question, Result, LeaveConfirmation } from "./../../components";
import { QuestionType } from "./../../data";

import { useMachine } from "@xstate/react";

interface PracticeContext {
  questions: QuestionType[];
  currentQuestionIndex: number;
  selectedAnswers: string[];
  score: number;
}

const PracticePage: React.FC = () => {
  // const [current, send] = useMachine(practiceMachine);

  const [state, setState] = React.useState<State<PracticeContext>>(
    practiceMachine.initialState
  );
  const [service, setService] = React.useState<any>(null);

  // Start the service when the component mounts
  React.useEffect(() => {
    const practiceService = interpret(practiceMachine)
      .onTransition(setState)
      .start();

    setService(practiceService);

    return () => {
      practiceService.stop();
    };
  }, []);

  const handleStartPractice = () => service.send({ type: "PRACTICE_STARTED" });
  const handleAnswerSubmit = (answer: string | null) => {
    service.send({ type: "ANSWER_SUBMITTED", answer });
    console.log(answer);
  };
  const handleNextQuestion = () =>
    service.send({ type: "NEW_QUESTION_REQUESTED" });
  // send({ type: "ANSWER_SUBMITTED" });
  // ... Add other event handlers

  return (
    <div>
      {state.matches("idle") && (
        <button onClick={handleStartPractice}>Start Practice</button>
      )}
      {state.matches("practiceSession.questionDisplayed") && (
        <>
          <Question
            data={questions[state.context.currentQuestionIndex]}
            onSubmit={handleAnswerSubmit}
          />
          <button onClick={handleNextQuestion}>Next</button>
        </>
      )}
      {state.matches("practiceSession.submissionEvaluationDisplayed") && (
        <p>Answer Submitted</p>
      )}
      {state.matches("practiceResultDisplayed") && (
        <Result
          score={state.context.score}
          onNewPractice={() => service.send({ type: "NEW_PRACTICE_REQUESTED" })}
        />
      )}
      {state.matches("practiceSession.leaveConfirmationDisplayed") && (
        <LeaveConfirmation
          onConfirm={() => service.send({ type: "LEAVE_CONFIRMED" })}
          onCancel={() => service.send({ type: "LEAVE_CANCELLED" })}
        />
      )}
      {/* You can add other UI states accordingly */}
    </div>
  );
};

export default PracticePage;
