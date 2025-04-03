import {useSupabase} from "~/utils/supabase";

export const useUserStore = defineStore('user', () => {
  const supabase = useSupabase()

  const localUser = localStorage.getItem('mainUser')
  const localUserParsed = localUser ? JSON.parse(localUser) : null
  const user = ref(localUserParsed)
  const {locale} = useI18n()

  const isAdmin = computed(() => {
    if(!user.value) return false
    return user.value.role === 'admin';
  })

  const finishedLessons = computed(() => {
    if(!user.value) return null
    return user.value.finishedLessons;
  })

  const setUser = (userData: any) => {
    console.log('setUser', userData)
    user.value = userData
    localStorage.setItem('mainUser', JSON.stringify(userData))
  }

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('mainUser')
    user.value = null
    navigateTo(`/${locale.value || 'en'}/app/login`)
  }

  const incrementFinishedLesson = () => {
    if(!user.value) return
    user.value.finishedLessons = user.value.finishedLessons + 1
    localStorage.setItem('mainUser', JSON.stringify(user.value))
  }

  const route = useRoute()

  const initUser = async (isRefresh: boolean, withOutRedirect: boolean) => {
    if(user.value && !isRefresh) {
      return
    }

    const redirectToLogin = () => {
      const excludedRoutes = ["/login", "/register","/courses/view/1/1","/buy","/thanks", "/resetPassword", "/forgotPassword", "/register-steps"];

      if (route.path.includes("/app") && !excludedRoutes.some(excluded => route.path.includes(excluded))) {
        navigateTo(`/${locale.value || 'en'}/app/login`);
      }
    }

    try {
      const { data: res } = await supabase.auth.getUser();
      const { user: userData } = res;

      if (!userData) {
        console.error("Пользователь не найден, перенаправление на /app/login");
        redirectToLogin()
        return null;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.id)
        .single();

      if (error) {
        console.error("Ошибка загрузки профиля:", error.message);
        await supabase.auth.signOut();
        redirectToLogin()
        return null;
      }

      setUser(data);

      if(data.hasSub && data.showedThanks === false){
        const { error } = await supabase
          .from("profiles")
          .update({ showedThanks: true }) // Обновляем поле
          .eq("id", userData.id);

        navigateTo(`/${locale.value || 'en'}/app/thanks`);
      }


      return data; // Возвращаем профиль пользователя
    } catch (error) {
      console.error("Ошибка при инициализации пользователя:", error);
      redirectToLogin()
      return null;
    }
  }

  return { user, initUser, setUser, logout,incrementFinishedLesson, isAdmin, finishedLessons }
})