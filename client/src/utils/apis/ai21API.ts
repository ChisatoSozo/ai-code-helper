export const ai21API = async (prompt: string, isResending: boolean) => {
  console.log(prompt);
  try {
    const response = await fetch(
      `https://api.ai21.com/studio/v1/j1-${process.env.REACT_APP_AI_SIZE}/complete`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
        body: JSON.stringify({
          prompt,
          numResults: 1,
          maxTokens: 100,
          stopSequences: [`"`],
          topKReturn: 0,
          temperature: isResending ? 0.7 : 0.7,
        }),
      }
    );
    if (!response.ok) {
      return false;
    }
    const aiResponse = await response.json();
    console.log(aiResponse);

    if (aiResponse?.completions[0]?.data?.text) {
      return aiResponse?.completions[0]?.data?.text as string;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
