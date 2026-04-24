import { neutral, positive } from "@/data/moodList";
import {
  acceptanceIntro,
  acceptanceOutro,
  intros,
  investigationIntro,
  investigationOutro,
  nurturingIntro,
  nurturingOutro,
  outros,
} from "@/data/neutral-reflection-list";
import {
  acceptanceIntro as positiveAcceptanceIntro,
  intros as positiveIntros,
  investigationIntro as positiveInvestigationIntro,
  nurturingIntro as positiveNurturingIntro,
} from "@/data/positive-reflection-list";
import {
  intros as negativeIntros,
  outros as negativeOutros,
} from "@/data/negative-reflection-list";

export function getSmartResponse({
  userMessage,
  coreMood,
  step,
}: {
  userMessage: string[];
  coreMood: string;
  step: number;
}): Promise<string[]> {
  switch (step) {
    case 1:
      return handleMoodAnalysis(userMessage, coreMood);
    default:
      return Promise.resolve([]);
  }
}

function handleMoodAnalysis(
  userMessage: string[],
  coreMood: string,
): Promise<string[]> {
  const moods = userMessage.map((m) => m.toLocaleLowerCase()).join(", ");
  let messages = [];
  const coreMoodLower = coreMood.toLocaleLowerCase();
  if (positive.includes(coreMoodLower)) {
    messages = handlePositiveMood(moods);
  } else if (neutral.includes(coreMoodLower)) {
    messages = handleNeutralMood(moods);
  } else {
    messages = handleNegativeMood(moods);
  }

  return new Promise<string[]>((resolve) =>
    setTimeout(() => resolve(messages), 1000),
  );
}

function handlePositiveMood(moods: string): string[] {
  const intro =
    positiveIntros[Math.floor(Math.random() * positiveIntros.length)];

  const acceptanceIntroMessage =
    positiveAcceptanceIntro[
      Math.floor(Math.random() * positiveAcceptanceIntro.length)
    ];

  const investigationMessageIntro =
    positiveInvestigationIntro[
      Math.floor(Math.random() * positiveInvestigationIntro.length)
    ];

  const nurturingMessageIntro =
    positiveNurturingIntro[
      Math.floor(Math.random() * positiveNurturingIntro.length)
    ];

  const messages = [
    `${intro} ${moods}.`,
    acceptanceIntroMessage,
    investigationMessageIntro,
    nurturingMessageIntro,
  ];

  return messages;
}

function handleNeutralMood(moods: string): string[] {
  const intro = intros[Math.floor(Math.random() * intros.length)];
  const outro = outros[Math.floor(Math.random() * outros.length)];
  const acceptanceIntroMessage =
    acceptanceIntro[Math.floor(Math.random() * acceptanceIntro.length)];
  const acceptanceOutroMessage =
    acceptanceOutro[Math.floor(Math.random() * acceptanceOutro.length)];
  const investigationMessageIntro =
    investigationIntro[Math.floor(Math.random() * investigationIntro.length)];
  const investigationMessageOutro =
    investigationOutro[Math.floor(Math.random() * investigationOutro.length)];
  const nurturingMessageIntro =
    nurturingIntro[Math.floor(Math.random() * nurturingIntro.length)];
  const nurturingMessageOutro =
    nurturingOutro[Math.floor(Math.random() * nurturingOutro.length)];

  const messages = [
    `${intro} ${moods}.`,
    outro,
    acceptanceIntroMessage,
    acceptanceOutroMessage,
    investigationMessageIntro,
    investigationMessageOutro,
    nurturingMessageIntro,
    nurturingMessageOutro,
  ];

  return messages;
}

function handleNegativeMood(moods: string): string[] {
  const intro =
    negativeIntros[Math.floor(Math.random() * negativeIntros.length)];
  const outro =
    negativeOutros[Math.floor(Math.random() * negativeOutros.length)];
  const acceptanceIntroMessage =
    acceptanceIntro[Math.floor(Math.random() * acceptanceIntro.length)];
  const acceptanceOutroMessage =
    acceptanceOutro[Math.floor(Math.random() * acceptanceOutro.length)];
  const investigationMessageIntro =
    investigationIntro[Math.floor(Math.random() * investigationIntro.length)];
  const investigationMessageOutro =
    investigationOutro[Math.floor(Math.random() * investigationOutro.length)];
  const nurturingMessageIntro =
    nurturingIntro[Math.floor(Math.random() * nurturingIntro.length)];
  const nurturingMessageOutro =
    nurturingOutro[Math.floor(Math.random() * nurturingOutro.length)];

  const messages = [
    `${intro} ${moods}.`,
    outro,
    acceptanceIntroMessage,
    acceptanceOutroMessage,
    investigationMessageIntro,
    investigationMessageOutro,
    nurturingMessageIntro,
    nurturingMessageOutro,
  ];

  return messages;
}
