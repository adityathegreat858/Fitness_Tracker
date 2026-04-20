import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeImage = async (base64ImageFile: string) => {
  try {
    let mimeType = "image/jpeg";
    let data = base64ImageFile;

    // Extract mime type if the input is a data URL
    const match = base64ImageFile.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      mimeType = match[1];
      data = match[2];
    }

    const contents = [
      {
        inlineData: {
          mimeType: mimeType,
          data: data,
        },
      },
      {
        text: "Extract the food name and estimated calories from this image in a JSON object",
      },
    ];

    const config = {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          calories: { type: Type.NUMBER },
        },
      },
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config,
    });

    let text = response.text;
    // Strip markdown formatting if any
    if (text.startsWith("```json")) {
      text = text.replace(/^```json\n/, "").replace(/\n```$/, "");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
