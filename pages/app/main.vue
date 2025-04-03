<script setup lang="ts">
import {useSupabase} from "~/utils/supabase";
import AdminLayout from "~/src/layouts/AppLayout.vue";
import api from "~/utils/api";

definePageMeta({
  middleware: ['auth']
})
const supabase = useSupabase()
const user = useSupabaseUser()
const signOut = () => {
  supabase.auth.signOut()
}

// onMounted(async () => {
//   const session = useSupabaseSession()
//   if(session.value) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${session.value.access_token}`;
//
//     try {
//       const res = await api.get('/courses_list')
//       console.log('res', res)
//     } catch (err) {
//       console.log(err)
//     }
//   }
// })

</script>

<template>
  <div>
    <AdminLayout>
    </AdminLayout>
  </div>
</template>
