import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeImage = async (base64ImageFile: string) => {
  try {
    let mimeType = "image/jpeg";
    let data = base64ImageFile;

    // Extract mime type if the input is a data URL safely without regex
    if (base64ImageFile.startsWith("data:")) {
      const commaIndex = base64ImageFile.indexOf(",");
      if (commaIndex !== -1) {
        const mimePart = base64ImageFile.slice(5, commaIndex);
        if (mimePart.endsWith(";base64")) {
          mimeType = mimePart.slice(0, -7);
        } else {
          mimeType = mimePart;
        }
        data = base64ImageFile.slice(commaIndex + 1);
      }
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
