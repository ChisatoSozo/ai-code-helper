



export const ai21API = async (prompt:string) => {
try{
  const response = await fetch("https://api.ai21.com/studio/v1/j1-jumbo/complete", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer F0V9ndUSIlDJD5kCkgt1z0oIGjINkLSk'
    },
    body: JSON.stringify({
      prompt,
      numResults: 1,
      maxTokens: 100,
      stopSequences: [`"`],
      topKReturn: 0,
      temperature: 0.7
    }),
  })
  if(!response.ok){
    return false;
  }
  const aiResponse = await response.json()
  console.log(aiResponse)

  if(aiResponse?.completions[0]?.data?.text){
    return aiResponse?.completions[0]?.data?.text.replace(`\nSaraBot: `, '') as string
  }else{
    return false
  }
}catch (e) {
  console.log(e)
  return false
}

}