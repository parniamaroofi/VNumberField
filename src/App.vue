<template>
  <v-app id="app">
    <div class="pa-10">
      <p>بدون جدا‌‌کننده:</p>
      <NumberField
        class="mt-2"
        :maxlength="11"
        :hideDetails="true"
        v-model="number1"
        color="primary"
        variant="outlined"
        density="comfortable"
        placeholder="مثال: 09123456789"
      />

      <br />
      <v-divider></v-divider>
      <br />

      <p>همراه با جدا‌‌کننده و Append Label:</p>
      <NumberField
        :separator="true"
        class="mt-2"
        maxlength="18"
        color="primary"
        appendLabel="ریال"
        variant="outlined"
        density="comfortable"
        v-model="number2"
      />

      <NumberField
        :max="100"
        class="mt-2"
        appendLabel="%"
        variant="outlined"
        density="comfortable"
        v-model="number3"
        :maxlength="number3?.toString().substring(0, 2) == 10 ? 3 : 2"
      />
    </div>
  </v-app>
</template>

<script>
import NumberField from "@/components/NumberField.vue";
export default {
  name: "SampleFrontApp",

  components: {
    NumberField,
  },

  data() {
    return {
      number1: null,
      number2: null,
      number3: null,
    };
  },
};
</script>

<style lang="scss">
#app {
  @font-face {
    font-family: IRANSans;
    src: url("@/assets/fonts/IRANSans(FaNum).ttf");
    font-weight: normal;
  }
  min-height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: IRANSans;
}
</style>
