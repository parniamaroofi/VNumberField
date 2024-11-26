<template>
  <div class="number-field">
    <v-text-field
      type="tel"
      pattern="[0-9\u0660-\u0669\u06F0-\u06F9]+([\.,][0-9\u0660-\u0669\u06F0-\u06F9]+)?"
      v-model="fieldValue"
      @input="updateValue"
      @keydown="preventLetters"
      @blur="max ? checkMaxVlue() : ''"
      :dir="appendLabel ? 'ltr' : 'rtl'"
      :label="label ? label : undefined"
      :color="color ? color : undefined"
      :variant="variant ? variant : undefined"
      :density="density ? density : undefined"
      :maxlength="maxlength ? maxlength : undefined"
      :hide-details="hideDetails ? hideDetails : false"
      :placeholder="placeholder ? placeholder : undefined"
      :oninput="
        maxlength
          ? 'javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);'
          : undefined
      "
    >
      <template v-slot:append-inner>
        <div v-if="fieldValue" class="text-[14px]">{{ appendLabel }}</div>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: "TaalNewFrontendMoneyField",

  props: [
    "max",
    "label",
    "color",
    "variant",
    "density",
    "separator",
    "maxlength",
    "modelValue",
    "hideDetails",
    "appendLabel",
    "placeholder",
  ],

  data() {
    return {};
  },

  mounted() {},

  methods: {
    updateValue(event) {
      var NumberRegex = /[^0-9\u0660-\u0669\u06F0-\u06F9]/g;
      if (!NumberRegex.test(Number(event.data))) {
        if (this.separator) {
          this.$emit(
            "update:modelValue",
            Number(event.target.value.replaceAll(",", ""))
          );
        } else {
          this.$emit(
            "update:modelValue",
            event.target.value.replaceAll(",", "")
          );
        }
      }
    },

    checkMaxVlue() {
      if (this.modelValue > this.max) {
        this.$emit("update:modelValue", this.max);
      }
    },

    preventLetters(event) {
      const isNumber = event.key.match(/[0-9\u0660-\u0669\u06F0-\u06F9]/);
      if (
        isNumber ||
        event.key == "Backspace" ||
        (event.ctrlKey && (event.code === "KeyV" || event.key === "v")) ||
        (event.ctrlKey && (event.code === "KeyC" || event.key === "c")) ||
        (event.ctrlKey && event.code === "KeyX") ||
        (event.ctrlKey && event.code === "KeyA") ||
        (event.ctrlKey && event.code === "KeyZ") ||
        event.key == "Tab"
      ) {
      } else {
        event.preventDefault();
      }
    },

    convertPersianToLatinNumbers(input) {
      const persianToLatinMap = {
        "۰": "0",
        "۱": "1",
        "۲": "2",
        "۳": "3",
        "۴": "4",
        "۵": "5",
        "۶": "6",
        "۷": "7",
        "۸": "8",
        "۹": "9",
      };

      return input.replace(/[۰-۹]/g, (match) => persianToLatinMap[match]);
    },
  },

  computed: {
    fieldValue: {
      get() {
        if (this.modelValue) {
          this.fieldValue = this.convertPersianToLatinNumbers(
            this.modelValue.toString().replaceAll(",", "")
          );
        }

        if (this.separator) {
          return this.modelValue
            ? Number(
                this.modelValue.toString().replaceAll(",", "")
              ).toLocaleString()
            : "";
        } else {
          return this.modelValue
            ? this.modelValue.toString().replaceAll(",", "")
            : "";
        }
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style lang="scss">
.number-field {
  input {
    padding-left: 5px !important;
  }
}
</style>
