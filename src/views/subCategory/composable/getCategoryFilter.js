import { getCategoryFilterAPI } from '@/api/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// 获取面包屑导航数据
export function useCategoryFilter() {
  const filterData = ref({})
  const route = useRoute()
  const getFilterData = async () => {
    const res = await getCategoryFilterAPI(route.params.id)
    filterData.value = res.result
  }
  onMounted(() => {
    getFilterData()
  })
  return {
    filterData
  }
}
