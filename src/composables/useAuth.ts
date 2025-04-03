import { ref, onMounted } from "vue";
import { supabase } from "~/utils/supabase";

const user = ref<any>(null);
const loading = ref<boolean>(true); // Состояние загрузки

export const useAuth = () => {
  onMounted(async () => {
    const { data } = await supabase.auth.getUser();
    user.value = data.user;
    loading.value = false; // Завершаем загрузку

    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null;
    });
  });

  return { user, loading };
};
