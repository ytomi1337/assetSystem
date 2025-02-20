<script>

import assetService from '@/services/assetService';
export default {
  name: "autocomplete",
  

  data() {
    return {
      isOpen: false,
      results: [],
      search: "",
      isLoading: false,
      arrowCounter: 0,
      items: [],
      heightValue: '',
      isResponse: false,
    };
  },

  methods: {
    onChange() {
      // Let's warn the parent that a change was made
      this.$emit("input", this.search);

      // Is the data given by an outside ajax request?
      if (this.isAsync) {
        this.isLoading = true;
      } else {
        // Let's search our flat array
        this.filterResults();
        this.isOpen = true;
      }
    },

    filterResults() {
  
      assetService.getUsers(this.search.toLowerCase()).then((response)=>{
              if (response.data.length !== 0){
                this.results = response.data.map(item => item.name)
                this.heightValue = (response.data.length * 40) - response.data.length * 5
                this.isResponse = true
              }else{
                this.isResponse = false
                this.results = ["Brak uzytkownika w bazie..."]
                this.heightValue = 40
              }
              }).catch((error) =>{
                  console.log(error);
              })
    },
    setResult(result) {
      this.search = result;
      this.$emit('update-name', this.search)
      this.isOpen = false;
    },
    onArrowDown(evt) {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    }
  },
  watch: {
    items: function(val, oldValue) {
      // actually compare them
      if (val.length !== oldValue.length) {
        this.results = val;
        this.isLoading = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    
    document.removeEventListener("click", this.handleClickOutside);
  }
};

</script>

<template>


  <div class="autocomplete">
    <label for="user">Uzytkownik:</label>
    <input type="text" autocomplete="off" style="width: 100%; height: 35px;" name="user" placeholder="Podaj litere..." 
    @input="onChange" v-model="search" @keyup.down="onArrowDown" @keyup.up="onArrowUp" @keyup.enter="onEnter" />

    <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results" :style="{height: this.heightValue + 'px'}">
      <li class="loading" v-if="isLoading">
        Loading results...
      </li>
      <li v-if="isResponse" v-for="(result, i) in results"  :key="i" @click="setResult(result)" class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }">
        {{ result }}
      </li>
      <li v-else v-for="(result) in results" class="autocomplete-result">
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