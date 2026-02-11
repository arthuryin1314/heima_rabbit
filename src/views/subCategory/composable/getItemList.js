import { getSubCategoryAPI } from '@/api/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export const useItemList = () => {
  const route = useRoute()
  const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
  })

  const goodList = ref([])

  const getGoodList = async () => {
    const res = await getSubCategoryAPI(reqData.value)
    goodList.value = res.result.items
  }

  const tabChange = () => {
    reqData.value.page = 1
    getGoodList()
  }

  onMounted(() => {
    getGoodList()
  })

  return {
    goodList,
    reqData,
    getGoodList,
    tabChange
  }
}
