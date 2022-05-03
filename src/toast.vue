<template>
  <div class="toast-box">
    <div
      class="message-box"
      v-for="(msg, index) of messages"
      :key="msg.id"
      v-comeing="{ index, options: msg.options }"
      v-outing="{
        messages,
        id: msg.id,
        position: msg.options.position,
        show: msg.show,
        duration: msg.options.duration,
      }"
      :id="msg.id"
      :style="getStyle(msg)"
    >
      <img
        class="icon"
        :src="getImgPath(msg.options.type)"
        width="22"
        height="22"
      />
      {{ msg.message }}
      <img
        v-if="msg.options.close"
        class="close"
        src="./img/close.png"
        @click="closeMessage(msg.id)"
        width="23"
        height="23"
      />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
let index = 0;
const colors = {
  success: "#4CAF50",
  info: "#00BCD4",
  warn: "#FF9800",
  error: "#FF5722",
};
const icons = {
  success: require("./img/success.png"),
  info: require("./img/info.png"),
  error: require("./img/error.png"),
  warn: require("./img/warn.png"),
};
const delay = (time) =>
  new Promise((resolve) => setTimeout(() => resolve(null), time));
// 元素进入动画逻辑
const moveIn = (el, value) => {
  const {
    index,
    options: { position },
  } = value;
  if (position.includes("t")) {
    const top = 30 + index * 60;
    setTimeout(() => {
      el.style.top = `${top}px`;
    });
  } else if (position.includes("b")) {
    const top = 30 + index * 60;
    setTimeout(() => {
      el.style.bottom = `${top}px`;
    });
  }
};

// 元素移除动画逻辑
const moveOut = async (el, value) => {
  const { messages, id, position } = value;
  el.classList.add("remove");
  if (position.includes("t")) {
    el.style.transform = "translateY(30px)";
  } else if (position.includes("b")) {
    el.style.transform = "translateY(-30px)";
  }
  await delay(500);
  const index = messages?.findIndex((item) => item.id === id);
  messages.splice(index, 1);
};
export default Vue.extend({
  data() {
    return {
      // 用户保护元素节点正常插入和移除，避免点击过快导致的元素异常
      isAddMessage: true,
      colors,
      icons,
      messages: [],
    };
  },
  methods: {
    getImgPath(type) {
      return this.icons[type];
    },
    setColors(colors) {
      this.colors = colors;
    },
    // 添加弹框消息
    async addMessage(message, options) {
      if (!this.isAddMessage) {
        console.log(this.isAddMessage);
        return;
      }
      const id = "toast_id_" + index++;
      this.messages.unshift({
        show: true,
        id,
        message,
        options,
      });
      if (this.messages.length > options.showCount) {
        this.isAddMessage = false;
        await delay(600);
        this.messages
          .slice(options.showCount)
          .forEach((item) => (item.show = false));
        this.isAddMessage = true;
      }
      return id;
    },
    // 关闭弹框消息
    closeMessage(id) {
      const msg = this.messages.find((item) => item.id === id);
      msg.show = false;
    },
    // 获取动态样式
    getStyle(msg) {
      const { deep, type, position } = msg.options;
      const style = {
        boxShadow: `1px 1px ${4 * deep}px ${2 * deep}px rgba(100,100,100,.3)`,
        backgroundColor: this.colors[type],
      };
      if (position.includes("t")) {
        style.top = "-50px";
      } else {
        style.bottom = "-50px";
      }
      if (position.includes("l")) {
        style.left = "30px";
      } else if (position.includes("r")) {
        style.right = "30px";
      }
      return style;
    },
  },
  directives: {
    comeing: {
      inserted(el, binding) {
        moveIn(el, binding.value);
      },
      update(el, binding) {
        moveIn(el, binding.value);
      },
    },
    outing: {
      async bind(el, binding) {
        const duration = binding.value.duration;
        if (duration < 0) return;
        await delay(duration);
        await moveOut(el, binding.value);
      },
      async update(el, binding) {
        const { show } = binding.value;
        if (show) return;
        await moveOut(el, binding.value);
      },
    },
  },
});
</script>
<style scoped>
.toast-box {
  position: relative;
  display: flex;
  justify-content: center;
}
.message-box {
  padding: 10px 20px;
  border-radius: 4px;
  color: #ffffff;
  position: fixed;
  display: flex;
  align-items: center;
  font-size: 20px;
  z-index: 999;
  opacity: 1;
  overflow: hidden;
  transform-origin: left top;
  transition: all 0.3s ease-in;
}

.message-box.remove {
  opacity: 0;
}

.icon {
  margin-right: 5px;
}
.close {
  margin-left: 30px;
  cursor: pointer;
}
</style>