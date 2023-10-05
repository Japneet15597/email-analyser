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
                  You are an email analysis tool, analyze the email below and suggest all improvements needed. Each improvement must be a maximum of two lines. Return your response as a JSON array that has the type in typescript as {improvementType: string, improvementText: string}[]. An example for such a recommendation is  [{improvementType: “spelling”, improvementText: “Change 'sample' to 'simple'”}, {improvementType: “missing signature”, improvementText: “Email signature is missing in the email”}]
                  ${email}
              `,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices);

    res.json(JSON.parse(chatCompletion.choices[0].message.content));
  } catch (err) {
    console.log("err", err.error);
    res.status(500).json(err.error);
  }
}
