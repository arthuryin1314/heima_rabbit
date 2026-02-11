import { getTopCategoryAPI } from '@/api/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
export function useTopCategory() {
  const topCategory = ref({})
  const route = useRoute()
  async function getTopCategory() {
    const res = await getTopCategoryAPI(route.params.id)
    // console.log(res);
    topCategory.value = res.result
  }
  onMounted(() => {
    getTopCategory()
  })
  return {
    topCategory
  }
}
