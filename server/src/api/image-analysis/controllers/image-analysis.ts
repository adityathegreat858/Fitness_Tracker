import { Context } from "koa";
import { analyzeImage } from "../services/gemini";

export default {
  async analyze(ctx: Context) {
    const { image } = ctx.request.body as any;
    if (!image) return ctx.badRequest("No image uploaded");
    try {
      const result = await analyzeImage(image);
      return ctx.send({ data: result });
    } catch (error) {
      ctx.internalServerError("Analysis failed", { error: error.message });
    }
  },
};
