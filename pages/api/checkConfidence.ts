import type { NextApiRequest, NextApiResponse } from "next";
import openai from "../../utils/openai";

interface ResposnseObj {
  confidenceScore: Number;
}

export default async function checkConfidenceScore(
  req: NextApiRequest,
  res: NextApiResponse<ResposnseObj>
) {
  try {
    const email = req.body.email;

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
        
        ${email}
        
        You are an email analysis tool, give this email text above a score out of 100% based upon the confidence level of the writer.
        Please give your response in the form of a json shaped like
        { confidenceScore: Number }`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log("confidence Ress", chatCompletion);

    res.json(JSON.parse(chatCompletion.choices[0].message.content));
  } catch (err) {
    console.log("err", err.error);
    res.status(500).json(err.error);
  }
}
