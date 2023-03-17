<template>
  <div>
    <div>
      <canvas
        ref="canvasElement"
        id="canvas"
        class="canvas"
        width="600"
        height="250"
        @mousedown="canvasDown($event)"
        @mousemove="canvasMove($event)"
        @mouseup="canvasUp()"
        @mouseleave="canvasLeave()"
        >抱歉，您的浏览器不支持canvas元素</canvas
      >
    </div>
    <el-button
      type="primary"
      @click="onCancel"
      >取消</el-button
    >
    <el-button
      type="primary"
      @click="onClear"
      >清空</el-button
    >
    <el-button
      type="primary"
      @click="onSave"
      >保存</el-button
    >
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['cancel', 'save']);
const canvasElement = ref() as unknown as Ref<HTMLCanvasElement>;
const ctx = ref() as unknown as Ref<CanvasRenderingContext2D>;
const canvasMoveUse = ref(false);
onMounted(() => {
  ctx.value = canvasElement.value.getContext('2d') as CanvasRenderingContext2D;
  ctx.value.lineWidth = 2;
});

function canvasDown(e: MouseEvent) {
  const { clientX, clientY } = e;
  const { x, y } = canvasElement.value.getBoundingClientRect();
  canvasMoveUse.value = true;
  const canvasX = clientX - x;
  const canvasY = clientY - y;
  ctx.value.beginPath(); // 移动的起点
  ctx.value.moveTo(canvasX, canvasY);
}
function canvasMove(e: MouseEvent) {
  if (canvasMoveUse.value) {
    const { clientX, clientY } = e;
    const { x, y } = canvasElement.value.getBoundingClientRect();
    // 只有允许移动时调用
    const canvasX = clientX - x;
    const canvasY = clientY - y;
    ctx.value.lineTo(canvasX, canvasY);
    ctx.value.stroke();
  }
}
function canvasUp() {
  canvasMoveUse.value = false;
}
function canvasLeave() {
  canvasMoveUse.value = false;
}
function onCancel() {
  emit('cancel');
}

function onClear() {
  ctx.value && ctx.value.clearRect(0, 0, ctx.value.canvas.width, ctx.value.canvas.height);
}
function onSave() {
  canvasElement.value.toBlob((blob) => {
    emit('save', {
      url: URL.createObjectURL(blob as Blob),
      blob,
    });
  });
}
</script>

<style lang="scss" scoped>
.canvas {
  border: 1px solid #eeeeee;
}
</style>
