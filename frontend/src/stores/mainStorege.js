import { defineStore } from "pinia";
import { ref,  } from "vue";
import assetService from "@/services/assetService";

export const utilsStore = defineStore("utlisStore", () =>{

  const statuses = ref([]);
  const categories = ref([]);
  const phoneCategories = ref([]);
  const localizations = ref([]);
  const users = ref([]);
  const isWarranty = ref(['Aktywna', 'Wygaszona']);
  const error = ref(null);
  const loading = ref(false)

  
  const fetchData = async (apiMethod, targetArr) => {
    try {
      const response = await assetService[apiMethod]();
      targetArr.value = response.data.map((item) => item.name);
  
      
      if (apiMethod === "getCategories") {
        phoneCategories.value = targetArr.value.filter(
          (cat) => cat === "Telefon" || cat === "Karta Sim"
        );

        targetArr.value = targetArr.value.filter(
            (cat) => cat != "Telefon" && cat != "Karta Sim"
          );
      }
  
    } catch (error) {
      console.error(`Error fetching data from ${apiMethod}:`, error);
      error.value = error; 
    }
  };
  
  const loadAllData = async () => { 
    loading.value = true
    try {
      await Promise.all([
        fetchData("getStatus", statuses),
        fetchData("getCategories", categories),
        fetchData("getAllUsers", users),
        fetchData("getLocalizations", localizations),
      ]);
    } catch (err) {
      console.error("Error during data loading:", err);
    } finally {
      loading.value = false;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getFullYear())}`;
  };

  return {
    statuses,
    categories,
    phoneCategories,
    users,
    localizations,
    error,
    isWarranty,
    loading,
    loadAllData,
    formatDate
  };
})