import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["GPT_API_KEY"],
});

export default openai;
