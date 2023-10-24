import { createMachine } from "xstate";

export const practiceMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAcBOBDAxgFwJabAFksALXAOzADpcIAbMAYgAUAlAQQGEAVASU4CiAfQDK3dq24CAIgG0ADAF1EKAPaxceVeRUgAHogCsAJgA0IAJ6IAnPIAsVQwA4AzC4DsxgIzun16wC+AeZoWHgExJhklFShOPhgInAa2lQAjgCucFrk0riwyHToFpCM7AByIgDqAqyiAKoAQoS83FJySrrI6pq42roGCIYuAGxU1iNOvnZOdiYu1obmVggz1lTu7vK2Iy7Gc8bGLkEhGPERpBTUceGJyX3k6VmwOXkFRSUQjOUCVUIAivUBGJeAB5cpCVgCQHA9oKZRIEDdDQ5AaIJxjfxY7E45aIEYjLwbLZOQx2EbGeTuazuE5Is63SLRa4MhJJWApR6ZbIPN6FYqlNhcPiCIQAMV45V4IgAEjJ4V0eqjEYMfOSqF4Ce5dnY7NTjJs8QgDS4qAtnOTSUdDCNFnSbgkmVdYqyCOzOU8edo+R9BRwePxhAAZARi7gKxHI3r9FVGUbjSbTWbzRZGzZjc0Y6nWQ5HWnBelhR2XGIOt33VKwDIAIwAtvlOQIAG7oOgZdCvfL8z7fX4AoEg8GQ6EDuGdSNKh5oobxiZTWbJo6pyyIBYOLxzKZuJxUzYuQz211EEssovljkPKhVusNh7N1vtzvvAVfIUB0USqWy+XjtQoqexggapjJqIzai4ur6oaK4IAsxhUHYmruPuepePIfg+IeZ7HlEzplncF6VjW9aEeQ95th2vJdr6r7+iKwahuGv5IpOMagKq+yGBshjyPIIzbCMNouD4RqGF4pqgZ41JOOJNJOFh5w4cyLrYe6l4MOgTZgJw2gAGa4KgtaUd61EvowIbsAAasInDghKrCED+CJ-tGOiAcBGpajqeo5tBKyCVxIybu4ZIydYXgHgW+FOqWR5qakGlaTp5D6YZxm5KZPYWdZQicBUghBiGHTOSx-5sfoiBeJx3G8fxExCSJMEBVQQXOCFMxeOFkWnNhMWnoprBwBkdDYD6Zk-H8b70cOMJiE5iplW57FGGYMEyZ5WrJrq8zyXS5CqBAcBdEefULa504ALTrLxN23bdG5GhdYx3S9vGGPmPWKX1ND0GAZ3KstQGLPBOyoZuzijEa4XrDa+yzC46HGDuxgKYyJ4qYp8VLaV52AS4TjjDiRPWBiRoI5i1KdXYOa7PsgRRSd6P4VjnovFRz6fP9AGA5S8HvTJiFBVT2ruGmFJmosMkUk4swk8cDO9UzcUVo814kY2LYUU+3aQFz5WDBMRLWB4ZIeO4nU+KLMF6iB+PWIhPi2ja8jdYWX1K6pKtUIl2l6QZRnazRevY6qByOK4djGDaNKTEcRqCSBm6IeS+PyHsqPFrhsXYYNVYjWNnMTot06dfxCF8R4vGIe9+NGgaGaS5a8zR5FQRAA */
    context: {
      questions: [
        {
          id: 1,
          question: "What's the capital of France?",
          correctAnswer: "Paris",
        },
        {
          id: 2,
          question: "Which gas do plants absorb?",
          correctAnswer: "Carbon dioxide",
        },
      ],
      currentQuestionIndex: 0,
      selectedAnswers: [],
      score: 0,
    },
    id: "practiceMachine",
    initial: "idle",
    states: {
      idle: {
        on: {
          PRACTICE_STARTED: {
            target: "practiceSession",
            actions: {
              type: "initializeQuiz",
            },
          },
        },
      },
      practiceSession: {
        initial: "questionDisplayed",
        states: {
          questionDisplayed: {
            on: {
              ANSWER_SUBMITTED: {
                target: "submissionEvaluationDisplayed",
                actions: {
                  type: "saveAnswer",
                },
              },
              NEW_QUESTION_REQUESTED: {
                target: "questionDisplayed",
                cond: "hasMoreQuestions",
                actions: {
                  type: "incrementQuestionIndex",
                },
              },
              PRACTICE_FINISHED: {
                target: "#practiceMachine.practiceResultDisplayed",
              },
              PRACTICE_LEFT: {
                target: "leaveConfirmationDisplayed",
              },
            },
          },
          submissionEvaluationDisplayed: {
            exit: {
              type: "updateScore",
            },
            on: {
              NEW_QUESTION_REQUESTED: {
                target: "questionDisplayed",
                cond: "hasMoreQuestions",
                actions: {
                  type: "incrementQuestionIndex",
                },
              },
              PRACTICE_FINISHED: {
                target: "#practiceMachine.practiceResultDisplayed",
              },
              PRACTICE_LEFT: {
                target: "leaveConfirmationDisplayed",
              },
            },
          },
          leaveConfirmationDisplayed: {
            on: {
              LEAVE_CONFIRMED: {
                target: "#practiceMachine.idle",
              },
              LEAVE_CANCELLED: {
                target: "questionDisplayed",
              },
            },
          },
        },
      },
      practiceResultDisplayed: {
        on: {
          NEW_PRACTICE_REQUESTED: {
            target: "#practiceMachine.practiceSession.questionDisplayed",
            actions: {
              type: "resetQuiz",
            },
          },
        },
      },
    },
    schema: {
      events: {} as
        | { type: "PRACTICE_STARTED" }
        | { type: "ANSWER_SUBMITTED" }
        | { type: "NEW_QUESTION_REQUESTED" }
        | { type: "PRACTICE_FINISHED" }
        | { type: "PRACTICE_LEFT" }
        | { type: "LEAVE_CONFIRMED" }
        | { type: "LEAVE_CANCELLED" }
        | { type: "NEW_PRACTICE_REQUESTED" },
      context: {} as {
        questions: unknown[];
        currentQuestionIndex: number;
        selectedAnswers: unknown[];
        score: number;
      },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      updateScore: (context, event) => {},

      initializeQuiz: (context, event) => {},

      saveAnswer: (context, event) => {},

      incrementQuestionIndex: (context, event) => {},

      resetQuiz: (context, event) => {},
    },
    services: {},
    guards: { hasMoreQuestions: (context, event) => false },
    delays: {},
  }
);
