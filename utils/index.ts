export function shuiyin(canvas: HTMLCanvasElement, load: Record<any, any>) {
  const context = canvas.getContext("2d")!;
  const { width, height } = canvas;
  let { text = "", fontSize = 16, color = "black", gap = 0, opacity = 1, rotate = 0 } = load;
  if (!text)
    return;

  fontSize = +fontSize;
  fontSize < 12 && (fontSize = 12);

  gap = +gap;

  opacity = +opacity;

  rotate = +rotate;

  context.fillStyle = color;
  context.font = `${fontSize}px serif`;
  context.globalAlpha = opacity;

  context.translate(width / 2, height / 2);
  context.rotate((Math.PI / 180) * rotate);
  context.translate(-width / 2, -height / 2);

  const texts = text.split("\n");

  let w = Math.max(...texts.map((item: string) => context.measureText(item).width));
  let h = fontSize * texts.length;

  w += gap;
  h += gap;

  const x1 = width / w;
  const x2 = height / h;

  for (let i = -1; i <= x1 + 1; i++) {
    for (let j = -1; j <= x2 + 3; j++) {
      // context.translate(i * w, j * h);
      texts.forEach((item: string, index: number) => {
        // context.fillText(item, (width / x1) * i - w / 2, (height / x2) * j - h / 2 + index * h);

        context.fillText(item, i * w + context.measureText(item).width / -2, j * h + fontSize / -2 + index * fontSize);
      });
    }
  }
}

export function dataURLToImage(dataURL: any) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e: any) => reject(e);
    img.src = dataURL;
  });
}
export function canvasToFile(canvas: HTMLCanvasElement, type?: string, quality?: number) {
  return new Promise<Blob>(
    (resolve, reject) => canvas.toBlob(
      blob => blob ? resolve(blob) : reject(new Error("canvas.toBlob callback return is undefined")),
      type,
      quality
    )
  );
}
