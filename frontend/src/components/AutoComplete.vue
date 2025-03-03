<script setup>
import { ref, watch, onMounted, onUnmounted, defineEmits } from "vue";
import assetService from '@/services/assetService';

const emit = defineEmits(['update-name', 'update:modelValue'])
const props = defineProps(['modelValue', 'isDisabled'])
const isOpen = ref(false);
const results = ref([]);
const search = ref("");
const isLoading = ref(false);
const arrowCounter = ref(0);
const items = ref([]);
const heightValue = ref("");
const isResponse = ref(false);


const onChange = () =>{
  filterResults();
  isOpen.value = true
}

const filterResults = () => {
  isLoading.value = true;
  assetService
    .getUsers(search.value.toLowerCase())
    .then((response) => {
      if (response.data.length !== 0) {
        results.value = response.data.map((item) => item.name);
        heightValue.value = response.data.length * 35;
        isResponse.value = true;
      } else {
        isResponse.value = false;
        results.value = ["Brak użytkownika w bazie..."];
        heightValue.value = 40;
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const setResult = (result) => {
  search.value = result;
  emit("update-name", search.value);
  isOpen.value = false;
};

const onArrowDown = () => {
  if (arrowCounter.value < results.value.length - 1) {
    arrowCounter.value++;
  }
};

const onArrowUp = () => {
  if (arrowCounter.value > 0) {
    arrowCounter.value--;
  }
};

const onEnter = () => {
  if (results.value.length > 0) {
    search.value = results.value[arrowCounter.value];
    isOpen.value = false;
    arrowCounter.value = 0;
  }
};

const handleClickOutside = (event) => {
  if (!event.target.closest(".autocomplete")) {
    isOpen.value = false;
    arrowCounter.value = -1;
  }
};

watch(items, (newVal, oldVal) => {
  if (newVal.length !== oldVal.length) {
    results.value = newVal;
    isLoading.value = false;
  }
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

</script>



<template>
  <div class="autocomplete">
    
    <input
      type="text"
      autocomplete="off"
      style="width: 100%; height: 35px"
      name="user"
      :disabled="props.isDisabled"
      :placeholder="modelValue ? modelValue : 'Podaj litere...'"
      @input="onChange"
      v-model="search"
      @keyup.down="onArrowDown"
      @keyup.up="onArrowUp"
      @keyup.enter="onEnter"
    />

    <ul
      id="autocomplete-results"
      v-show="isOpen"
      class="autocomplete-results"
      :style="{ height: heightValue + 'px' }"
    >
      <li class="loading" v-if="isLoading">Ładowanie wyników...</li>
      <li
        v-if="isResponse"
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result }}
      </li>
      <li v-else v-for="(result, i) in results" :key="'no-user-' + i" class="autocomplete-result">
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<style>
    
.autocomplete {
  position: relative;
  width: 100%;
}

.autocomplete-results {
  max-height: 400px;
  padding: 2px;
  margin: 0;
  color: #000;
  border: 1px solid #a8a6a6;
  border-radius: 10px;
  overflow: auto;
  width: 100%;
  z-index: 100;
  position: absolute;
  background-color: #faf9f9;
  -webkit-box-shadow: 0px 4px 17px -12px rgba(66, 68, 90, 1);
-moz-box-shadow: 0px 4px 17px -12px rgba(66, 68, 90, 1);
box-shadow: 0px 4px 17px -12px rgba(66, 68, 90, 1);
}
input{
    border-radius: 5px;
    border: 1px solid rgba(60, 60, 60, .26);
    padding: 0 2px;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  border-radius: 5px;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #a0c9c2;
}

</style>