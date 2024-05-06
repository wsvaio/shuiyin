import type { Middleware } from "@wsvaio/utils";
import { compose } from "@wsvaio/utils";

export default (canvasRef: Ref<HTMLCanvasElement | undefined>) => {
  let context = $shallowRef<CanvasRenderingContext2D>();
  const middlewares = compose<{ context: CanvasRenderingContext2D; canvas: HTMLCanvasElement }>(async ({ context }) => {
    context.reset();
  });

  watchEffect(async () => {
    if (!canvasRef.value)
      return (context = undefined);
    context = canvasRef.value.getContext("2d")!;
    middlewares({ context, canvas: canvasRef.value });
  });

  const attach = async (...fns: Middleware<{ context: CanvasRenderingContext2D; canvas: HTMLCanvasElement }>[]) => {
    fns.forEach(fn => {
      middlewares.use(async (ctx, next) => {
        ctx.context.save();
        ctx.context.beginPath();
        let r = await fn(ctx, next);
        ctx.context.closePath();
        ctx.context.restore();
        if (fn.length <= 1)
          r = await next();
        return r;
      });
    });
  };
  const update = () => {
    if (!canvasRef.value)
      return (context = undefined);
    context = canvasRef.value.getContext("2d")!;
    middlewares({ context, canvas: canvasRef.value });
  };

  return {
    attach,
    update,
    middlewares,
    context: $$(context),
  };
};
