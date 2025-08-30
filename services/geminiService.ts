import { GoogleGenAI } from "@google/genai";
import { GeminiPayload, AttendanceStatus } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const createPrompt = ({ presentPlayers, absentPlayers, sessionType, majorityPresent, coachStatus }: GeminiPayload): string => {
  const presentNames = presentPlayers.map(p => p.name).join(', ') || 'None';
  const absentInfo = absentPlayers.map(p => `${p.name} (Reason: ${p.reason})`).join(', ') || 'None';
  const coachInfo = coachStatus 
    ? `${coachStatus.name} is ${coachStatus.status}${coachStatus.status === 'ABSENT' && coachStatus.reason ? ` (Reason: ${coachStatus.reason})` : ''}` 
    : 'Coach status not available.';

  return `
    You are a Valorant team's attendance bot. Your tone is direct, informative, and slightly like a game AI.
    The team consists of 6 players and 1 coach. At least 4 players are required for a session to proceed.
    Analyze the following attendance data and generate a concise summary and a notification message.

    **Attendance Data:**
    - Session Type: ${sessionType}
    - Coach Status: ${coachInfo}
    - Majority of Players Present: ${majorityPresent ? 'Yes (4+ players)' : 'No'}
    - Present Players: ${presentNames}
    - Absent Players: ${absentInfo}

    **Task:**
    Based on the data, provide a 2-part response:
    1.  **Decision:** A clear statement about whether the session is happening or canceled based on player majority. Mention the coach's status if relevant (e.g., if they are absent).
    2.  **Notification:** If canceled, create a notification message that mentions the present players with an '@' prefix (e.g., @Player1, @Player2).

    **Example 1 (Majority Present):**
    > **Decision:** ✅ Majority present. Scrims are ON. Coach is also present. Ready up, agents.
    > **Notification:**

    **Example 2 (Majority Absent):**
    > **Decision:** ❌ Majority absent. Session is canceled. Let's regroup for the next one.
    > **Notification:** ⚠️ @Player1, @Player2 Session is canceled due to low player attendance.

    Generate the response for the provided attendance data.
  `;
};

export const generateSummaryWithGemini = async (payload: GeminiPayload): Promise<string> => {
  if (!API_KEY) {
    // Fallback for when API key is not available
    const { majorityPresent, presentPlayers, coachStatus } = payload;
    let coachMsg = '';
    if (coachStatus) {
        coachMsg = coachStatus.status === AttendanceStatus.PRESENT ? ' Coach is also present.' : ' Note: Coach is absent.';
    }

    if (majorityPresent) {
      return `\n**Decision:** ✅ Majority present. Scrims are ON. Ready up, agents.${coachMsg}`;
    } else {
      const mentions = presentPlayers.map(p => `@${p.name.split(' ')[0]}`).join(', ');
      return `\n**Decision:** ❌ Majority absent. Session is canceled. Let's regroup for the next one.\n**Notification:** ⚠️ ${mentions} Session is canceled due to low attendance.`;
    }
  }

  try {
    const prompt = createPrompt(payload);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // The Gemini response text should be clean and ready to use
    const aiText = response.text.trim();
    // The prompt guides Gemini to format the text, so we just add a newline for separation
    return `\n${aiText}`;

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to communicate with Gemini API.');
  }
};
