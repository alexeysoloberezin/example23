export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  messages: {
    en: {
      ref: "I bought the course, update the account",
      thx: {
        title: "Thank you for your purchase!",
        txt: "Your payment has been successfully processed.",
        action: "Go to the course page",
      },
      acc: {
        premium: "Premium account",
        free: "Free account"
      },
      registerPage: {
        spam: "Check your spam folder if the message hasn’t arrived!",
        confirm: "I want to confirm my email.",
        title: "Simple registration in 3 steps",
        subtitle: "Register to get free access",
        form: {
          email: "Email",
          password: "Password",
          country: "Country",
          phone: "Phone",
          register: "Register",
          auth: "Login",
        },
        message: {
          confirm_email: "You will not be able to recover your account password if you do not confirm your email!",
        },
        button: {
          back: "Back",
        },
      },
      benefits: {
        income: {
          title: "Increase <br/> your income",
          status: "On average, employers are willing to pay 20% more to employees who master AI tools"
        },
        time: {
          title: "Start saving <br/> up to 80% of your time",
          status: "You will be able to delegate routine tasks to artificial intelligence and save time and money"
        },
        skills: {
          title: "You will acquire <br/> a whole range of skills",
          status: "These skills will help you complete routine tasks faster and make creative tasks more engaging"
        }
      },
      title: {
        auth: "I have Account",
        register: "Registration",
        register_subtitle: "Create an account before starting the course"
      },
      course: {
        message: "Confirm the completion of the last available lesson.",
        message_2: "At the bottom of the lesson, there is a confirmation button.",
        homeWork: "Homework",
        labelHw: "Uploaded assignment:",
        comment: "Comment",
        example: "Examples of work:",
        exampleOfScene: "Example of script",
        audioStory: 'Audio',
        download: 'Download',
        hailuo: "Video tutorial for the Hailuo AI",
        def: "Original version: Image To Image",
        ex: "Variant"
      },
      buy: {
        title: "Buy Course",
        price: "Price: $10 (payment available worldwide)",
        price_15: "Price: $15 (payment available worldwide)",
        choose: "Choose a currency:",
        choose_2: "Choose a payment method:",
        pc_2: "Select a payment method",
        pc_1: "Select a currency",
        li: "If you were not redirected, click here",
      },
      action: {
        back: "Back",
        next: "Next",
        send: "Send",
        remove: "Delete",
        buyBtn: "Buy course",
        buy: "Take the course!",
        fullContent: "Full lesson content",
      },
      nav: {
        chooseLocale: "Choose locale",
        prevLesson: "Previous lesson",
        nextLesson: "Next lesson",
        link_1: "Examples",
        link_2: "For whom",
        link_3: "Course program",
        link_4: "Students",
        lk: "Account",
        link_admin_1: "Courses",
        link_admin_2: "My homework",
        link_admin_3: "Admin panel",
        logout: "Logout"
      },
      form: {
        email: "Email",
        phone: "Phone",
        country: "Country",
        password: "Password",
        enter: "Login",
        register: "Register",
        auth: "Authorization",
        createAcc: "Create an account"
      },
      courseNumber: "Lesson:",
      dashboard: {
        orders: {
          title: "Orders",
          icon: "🛒",
          value: "152",
          status: "20 in the last 7 days"
        },
        reviews: {
          title: "Positive Reviews",
          icon: "📍",
          value: "87%",
          status: ""
        },
        portfolio: {
          title: "Portfolio",
          icon: "📦",
          value: "9 cases in portfolio"
        },
        duration: {
          title: "Duration",
          icon: "💬",
          value: "14 hours of training",
          status: "Video lessons + practical assignments"
        }
      },
      landing: {
        bannerText: "‼️Super Deal! Only now for $10.00 instead of <s>$20.00</s>!",
        bannerText_15: "‼️ Super Deal! Only now for $15.00 instead of <s>$30.00</s>!",
        timeCourse: "Lesson duration:",
        text1: '🔥 Learn to create awesome content with AI!',
        text2: "📲 No experience or complicated software needed - can be done from your phone",
        text3: "🎬 Watch the video now and grab a free lesson!",
        title: '🚀 Express Course in 2 Hours',
        txt_33: "Watch the video and grab a free lesson",
        subtitle: "Master free AI tools for text, image, and video generation – easily, quickly, and without cost",
        btns: {
          takeCourse: 'Get the lesson',
          trailer: 'Course Trailer'
        },
        sticker: "Bonus lesson 'NEURO-PHOTOSESSION' + guide 'AI-Money' as a gift!",
        aboutUs: {
          title: "CREATE CREATIVE IMAGES AND VIDEOS WITH AI",
          subtitle: "Create stunning videos for Reels, TikTok, and Instagram in just a few minutes! Free AI tools and step-by-step lessons will help you. See examples of the work you’ll be able to create after completing the course."
        },
        for: {
          title: "Who will benefit from the course?",
          subtitle: "Analysts predict major changes in the job market over the next 5-10 years, and the ability to effectively use AI will become a key asset for professionals.",
          cards: [
            {
              title: "Content creators <br/> and bloggers",
              text: "Create unique photos and videos for social media without graphic design skills. Stand out among millions, set trends, and attract a new audience."
            },
            {
              title: "Marketers and business owners",
              text: "Quickly create creative content for advertising. Save time and budget on design, focusing on strategy and business growth."
            },
            {
              title: "Aspiring artists and designers",
              text: "Enhance your portfolio and find new ideas using AI. Create art and concepts that will impress even professionals."
            },
            {
              title: "For those who want to earn freely.",
              text: "Don't miss your chance: technology opens up new opportunities, and those who act today achieve more tomorrow."
            }
          ]
        },
        result: {
          title: "By completing the training, you will:"
        },
        examples: {
          title: "Examples of our students' work <br/> after completing the course"
        },
        footer: {
          offer: "Offer",
          pols: "Privacy Policy"
        },
        aboutMe: {
          title: "About me",
          content: `<div>
            Hi! My name is Ana. I am a digital creator, AI expert, and founder of the NEURO AURA brand.
          </div>
          <div>
            I help people unlock their creativity and create stunning content using artificial intelligence.
            My mission is to make technology accessible to everyone and to show how AI can transform
            creativity, business, and self-expression.
          </div>
          - Founder of NEURO AURA – a brand that merges art and cutting-edge technology<br/>
          - Author of the NEURO VISION course – teaching how to use free AI tools to create content without complex software<br/>
          - Creator and consultant – helping bloggers, brands, and businesses bring unique ideas to the digital space<br/>`
        },
        programm: {
          title: "Course Program",
          cards: [
            {
              title: "How to use GPTChat.com and where it can be useful",
              text: "<b>Lesson goal:</b> Learn how to use GPTChat, explore its features, and understand how to formulate effective prompts. <b>Lesson content:</b>",
              list: [
                "Main functions of GPT-Chat",
                "Practical use of voice assistant",
                "Solving tasks with GPT-Chat"
              ],
              time: "00:10:33"
            },
            {
              title: "Working in Microsoft Designer. Writing video scripts with GPT Chat. Prompt creation rules",
              text: "<b>Lesson goal:</b> Learn to create effective prompts for image and script generation. Rules for creating structured animation scripts. <b>Lesson content:</b>",
              list: [
                "Prompts for images",
                "Video scriptwriting",
                "Generating animation scripts",
                "Practical tips and life hacks"
              ],
              time: "00:18:47"
            },
            {
              title: "Types of video generation",
              text: "<b>Lesson goal:</b> Learn about three types of video generation: Text-to-Video, Image-to-Video, Video-to-Video. Explore their features and applications. <b>Lesson content:</b>",
              list: [
                "Generating video from text",
                "Converting an image to video",
                "Modifying an existing video"
              ],
              time: "00:03:04"
            },
            {
              title: "Creating images and videos in Shedevrum",
              text: "<b>Lesson goal:</b> Learn how to create images and transform them into videos using free tools on the Shedevrum platform. <b>Lesson content:</b>",
              list: [
                "Creating an image with text prompts",
                "Creating a video from an image"
              ],
              time: "00:05:15"
            },
            {
              title: "Creating videos and digital avatars in MyHeritage",
              text: "<b>Lesson goal:</b> Get familiar with MyHeritage AI features, including free tools like color restoration for black-and-white photos, face animation, and digital avatars with DeepStory. <b>Lesson content:</b>",
              list: [
                "Working with color restoration",
                "Animating faces in photos",
                "Creating digital avatars with DeepStory"
              ],
              time: "00:08:38"
            },
            {
              title: "Image generation in Leonardo AI",
              text: "<b>Lesson goal:</b> Explore the Leonardo AI platform and its features: Image Creation and Upscaler. <b>Lesson content:</b>",
              list: [
                "Leonardo AI platform",
                "Working with Image Creation",
                "Working with Upscaler"
              ],
              time: "00:08:10"
            },
            {
              title: "Generating videos in Vidu and voice-over creation in ElevenLabs",
              text: "<b>Lesson goal:</b> Learn how to create video animations with Vidu AI and generate audio tracks using ElevenLabs to prepare basic materials for video editing. <b>Lesson content:</b>",
              list: [
                "Introduction to Vidu – AI video generation features",
                "Step-by-step guide for image-to-video",
                "Creating scenes for a video – generating dynamic shots with prepared images and precise prompts",
                "Introduction to ElevenLabs – creating realistic voice-overs for videos"
              ],
              time: "00:18:35"
            },
            {
              title: "Creating videos with CapCut",
              text: "<b>Lesson goal:</b> Learn basic video editing skills in the CapCut mobile app, including importing files, trimming, adding music and text, applying filters, effects, and transitions. <b>Lesson content:</b>",
              list: [
                "CapCut basics",
                "Applying effects",
                "Practical task"
              ],
              time: "00:19:39"
            }
          ]
        },
        offer: {
          title: "PUBLIC OFFER AGREEMENT",
          sections: {
            general: "GENERAL PROVISIONS",
            subject: "SUBJECT OF THE AGREEMENT",
            order_payment: "ORDERING AND PAYMENT PROCEDURE",
            rights_obligations: "RIGHTS AND OBLIGATIONS OF THE PARTIES",
            refund_liability: "REFUNDS AND LIABILITY",
            force_majeure: "FORCE MAJEURE",
            final_provisions: "FINAL PROVISIONS",
          },
          content: {
            general: [
              "This document is a public offer by the NEURO AURA project and contains the terms of access to educational materials.",
              "By purchasing access to the NEURO VISION course, the user confirms their acceptance of the Offer terms.",
              "The offer is considered accepted from the moment the Buyer pays for the Seller's services.",
              "'Platform' refers to the website neuro-aura.com used by the Seller to provide access to educational materials."
            ],
            subject: [
              "The Seller provides the Buyer with access to the educational materials of the NEURO VISION course.",
              "Access is provided in electronic format through the Seller's web platform.",
              "Course access is granted indefinitely, but conditions may change in the future."
            ],
            order_payment: [
              "Course payment is made through the Lavatop payment system. The Seller does not have access to payment data.",
              "To place an order, the Buyer must register by providing an email and phone number.",
              "Access to the course is granted automatically after payment confirmation.",
              "Course prices are listed on the website and may change at the Seller's discretion."
            ],
            rights_obligations: [
              "The Seller undertakes to provide access to educational materials after payment.",
              "The Buyer undertakes to use the materials only for personal learning and not to share access with third parties.",
              "The Seller has the right to restrict access in case of violations."
            ],
            refund_liability: [
              "Refunds are only possible if the course has not been opened after purchase.",
              "The Seller is not responsible for learning outcomes or technical failures.",
              "If intellectual property rights are violated, access is blocked without a refund."
            ],
            force_majeure: [
              "The parties are exempt from liability for non-performance of obligations in case of force majeure circumstances."
            ],
            final_provisions: [
              "The Seller reserves the right to make changes to the Offer without prior notice.",
              "All questions and claims are accepted via email: neuro.aura@mail.ru.",
              "Applicable law – the legislation of the Russian Federation."
            ]
          }
        },
        privacyPolicy: {
          title: "Privacy Policy",
          sections: {
            general: "1. General Provisions",
            purposes: "2. Purpose of Data Processing",
            types: "3. Types of Personal Data",
            usage: "4. Use of Personal Data",
            storage: "5. Data Retention Period",
            security: "6. Data Security",
            rights: "7. User Rights",
            updates: "8. Policy Updates",
            contacts: "9. Contacts"
          },
          content: {
            general: [
              "1.1. This Privacy Policy (hereinafter referred to as the 'Policy') defines the procedure for processing and protecting personal data of users (hereinafter referred to as 'User' or 'You') when using the [insert website or company name] website (hereinafter referred to as the 'Site').",
              "1.2. The Site processes only the email addresses of Users necessary for the following purposes."
            ],
            purposes: [
              "2.1. We collect and process your email for the following purposes:",
              "Registration on the website.",
              "Sending notifications related to the learning process (e.g., registration confirmations, access to materials).",
              "Sending informational messages or marketing materials (if the User has given consent)."
            ],
            types: ["3.1. We only process email addresses. We do not collect or store other personal data such as name, address, phone number, etc."],
            usage: [
              "4.1. We use your email exclusively for the purposes specified in section 2.1. We do not share your email with third parties, except when necessary to fulfill a contract (e.g., using third-party services for notifications)."
            ],
            storage: ["5.1. We store your email in our system as long as you remain a registered user of our website or until you unsubscribe from mailings (if applicable)."],
            security: [
              "6.1. We take all reasonable measures to protect your email from unauthorized access and data leaks.",
              "6.2. All data transmission on our site occurs through secure communication channels."
            ],
            rights: [
              "7.1. Users have the right to access, correct, or delete their data. To do this, please contact us using the contact information provided on the website.",
              "7.2. Users also have the right to withdraw their consent to data processing at any time by unsubscribing from mailings."
            ],
            updates: ["8.1. We may update this Policy from time to time. All changes will be published on this page and will take effect upon publication."],
            contacts: ["9.1. For more information about data processing policies or to exercise your rights, you can contact us via email: neuro.aura@mail.ru"]
          }
        }
      }
    },
    ru: {
      ref: "Я купил курс, обновить аккаунт",
      thx: {
        title: "Спасибо за вашу покупку!",
        txt: "Ваш платеж успешно обработан.",
        action: "Перейти на страницу курса",
      },
      acc: {
        premium: "Премиум аккаунт",
        free: "Бесплатный аккаунт"
      },
      registerPage: {
        spam: "Проверьте папку спама, если сообщение не пришло!",
        confirm: "Я хочу подтвердить почту.",
        title: "Простая регистрация в 3 шага ",
        subtitle: "Пройти регистрацию, чтобы получить бесплатный доступ ",
        form: {
          email: "Электронная почта",
          password: "Пароль",
          country: "Страна",
          phone: "Телефон",
          register: "Зарегистрироваться",
          auth: "У меня есть аккаунт",
        },
        message: {
          confirm_email: "Вы не сможете восстановить пароль от аккаунта, если не подтвердите почту!",
        },
        button: {
          back: "Назад",
        },
      },
      benefits: {
        income: {
          title: "Увеличите <br/> свой доход",
          status: "В среднем, работодатели готовы платить на 20% больше сотрудникам, владеющим нейросетями"
        },
        time: {
          title: "Начнете экономить <br/> до 80% времени",
          status: "Сможете делегировать искусственному интеллекту рутинные процессы и экономить своё время и деньги"
        },
        skills: {
          title: "Вы получите - <br/> целый ряд навыков",
          status: "Которые позволят делать рутинные задачи быстрее, а творческие — интереснее"
        }
      },
      title: {
        auth: "Авторизация",
        register: "Регистрация",
        register_subtitle: "Перед началом курса создайте аккаунт"
      },
      course: {
        message: "Подтвердите проходение последнего доступного урока.",
        message_2: "Внизу урока кнопка о потдверждении",
        homeWork: "Домашнее задание",
        labelHw: "Загруженное задание:",
        comment: "Комментарий",
        example: "Пример работ:",
        exampleOfScene: "Пример готового сценария",
        audioStory: 'Аудио',
        download: 'Скачать',
        hailuo: "Видеоинструция к нейросети Hailuo AI",
        def: "Исходный вариант Image To Image:",
        ex: "Вариант"
      },
      buy: {
        title: "Купить курс",
        price: "Цена: 10$ (оплата со всего мира)",
        price_15: "Цена: 15$ (оплата со всего мира)",
        choose: "Выберите способ оплаты:",
        choose_2: "Выберите способ оплаты:",
        pc_2: "Выберите способ оплаты",
        pc_1: "Выберите валюту",
        li: "Если вас не перенаправило, нажмите сюда",
      },
      action: {
        back: "Назад",
        next: "Далее",
        send: "Отправить",
        remove: "Удалить",
        buy: "Пройти курс!",
        buyBtn: "Купить курс",
        fullContent: "Полное содержание урока",
      },
      nav: {
        chooseLocale: "Выбор языка",
        prevLesson: "Предыдущий урок",
        nextLesson: "Следующий урок",
        link_1: "Примеры",
        link_2: "Для кого",
        link_3: "Программа курса",
        link_4: "Ученики",
        lk: "Вход",
        link_admin_1: "Курсы",
        link_admin_2: "Мои домашние задания",
        link_admin_3: "Админка",
        logout: "Выйти"
      },
      form: {
        email: "Почта",
        password: "Пароль",
        country: "Страна",
        phone: "Телефон",
        enter: "Войти",
        register: "Зарегистрироваться",
        auth: "Авторизация",
        createAcc: "Создать аккаунт"
      },
      courseNumber: "Урок:",
      dashboard: {
        orders: {
          title: "Заказов",
          icon: "🛒",
          value: "152",
          status: "20 за последние 7 дней"
        },
        reviews: {
          title: "Положительных отзывов",
          icon: "📍",
          value: "87%",
          status: ""
        },
        portfolio: {
          title: "Портфолио",
          icon: "📦",
          value: "9 кейсов в портфолио"
        },
        duration: {
          title: "Длительность",
          icon: "💬",
          value: "14 часов обучения",
          status: "Видеоуроки + практические задания"
        }
      },
      landing: {
        bannerText: "‼️ Только сейчас за $10.00 вместо <s>$20.00</s>!",
        bannerText_15: " ‼️Только сейчас за $15.00 вместо <s>$30.00</s>!",
        timeCourse: "Время прохождения урока:",
        text1: '🔥 Научись создавать крутой контент с помощью ИИ!',
        text2: "📲 Без опыта и сложных программ - можно с телефона",
        text3: "🎬 Смотри видео прямо сейчас и забирай бесплатный урок!",
        title: '🚀 Экспресс - курс за 2 часа',
        txt_33: "Смотри видео и забирай бесплатный урок",
        subtitle: "Освой бесплатные нейросети для генерации текста, изображений и видео – легко, быстро и без затрат",
        btns: {
          takeCourse: 'Забрать урок',
          trailer: "Трейлер курса"
        },
        sticker: 'Бонусный урок "НЕЙРОФОТОСЕССИЯ" + гайд "AI-Деньги" в подарок!',

        aboutUs: {
          title: 'СОЗДАЙТЕ КРЕАТИВНЫЕ ИЗОБРАЖЕНИЯ И ВИДЕО С ПОМОЩЬЮ НЕЙРОСЕТИ',
          subtitle: 'Создавай эффектные видео для Reels, TikTok и Instagram всего за пару минут! Бесплатные нейросети и пошаговые уроки помогут тебе. Смотри примеры работ, которые ты сможешь создавать после прохождения курса.'
        },
        for: {
          title: 'Для кого будет полезен курс?',
          subtitle: 'Прогнозы аналитиков: в следующие 5-10 лет ожидаются кардинальные изменения на рынке труда, и способность эффективно использовать нейросети станет ключевым активом для специалистов.',
          cards: [
            {
              title: 'Контент-креаторам <br/>и блогерам',
              text: 'Создавайте уникальные фото и видео для соцсетей без \n' +
                'навыков в графическом дизайне. Выделяйтесь среди \n' +
                'миллионов, задавайте тренды и привлекайте новую \n' +
                'аудиторию.'
            },
            {
              title: 'Маркетологам и владельцам&nbsp;бизнеса',
              text: 'Быстро создавайте креативный контент для рекламы. Экономьте время и бюджет на дизайн, фокусируясь на стратегии и росте бизнеса.'
            },
            {
              title: 'Начинающим художникам и&nbsp;дизайнерам',
              text: 'Прокачайте портфолио и находите новые идеи с помощью нейросетей. Создавайте арт и концепты, которые удивят даже профессионалов.'
            },
            {
              title: 'Тем, кто хочет зарабатывать свободно.',
              text: 'Не упусти свой шанс: технологии открывают новые возможности, и те, кто действует сегодня, достигают большего завтра.'
            }
          ]
        },
        result: {
          title: "В результате прохождения обучения:",
        },
        examples: {
          title: "Примеры работ наших учеников <br/> после прохождения курса"
        },
        footer: {
          offer: "Оферта",
          pols: "Политика конфидециальности",
        },
        aboutMe: {
          title: "Обо мне",
          content: "<div>\n" +
            "            Привет! Меня зовут Ана. Я digital-креатор, эксперт по нейросетям и основатель бренда NEURO AURA.\n" +
            "          </div>\n" +
            "          <div>\n" +
            "            Помогаю людям раскрыть креативность и создавать впечатляющий контент с помощью искусственного интеллекта.\n" +
            "            Моя миссия — сделать технологии доступными каждому и показать, как нейросети могут изменить подход к\n" +
            "            творчеству, бизнесу и самовыражению.\n" +
            "          </div>\n" +
            "          -Основатель NEURO AURA – бренда, объединяющего искусство и передовые технологии<br/>\n" +
            "          -Автор курса NEURO VISION – обучаю работе с бесплатными AI-инструментами для создания контента без сложного\n" +
            "          софта<br/>\n" +
            "          -Креатор и консультант – помогаю блогерам, брендам и бизнесу воплощать уникальные идеи в digital-формате <br/>"
        },
        programm: {
          title: 'Программа Курса',
          cards: [
            {
              title: 'Как использовать GPTChat.com и\n' +
                ' где он может быть полезен\n',
              text: '<b>Цель урока:</b> Научить пользоваться GPTChat, показать его возможности и объяснить, как формулировать эффективные запросы. <b>Содержание урока:</b>',
              list: [
                ' Основные функции GPT-Chat',
                'Практическое использование голосового помощника',
                'Решение задач с помощью GPT-Chat',
              ],
              time: '00:10:33',
            },
            {
              title: 'Работа в Microsoft designer . Написание сценариев для видеороликов с помощью GPT Chat. Правила создания промта',
              text: '<b>Цель урока:</b> Научиться формулировать эффективные промты для генерации изображений и сценариев. Правила создания анимационных сценариев с чёткой структурой. <b>Содержание урока:</b>',
              list: [
                'Промты для изображений',
                'Сценарии видеороликов',
                'Генерация сценариев для анимации',
                'Практические советы и лайфхаки',
              ],
              time: '00:18:47',
            },
            {
              title: 'Типы генерации видео',
              text: '<b>Цель урока:</b> Изучить три типа генерации видео: Text-to-Video, Image-to-Video, Video-to-Video. Рассмотреть их особенности и применение. <b>Содержание урока:</b>',
              list: [
                'Генерация видео из текста.',
                'Преобразование изображения в видео.',
                'Модификация готового видео.',
              ],
              time: '00:03:04',
            },
            {
              title: 'Создание изображения и видео в Шедеврум',
              text: '<b>Цель урока:</b> Научиться создавать изображение и превращать его в видео с помощью бесплатных инструментов платформы Шедеврум. <b>Содержание урока:</b>',
              list: [
                'Создание изображения с помощью текстового запроса',
                'Создание видео на основе изображения'
              ],
              time: '00:05:15',
            },
            {
              title: 'Создание видео и цифрового аватара в MyHeritage',
              text: '<b>Цель урока:</b> познакомить пользователей с функционалом нейросети MyHeritage, включая бесплатные функции, такие как восстановление цвета на черно-белых фотографиях, анимация лиц и создание цифровых аватаров с помощью DeepStory. <b>Содержание урока:</b>',
              list: [
                'Работа с функцией восстановления цвета',
                'Анимация лиц на фотографиях',
                'Создание цифровых аватаров с DeepStory',
              ],
              time: '00:08:38',
            },
            {
              title: 'Генерация изображения в Leonardo AI',
              text: '<b>Цель урока:</b> Изучить платформу Leonardo AI и её функции: Image Creation и Upscaler. <b>Содержание урока:</b>',
              list: [
                'Платформа Leonardo AI',
                'Pабота с функцией  Image Creation',
                'Работа с функцией Upscaler',
              ],
              time: '00:08:10',
            },
            {
              title: 'Генерация видео в Vidu и создание озвучки в ElevenLabs',
              text: '<b>Цель урока:</b> Освоить создание видеоанимации с помощью нейросети Vidu и генерацию аудиодорожек через ElevenLabs, чтобы подготовить базовые материалы для последующего видеомонтажа. <b>Содержание урока:</b>',
              list: [
                'Введение в Vidu – знакомство с возможностями нейросети для генерации видео.',
                'Пошаговая инструкция по работе с image-to-video. ',
                'Создание сцен для видеоролика – генерируем динамичные кадры с помощью подготовленных изображений и продуманных промтов.',
                'Знакомство с ElevenLabs – создание реалистичной озвучки для видео.'
              ],
              time: '00:18:35',
            },
            {
              title: 'Создание видеороликов с помощью CapCut',
              text: '<b>Цель урока:</b> Научиться базовым навыкам монтажа видео с помощью мобильной версии CapCut, освоив такие функции как импорт файлов, обрезка, добавление музыки и текста, применение фильтров, эффектов и переходов для создания простых видеороликов. <b>Содержание урока:</b>',
              list: [
                'Основы работы в CapCut',
                'Применение эффектов',
                'Практическое задание',
              ],
              time: '00:19:39',
            },
          ]
        },
        offer: {
          title: "ДОГОВОР ПУБЛИЧНОЙ ОФЕРТЫ",
          sections: {
            general: "ОБЩИЕ ПОЛОЖЕНИЯ",
            subject: "ПРЕДМЕТ ДОГОВОРА",
            order_payment: "ПОРЯДОК ОФОРМЛЕНИЯ ЗАКАЗА И ОПЛАТЫ",
            rights_obligations: "ПРАВА И ОБЯЗАННОСТИ СТОРОН",
            refund_liability: "ВОЗВРАТ И ОТВЕТСТВЕННОСТЬ",
            force_majeure: "ФОРС-МАЖОР",
            final_provisions: "ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ",
          },
          content: {
            general: [
              "Настоящий документ является публичной офертой проекта NEURO AURA и содержит условия предоставления доступа к обучающим материалам.",
              "Приобретая доступ к курсу NEURO VISION, пользователь подтверждает согласие с условиями Оферты.",
              "Оферта считается принятой с момента оплаты Покупателем услуг Продавца.",
              "Под 'Платформой' понимается веб-сайт neuro-aura.com, используемый Продавцом для предоставления доступа к обучающим материалам."
            ],
            subject: [
              "Продавец предоставляет Покупателю доступ к обучающим материалам курса NEURO VISION.",
              "Доступ предоставляется в электронном формате через веб-платформу Продавца.",
              "Доступ к курсу предоставляется на неограниченный срок, но условия могут изменяться в будущем."
            ],
            order_payment: [
              "Оплата курсов осуществляется через платёжную систему Lavatop. Продавец не имеет доступа к данным о платеже.",
              "Для оформления заказа Покупатель должен пройти регистрацию, указав e-mail и номер телефона.",
              "Доступ к курсу предоставляется автоматически после подтверждения оплаты.",
              "Стоимость курсов указывается на сайте и может изменяться Продавцом."
            ],
            rights_obligations: [
              "Продавец обязуется предоставить доступ к обучающим материалам после оплаты.",
              "Покупатель обязуется использовать материалы только для личного обучения, не передавать третьим лицам доступ.",
              "Продавец имеет право ограничить доступ в случае нарушения условий."
            ],
            refund_liability: [
              "Возврат средств возможен только, если курс не был открыт после покупки.",
              "Продавец не несёт ответственности за результаты обучения и технические сбои.",
              "При нарушении интеллектуальной собственности доступ блокируется без возврата средств."
            ],
            force_majeure: [
              "Стороны освобождаются от ответственности за неисполнение обязательств в случае форс-мажорных обстоятельств."
            ],
            final_provisions: [
              "Продавец оставляет за собой право вносить изменения в Оферту без уведомления.",
              "Все вопросы и претензии принимаются через e-mail: neuro.aura@mail.ru.",
              "Применимое право – законодательство Российской Федерации."
            ]
          }
        },
        privacyPolicy: {
          title: "Политика конфиденциальности",
          sections: {
            general: "1. Общие положения",
            purposes: "2. Цели обработки персональных данных",
            types: "3. Типы персональных данных",
            usage: "4. Использование персональных данных",
            storage: "5. Срок хранения данных",
            security: "6. Безопасность данных",
            rights: "7. Права Пользователей",
            updates: "8. Обновления Политики",
            contacts: "9. Контакты"
          },
          content: {
            general: [
              "1.1. Настоящая Политика обработки персональных данных (далее – «Политика») определяет порядок обработки и защиты персональных данных пользователей (далее – «Пользователь» или «Вы») при использовании сайта [вставьте название сайта или компании] (далее – «Сайт»).",
              "1.2. Сайт обрабатывает только электронную почту Пользователей, необходимую для выполнения следующих целей."
            ],
            purposes: [
              "2.1. Мы собираем и обрабатываем ваш email для следующих целей:",
              "Регистрация на сайте.",
              "Отправка уведомлений, связанных с процессом обучения (например, подтверждения регистрации, доступа к материалам).",
              "Рассылка информационных сообщений или маркетинговых материалов (если Пользователь дал согласие)."
            ],
            types: ["3.1. Мы обрабатываем только адреса электронной почты. Мы не собираем и не храним другие персональные данные, такие как имя, адрес, телефон и т.д."],
            usage: [
              "4.1. Мы используем ваш email исключительно для выполнения целей, указанных в п. 2.1. Мы не передаем ваш email третьим лицам, за исключением случаев, когда это необходимо для выполнения договора (например, использование сторонних сервисов для рассылки уведомлений)."
            ],
            storage: ["5.1. Мы храним ваш email в нашей системе до тех пор, пока вы являетесь зарегистрированным пользователем нашего сайта или до момента отписки от рассылки (если применимо)."],
            security: [
              "6.1. Мы принимаем все разумные меры для защиты вашего email от несанкционированного доступа и утечек данных.",
              "6.2. Вся передача данных на нашем сайте происходит через защищенные каналы связи."
            ],
            rights: [
              "7.1. Пользователь имеет право на доступ к своим данным, их исправление или удаление. Для этого необходимо связаться с нами через контактную информацию, указанную на сайте.",
              "7.2. Пользователь также имеет право отозвать свое согласие на обработку персональных данных в любой момент, для чего достаточно отписаться от рассылок."
            ],
            updates: ["8.1. Мы можем время от времени обновлять эту Политику. Все изменения будут опубликованы на этой странице, и они вступят в силу с момента публикации."],
            contacts: ["9.1. Для получения дополнительных сведений о политике обработки персональных данных, а также для реализации своих прав, Пользователь может обратиться к нам по электронной почте: neuro.aura@mail.ru."]
          }
        }
      }
    }
  }
}))
