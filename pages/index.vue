<script setup lang="ts">
import { filePicker, readAs, saveAs } from "@wsvaio/utils";
import JSZip from "jszip";

const canvasRef = $ref<HTMLCanvasElement>();
const load = reactive<Record<any, any>>({
  fontSize: 32,
  opacity: 0.5,
  color: "#ff0000",
  rotate: 45,
  gap: 32,
  text: "我爱黎明"
});

const { attach, update } = useCanvasContent($$(canvasRef));

watch(
  () => ({ ...load }),
  () => {
    update();
  }
);

attach(({ canvas }) => {
  shuiyin(canvas, load);
});

async function fileToCanvas(file: File) {
  const canvas = document.createElement("canvas")!;
  const context = canvas.getContext("2d");
  const base64 = await readAs("DataURL", file);
  const img = await dataURLToImage(base64);
  canvas.width = img.width;
  canvas.height = img.height;
  context?.drawImage(img, 0, 0);
  return canvas;
}

async function onchange(ev: any) {
  const files = ev.target.files as File[];
  if (!files?.length)
    return;

  if (files.length == 1) {
    const canvas = await fileToCanvas(files[0]);
    shuiyin(canvas, load);
    await saveAs(await canvasToFile(canvas, files[0].type));
    return;
  }
  const zip = new JSZip();
  for (const file of files) {
    try {
      const canvas = await fileToCanvas(file);
      shuiyin(canvas, load);
      zip.file(`${file.name.split(".")[0]}.png`, await canvasToFile(canvas, file.type));
    }
    catch (err) {
      console.log(file.name, err);
    }
  }
  await saveAs(await zip.generateAsync({ type: "blob" }));
}
</script>

<template>
  <article flex="~ col items-center">
    <m-form inline>
      <!-- <m-form-item label="文字">
        <m-input v-model="load.text" />
      </m-form-item> -->

      <m-form-item label="大小">
        <!-- <m-slider v-model="load.fontSize" :min="12" :max="1024" /> -->
        <m-input-number v-model="load.fontSize" />
      </m-form-item>

      <m-form-item label="透明度">
        <m-input-number v-model="load.opacity" />
      </m-form-item>

      <m-form-item label="颜色">
        <m-input v-model="load.color" type="color" />
      </m-form-item>

      <m-form-item label="旋转角度">
        <m-input-number v-model="load.rotate" />
      </m-form-item>

      <m-form-item label="间距">
        <m-input-number v-model="load.gap" />
      </m-form-item>
    </m-form>

    <m-divider />

    <!-- <m-input v-model="load.text" type="textarea" my="16px" /> -->

    <m-border mt="16px">
      <textarea
        v-model="load.text"
        box="border"
        w="256px" bg="transparent" border="none" outline="none"
        rows="3" p="1em" block
      />
    </m-border>

    <m-border mt="16px">
      <canvas ref="canvasRef" width="512" height="512" />
    </m-border>

    <m-button
      my="16px" @click="filePicker({
        multiple: true,
        webkitdirectory: true,
        onchange,
      })"
    >
      封印
    </m-button>
  </article>
</template>
