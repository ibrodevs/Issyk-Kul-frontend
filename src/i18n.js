export const dictionary = {
  ru: {
    nav: {
      about: 'О регионе',
      tourism: 'Туризм',
      news: 'Новости',
      departments: 'Департаменты',
      media: 'Медиа',
      contacts: 'Контакты',
    },
    brand: {
      short: 'Issyk-Kul Region',
      full: 'Иссык-Кульская область',
      portal: 'Официальный региональный портал',
    },
    topNav: {
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
    },
    hero: {
      badge: 'Официальный портал региона',
      titleLine1: 'Иссык-Кульская область —',
      titleLine2: 'сердце туризма',
      titleLine3: 'Кыргызстана',
      cta: 'Исследовать регион',
    },
    about: {
      section: {
        eyebrow: 'Откройте для себя',
        title: 'Иссык-Куль: где горы встречаются с небом',
        subtitle: 'Идеальное место для жизни, отдыха и инвестиций в самом сердце Азии',
      },
      regionStatsLabels: ['Площадь', 'Население', 'Административный центр', 'Районы'],
      regionStatsValues: ['43 100 км²', '≈ 500 000+', 'Каракол', '5 районов + города'],
      featureCard: {
        titleLine1: 'Жемчужина',
        titleLine2: 'Тянь-Шаня',
        description:
          'Расположенное на высоте 1607 метров над уровнем моря, озеро Иссык-Куль никогда не замерзает благодаря своей уникальной минерализации.',
      },
      miniStats: [
        { value: '6 тыс. км²', label: 'Площадь' },
        { value: '80+ рек', label: 'Притоков' },
        { value: '23°C', label: 'Летом' },
      ],
      tabs: [
        { id: 'nature', label: 'Природа' },
        { id: 'culture', label: 'Культура' },
        { id: 'tourism', label: 'Туризм' },
      ],
      tabContent: {
        nature: {
          title: 'Уникальная экосистема',
          description:
            'Озеро Иссык-Куль — второе по величине высокогорное озеро в мире. Окружено снежными вершинами Тянь-Шаня, создающими неповторимый ландшафт и микроклимат.',
          highlights: ['Чистейшая вода', 'Целебный воздух', '7 природных зон'],
        },
        culture: {
          title: 'Богатое наследие',
          description:
            'Регион хранит следы древних цивилизаций: петроглифы, курганы саков и памятники Великого Шелкового пути.',
          highlights: ['Петроглифы', 'Мавзолеи', 'Юрточные лагеря'],
        },
        tourism: {
          title: 'Современная инфраструктура',
          description:
            'Развитая туристическая сеть: от эко-отелей до горнолыжных курортов. Доступен круглогодичный отдых.',
          highlights: ['SPA-курорты', 'Рафтинг', 'Хели-ски'],
        },
      },
      map: {
        title: 'Исследуйте регион',
        subtitle: 'Интерактивная карта с достопримечательностями',
        openMap: 'Открыть карту',
        markers: ['Каракол', 'Чолпон-Ата', 'Балыкчы'],
      },
      travel: {
        title: 'Планируйте путешествие',
        subtitle:
          'Откройте для себя уникальные места, получите консультацию экспертов и создайте идеальный маршрут',
        actions: [
          { text: 'Забронировать тур', desc: 'Индивидуальные программы' },
          { text: 'Аренда транспорта', desc: 'Автомобили и трансферы' },
          { text: 'Отели и гостевые дома', desc: 'Более 500 вариантов' },
        ],
      },
    },
    tourism: {
      section: {
        eyebrow: 'Туризм',
        title: 'Достопримечательности и отдых',
        subtitle:
          'Популярные места, курорты, санатории и маршруты области в удобном карточном формате.',
      },
      cta: 'Подробнее',
      places: [
        {
          name: 'Иссык-Куль',
          description: 'Пляжи, курортные зоны, водные активности и панорамные виды на горы.',
          badge: 'Топ-направление',
        },
        {
          name: 'Каракол',
          description: 'Город для активного туризма, культурных маршрутов и зимнего отдыха.',
          badge: 'Город',
        },
        {
          name: 'Григорьевское ущелье',
          description: 'Хвойные леса, горные реки и природные маршруты для пикников и треккинга.',
          badge: 'Природа',
        },
        {
          name: 'Джеты-Огуз',
          description: 'Красные скалы, легенды региона и живописные ущелья для экскурсионных поездок.',
          badge: 'Легендарное место',
        },
        {
          name: 'Отели и зоны отдыха',
          description: 'Современные гостиницы, семейные базы отдыха и курортные комплексы.',
          badge: 'Размещение',
        },
        {
          name: 'Санатории и экскурсии',
          description: 'Оздоровительные программы, турпакеты и маршруты по области.',
          badge: 'Сервис',
        },
      ],
    },
    news: {
      section: {
        eyebrow: 'Медиацентр',
        title: 'Новости Иссык-Куля',
        subtitle: 'Актуальные события, анонсы мероприятий и важные объявления региона',
      },
      filters: {
        all: 'Все новости',
        events: 'События',
        tourism: 'Туризм',
        culture: 'Культура',
        economy: 'Экономика',
      },
      categoryLabels: {
        events: 'Событие',
        tourism: 'Туризм',
        culture: 'Культура',
        economy: 'Экономика',
      },
      featuredTitle: 'Главные новости',
      hot: 'Горячее',
      read: 'Читать',
      more: 'Подробнее',
      items: {
        1: {
          title: 'Открытие нового горнолыжного курорта в Караколе',
          description:
            'Современный ski-комплекс с подъемниками и трассами международного уровня откроется в декабре 2024 года.',
          date: '25 февраля 2026',
          tags: ['горнолыжка', 'зимний отдых', 'инвестиции'],
        },
        2: {
          title: 'Фестиваль этнической музыки "Көчмөн" пройдет на Иссык-Куле',
          description:
            'Трехдневный фестиваль соберет исполнителей традиционной музыки со всей Центральной Азии.',
          date: '24 февраля 2026',
          tags: ['фестиваль', 'музыка', 'культура'],
        },
        3: {
          title: 'Новый авиарейс соединит Бишкек с курортами Иссык-Куля',
          description:
            'Авиакомпания "Тезиз" запускает ежедневные рейсы в Тамчи и Каракол с мая 2026 года.',
          date: '23 февраля 2026',
          tags: ['транспорт', 'авиасообщение', 'туризм'],
        },
        4: {
          title: 'Реконструкция исторического музея в Чолпон-Ате',
          description:
            'Обновленный музей под открытым небом представит уникальную коллекцию петроглифов.',
          date: '22 февраля 2026',
          tags: ['музей', 'история', 'реставрация'],
        },
        5: {
          title: 'Спасатели предупреждают о сходе лавин в горах',
          description:
            'В связи с обильными снегопадами повышена лавинная опасность в высокогорных районах.',
          date: '21 февраля 2026',
          tags: ['безопасность', 'погода', 'лавины'],
        },
        6: {
          title: 'Иссык-Куль вошел в топ-5 озер мира для дайвинга',
          description:
            'Международный дайв-портал включил высокогорное озеро в список лучших мест для погружений.',
          date: '20 февраля 2026',
          tags: ['дайвинг', 'рейтинги', 'активный отдых'],
        },
      },
    },
    departments: {
      section: {
        eyebrow: 'Государственные структуры',
        title: 'Управления и департаменты',
        subtitle:
          'Органы власти Иссык-Кульской области: контакты, руководители и направления деятельности',
      },
      searchPlaceholder: 'Поиск департамента или руководителя...',
      statDepartmentsSuffix: 'департаментов',
      supportLabel: 'поддержка',
      supportValue: '24/7',
      filters: ['Все', 'Администрация', 'Экономика', 'Социальная сфера', 'Инфраструктура'],
      leaderLabel: 'Руководитель',
      resetFilter: 'Сбросить фильтр',
      noResultsTitle: 'Ничего не найдено',
      noResultsText: 'Попробуйте изменить параметры поиска',
      items: [
        {
          name: 'Департамент туризма',
          category: 'Экономика',
          description: 'Развитие туристической инфраструктуры и продвижение региона',
          headTitle: 'Директор департамента',
          address: 'г. Каракол, ул. Ленина, 125',
          schedule: 'Пн-Пт: 9:00 - 18:00',
        },
        {
          name: 'Управление культуры',
          category: 'Социальная сфера',
          description: 'Сохранение культурного наследия и развитие искусств',
          headTitle: 'Начальник управления',
          address: 'г. Каракол, ул. Советская, 45',
          schedule: 'Пн-Пт: 9:00 - 17:30',
        },
        {
          name: 'Департамент экономики',
          category: 'Экономика',
          description: 'Экономическое развитие и инвестиционная политика',
          headTitle: 'Директор',
          address: 'г. Каракол, ул. Ленина, 125',
          schedule: 'Пн-Пт: 9:00 - 18:00',
        },
      ],
    },
    media: {
      section: {
        eyebrow: 'Мультимедиа',
        title: 'Фото, видео и промо-контент',
        subtitle:
          'Визуальный образ региона: галереи, ролики с мероприятий и панорамные съемки с дронов.',
      },
      items: [
        { title: 'Фото: виды Иссык-Куля', type: 'Фото' },
        { title: 'Видео: мероприятия региона', type: 'Видео' },
        { title: 'Промо-ролики и дроны', type: 'Промо' },
      ],
    },
    footer: {
      linksTitle: 'Быстрые ссылки',
      socialTitle: 'Соцсети',
      description:
        'Новости, департаменты, туризм, проекты развития и цифровые сервисы для жителей и гостей региона.',
      privacy: 'Политика конфиденциальности',
      copyright: '© 2026 Иссык-Кульская область',
    },
  },
  en: {
    nav: {
      about: 'About',
      tourism: 'Tourism',
      news: 'News',
      departments: 'Departments',
      media: 'Media',
      contacts: 'Contacts',
    },
    brand: {
      short: 'Issyk-Kul Region',
      full: 'Issyk-Kul Region',
      portal: 'Official regional portal',
    },
    topNav: {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      badge: 'Official regional portal',
      titleLine1: 'Issyk-Kul Region',
      titleLine2: 'the heart of tourism',
      titleLine3: 'of Kyrgyzstan',
      cta: 'Explore region',
    },
    about: {
      section: {
        eyebrow: 'Discover',
        title: 'Issyk-Kul: where mountains meet the sky',
        subtitle: 'An ideal place to live, travel and invest in the heart of Asia',
      },
      regionStatsLabels: ['Area', 'Population', 'Administrative center', 'Districts'],
      regionStatsValues: ['43,100 km²', '≈ 500,000+', 'Karakol', '5 districts + cities'],
      featureCard: {
        titleLine1: 'Pearl of the',
        titleLine2: 'Tian Shan',
        description:
          'Located at an altitude of 1,607 meters above sea level, Issyk-Kul never freezes thanks to its unique mineralization.',
      },
      miniStats: [
        { value: '6k km²', label: 'Area' },
        { value: '80+ rivers', label: 'Inflows' },
        { value: '23°C', label: 'Summer' },
      ],
      tabs: [
        { id: 'nature', label: 'Nature' },
        { id: 'culture', label: 'Culture' },
        { id: 'tourism', label: 'Tourism' },
      ],
      tabContent: {
        nature: {
          title: 'Unique ecosystem',
          description:
            'Issyk-Kul is the world’s second-largest high-altitude lake. It is surrounded by snowy Tian Shan peaks that create a distinctive landscape and microclimate.',
          highlights: ['Crystal-clear water', 'Healing air', '7 natural zones'],
        },
        culture: {
          title: 'Rich heritage',
          description:
            'The region preserves traces of ancient civilizations: petroglyphs, Saka burial mounds and monuments of the Silk Road.',
          highlights: ['Petroglyphs', 'Mausoleums', 'Yurt camps'],
        },
        tourism: {
          title: 'Modern infrastructure',
          description:
            'A developed tourism network from eco-hotels to ski resorts provides year-round recreation.',
          highlights: ['SPA resorts', 'Rafting', 'Heli-ski'],
        },
      },
      map: {
        title: 'Explore the region',
        subtitle: 'Interactive map with landmarks',
        openMap: 'Open map',
        markers: ['Karakol', 'Cholpon-Ata', 'Balykchy'],
      },
      travel: {
        title: 'Plan your trip',
        subtitle:
          'Discover unique places, get expert advice and build the perfect itinerary',
        actions: [
          { text: 'Book a tour', desc: 'Custom travel programs' },
          { text: 'Transport rental', desc: 'Cars and transfers' },
          { text: 'Hotels & guesthouses', desc: '500+ options available' },
        ],
      },
    },
    tourism: {
      section: {
        eyebrow: 'Tourism',
        title: 'Attractions and recreation',
        subtitle:
          'Popular destinations, resorts, health centers and routes in a convenient card layout.',
      },
      cta: 'Details',
      places: [
        {
          name: 'Issyk-Kul Lake',
          description: 'Beaches, resorts, water activities and panoramic mountain views.',
          badge: 'Top destination',
        },
        {
          name: 'Karakol',
          description: 'A city for active tourism, cultural routes and winter recreation.',
          badge: 'City',
        },
        {
          name: 'Grigoriev Gorge',
          description: 'Conifer forests, mountain rivers and natural routes for picnics and trekking.',
          badge: 'Nature',
        },
        {
          name: 'Jety-Oguz',
          description: 'Red rocks, local legends and scenic valleys for excursions.',
          badge: 'Iconic place',
        },
        {
          name: 'Hotels and resorts',
          description: 'Modern hotels, family retreats and resort complexes.',
          badge: 'Accommodation',
        },
        {
          name: 'Health resorts and tours',
          description: 'Wellness programs, tour packages and routes across the region.',
          badge: 'Service',
        },
      ],
    },
    news: {
      section: {
        eyebrow: 'Media Center',
        title: 'Issyk-Kul News',
        subtitle: 'Current events, announcements and important regional updates',
      },
      filters: {
        all: 'All news',
        events: 'Events',
        tourism: 'Tourism',
        culture: 'Culture',
        economy: 'Economy',
      },
      categoryLabels: {
        events: 'Event',
        tourism: 'Tourism',
        culture: 'Culture',
        economy: 'Economy',
      },
      featuredTitle: 'Top stories',
      hot: 'Trending',
      read: 'Read',
      more: 'Learn more',
      items: {
        1: {
          title: 'New ski resort opens in Karakol',
          description:
            'A modern ski complex with lifts and international-level slopes is scheduled to open in December 2024.',
          date: 'February 25, 2026',
          tags: ['skiing', 'winter travel', 'investment'],
        },
        2: {
          title: 'Kochmon ethnic music festival to be held at Issyk-Kul',
          description:
            'A three-day festival will bring together traditional music performers from across Central Asia.',
          date: 'February 24, 2026',
          tags: ['festival', 'music', 'culture'],
        },
        3: {
          title: 'New flight will connect Bishkek with Issyk-Kul resorts',
          description:
            'Teziz airline launches daily flights to Tamchy and Karakol starting in May 2026.',
          date: 'February 23, 2026',
          tags: ['transport', 'aviation', 'tourism'],
        },
        4: {
          title: 'Historic museum in Cholpon-Ata to be renovated',
          description:
            'The renewed open-air museum will present a unique collection of petroglyphs.',
          date: 'February 22, 2026',
          tags: ['museum', 'history', 'restoration'],
        },
        5: {
          title: 'Rescuers warn of avalanche risk in the mountains',
          description:
            'Heavy snowfall has increased avalanche danger in high-altitude areas.',
          date: 'February 21, 2026',
          tags: ['safety', 'weather', 'avalanches'],
        },
        6: {
          title: 'Issyk-Kul enters top 5 lakes in the world for diving',
          description:
            'An international diving portal included the high-altitude lake among the best dive destinations.',
          date: 'February 20, 2026',
          tags: ['diving', 'rankings', 'active travel'],
        },
      },
    },
    departments: {
      section: {
        eyebrow: 'Government structures',
        title: 'Departments and agencies',
        subtitle:
          'Authorities of Issyk-Kul Region: contacts, leadership and areas of responsibility',
      },
      searchPlaceholder: 'Search for a department or executive...',
      statDepartmentsSuffix: 'departments',
      supportLabel: 'support',
      supportValue: '24/7',
      filters: ['All', 'Administration', 'Economy', 'Social sector', 'Infrastructure'],
      leaderLabel: 'Head',
      resetFilter: 'Reset filter',
      noResultsTitle: 'No results found',
      noResultsText: 'Try changing your search criteria',
      items: [
        {
          name: 'Tourism Department',
          category: 'Economy',
          description: 'Development of tourism infrastructure and regional promotion',
          headTitle: 'Department Director',
          address: 'Karakol, Lenin St. 125',
          schedule: 'Mon-Fri: 9:00 - 18:00',
        },
        {
          name: 'Culture Administration',
          category: 'Social sector',
          description: 'Preservation of cultural heritage and development of the arts',
          headTitle: 'Administration Head',
          address: 'Karakol, Sovetskaya St. 45',
          schedule: 'Mon-Fri: 9:00 - 17:30',
        },
        {
          name: 'Economy Department',
          category: 'Economy',
          description: 'Economic development and investment policy',
          headTitle: 'Director',
          address: 'Karakol, Lenin St. 125',
          schedule: 'Mon-Fri: 9:00 - 18:00',
        },
      ],
    },
    media: {
      section: {
        eyebrow: 'Multimedia',
        title: 'Photo, video and promo content',
        subtitle:
          'The visual identity of the region: galleries, event videos and panoramic drone footage.',
      },
      items: [
        { title: 'Photos: Issyk-Kul views', type: 'Photo' },
        { title: 'Videos: regional events', type: 'Video' },
        { title: 'Promo clips and drones', type: 'Promo' },
      ],
    },
    footer: {
      linksTitle: 'Quick links',
      socialTitle: 'Socials',
      description:
        'News, departments, tourism, development projects and digital services for residents and visitors.',
      privacy: 'Privacy policy',
      copyright: '© 2026 Issyk-Kul Region',
    },
  },
  kg: {
    nav: {
      about: 'Облус жөнүндө',
      tourism: 'Туризм',
      news: 'Жаңылыктар',
      departments: 'Башкармалыктар',
      media: 'Медиа',
      contacts: 'Байланыш',
    },
    brand: {
      short: 'Ысык-Көл облусу',
      full: 'Ысык-Көл облусу',
      portal: 'Аймактык расмий портал',
    },
    topNav: {
      openMenu: 'Менюну ачуу',
      closeMenu: 'Менюну жабуу',
    },
    hero: {
      badge: 'Аймактын расмий порталы',
      titleLine1: 'Ысык-Көл облусу',
      titleLine2: 'туризмдин жүрөгү',
      titleLine3: 'Кыргызстан',
      cta: 'Аймакты изилдөө',
    },
    about: {
      section: {
        eyebrow: 'Ачып көрүңүз',
        title: 'Ысык-Көл: тоолор асман менен кезиккен жер',
        subtitle: 'Азиянын жүрөгүндө жашоо, эс алуу жана инвестиция үчүн идеалдуу жер',
      },
      regionStatsLabels: ['Аянты', 'Калкы', 'Административдик борбор', 'Райондор'],
      regionStatsValues: ['43 100 км²', '≈ 500 000+', 'Каракол', '5 район + шаарлар'],
      featureCard: {
        titleLine1: 'Теңир-Тоонун',
        titleLine2: 'бермети',
        description:
          'Деңиз деңгээлинен 1607 метр бийиктикте жайгашкан Ысык-Көл өзүнүн өзгөчө минералдашуусунун аркасында тоңбойт.',
      },
      miniStats: [
        { value: '6 миң км²', label: 'Аянты' },
        { value: '80+ дарыя', label: 'Куймалары' },
        { value: '23°C', label: 'Жайында' },
      ],
      tabs: [
        { id: 'nature', label: 'Табият' },
        { id: 'culture', label: 'Маданият' },
        { id: 'tourism', label: 'Туризм' },
      ],
      tabContent: {
        nature: {
          title: 'Уникалдуу экосистема',
          description:
            'Ысык-Көл дүйнөдөгү бийик тоолуу көлдөрдүн ичинен экинчи ири көл. Аны Теңир-Тоонун карлуу чокулары курчап, өзгөчө ландшафт жана микроклимат түзөт.',
          highlights: ['Таза суу', 'Дарылык аба', '7 жаратылыш зонасы'],
        },
        culture: {
          title: 'Бай мурас',
          description:
            'Аймакта байыркы цивилизациялардын издери сакталган: петроглифтер, сак көрүстөндөрү жана Улуу Жибек жолунун эстеликтери.',
          highlights: ['Петроглифтер', 'Мавзолейлер', 'Боз үй лагерлери'],
        },
        tourism: {
          title: 'Заманбап инфраструктура',
          description:
            'Эко-мейманканалардан тоо-лыжа курортторуна чейинки өнүккөн туристтик тармак жыл бою эс алууга мүмкүнчүлүк берет.',
          highlights: ['SPA-курорттор', 'Рафтинг', 'Хели-ски'],
        },
      },
      map: {
        title: 'Аймакты изилдеңиз',
        subtitle: 'Көрүүгө арзый турган жерлердин интерактивдүү картасы',
        openMap: 'Картаны ачуу',
        markers: ['Каракол', 'Чолпон-Ата', 'Балыкчы'],
      },
      travel: {
        title: 'Сапарыңызды пландаңыз',
        subtitle:
          'Өзгөчө жерлерди ачыңыз, адистерден кеңеш алыңыз жана мыкты маршрут түзүңүз',
        actions: [
          { text: 'Тур брондоо', desc: 'Жекече программалар' },
          { text: 'Транспорт ижарасы', desc: 'Унаалар жана трансферлер' },
          { text: 'Мейманканалар жана конок үйлөр', desc: '500дөн ашык вариант' },
        ],
      },
    },
    tourism: {
      section: {
        eyebrow: 'Туризм',
        title: 'Көрүктүү жерлер жана эс алуу',
        subtitle:
          'Аймактын популярдуу жерлери, курорттору, санаторийлери жана маршруттары ыңгайлуу карточка форматында.',
      },
      cta: 'Кененирээк',
      places: [
        {
          name: 'Ысык-Көл',
          description: 'Жээктер, курорттук аймактар, суудагы активдүүлүк жана тоо көрүнүштөрү.',
          badge: 'Топ багыт',
        },
        {
          name: 'Каракол',
          description: 'Активдүү туризм, маданий маршруттар жана кышкы эс алуу үчүн шаар.',
          badge: 'Шаар',
        },
        {
          name: 'Григорьев капчыгайы',
          description: 'Ийне жалбырактуу токой, тоо дарыялары жана пикник, треккинг маршруттары.',
          badge: 'Табият',
        },
        {
          name: 'Жети-Өгүз',
          description: 'Кызыл аскалар, уламыштар жана экскурсия үчүн кооз капчыгайлар.',
          badge: 'Белгилүү жер',
        },
        {
          name: 'Мейманканалар жана эс алуу жайлары',
          description: 'Заманбап мейманканалар, үй-бүлөлүк эс алуу базалары жана курорттук комплекстер.',
          badge: 'Жайгашуу',
        },
        {
          name: 'Санаторийлер жана экскурсиялар',
          description: 'Ден соолукту чыңдоо программалары, турпакеттер жана облус боюнча маршруттар.',
          badge: 'Кызмат',
        },
      ],
    },
    news: {
      section: {
        eyebrow: 'Медиа борбор',
        title: 'Ысык-Көл жаңылыктары',
        subtitle: 'Аймактагы актуалдуу окуялар, жарыялар жана маанилүү маалыматтар',
      },
      filters: {
        all: 'Баары',
        events: 'Окуялар',
        tourism: 'Туризм',
        culture: 'Маданият',
        economy: 'Экономика',
      },
      categoryLabels: {
        events: 'Окуя',
        tourism: 'Туризм',
        culture: 'Маданият',
        economy: 'Экономика',
      },
      featuredTitle: 'Башкы жаңылыктар',
      hot: 'Кызык',
      read: 'Окуу',
      more: 'Кененирээк',
      items: {
        1: {
          title: 'Караколдо жаңы тоо-лыжа курорту ачылат',
          description:
            'Эл аралык деңгээлдеги трассалары жана көтөргүчтөрү бар заманбап ski-комплекс 2024-жылдын декабрында ачылат.',
          date: '2026-жыл, 25-февраль',
          tags: ['тоо лыжа', 'кышкы эс алуу', 'инвестиция'],
        },
        2: {
          title: '"Көчмөн" этно музыка фестивалы Ысык-Көлдө өтөт',
          description:
            'Үч күндүк фестиваль Борбор Азиядан салттуу музыка аткаруучуларын чогултат.',
          date: '2026-жыл, 24-февраль',
          tags: ['фестиваль', 'музыка', 'маданият'],
        },
        3: {
          title: 'Жаңы авиарейс Бишкекти Ысык-Көл курорттору менен байланыштырат',
          description:
            '"Тезиз" авиакомпаниясы 2026-жылдын май айынан тарта Тамчы жана Караколго күнүмдүк каттам ачат.',
          date: '2026-жыл, 23-февраль',
          tags: ['транспорт', 'авиа', 'туризм'],
        },
        4: {
          title: 'Чолпон-Атадагы тарыхый музей реконструкцияланат',
          description:
            'Жаңыланган ачык асман алдындагы музей петроглифтердин уникалдуу коллекциясын көрсөтөт.',
          date: '2026-жыл, 22-февраль',
          tags: ['музей', 'тарых', 'реставрация'],
        },
        5: {
          title: 'Куткаруучулар тоолордо кар көчкү коркунучу тууралуу эскертет',
          description:
            'Калың кар жаагандыктан бийик тоолуу райондордо кар көчкү коркунучу жогорулады.',
          date: '2026-жыл, 21-февраль',
          tags: ['коопсуздук', 'аба ырайы', 'кар көчкү'],
        },
        6: {
          title: 'Ысык-Көл суучулдар үчүн дүйнөдөгү топ-5 көлдүн катарына кирди',
          description:
            'Эл аралык дайвинг порталы бийик тоолуу көлдү суучулдук үчүн мыкты жерлердин катарына кошту.',
          date: '2026-жыл, 20-февраль',
          tags: ['дайвинг', 'рейтинг', 'активдүү эс алуу'],
        },
      },
    },
    departments: {
      section: {
        eyebrow: 'Мамлекеттик түзүмдөр',
        title: 'Башкармалыктар жана департаменттер',
        subtitle:
          'Ысык-Көл облусунун бийлик органдары: байланыштар, жетекчилер жана иш багыттары',
      },
      searchPlaceholder: 'Департаментти же жетекчини издөө...',
      statDepartmentsSuffix: 'департамент',
      supportLabel: 'колдоо',
      supportValue: '24/7',
      filters: ['Баары', 'Администрация', 'Экономика', 'Социалдык тармак', 'Инфраструктура'],
      leaderLabel: 'Жетекчи',
      resetFilter: 'Фильтрди тазалоо',
      noResultsTitle: 'Эч нерсе табылган жок',
      noResultsText: 'Издөө параметрлерин өзгөртүп көрүңүз',
      items: [
        {
          name: 'Туризм департаменти',
          category: 'Экономика',
          description: 'Туристтик инфраструктураны өнүктүрүү жана аймакты илгерилетүү',
          headTitle: 'Департамент директору',
          address: 'Каракол ш., Ленин көч., 125',
          schedule: 'Дш-Жм: 9:00 - 18:00',
        },
        {
          name: 'Маданият башкармалыгы',
          category: 'Социалдык тармак',
          description: 'Маданий мурасты сактоо жана искусствону өнүктүрүү',
          headTitle: 'Башкармалыктын башчысы',
          address: 'Каракол ш., Совет көч., 45',
          schedule: 'Дш-Жм: 9:00 - 17:30',
        },
        {
          name: 'Экономика департаменти',
          category: 'Экономика',
          description: 'Экономикалык өнүгүү жана инвестициялык саясат',
          headTitle: 'Директор',
          address: 'Каракол ш., Ленин көч., 125',
          schedule: 'Дш-Жм: 9:00 - 18:00',
        },
      ],
    },
    media: {
      section: {
        eyebrow: 'Мультимедиа',
        title: 'Сүрөт, видео жана промо-контент',
        subtitle:
          'Аймактын визуалдык образы: галереялар, иш-чаралардын видеолору жана дрондон панорамалык тартуулар.',
      },
      items: [
        { title: 'Сүрөт: Ысык-Көлдүн көрүнүштөрү', type: 'Сүрөт' },
        { title: 'Видео: аймактын иш-чаралары', type: 'Видео' },
        { title: 'Промо роликтер жана дрон', type: 'Промо' },
      ],
    },
    footer: {
      linksTitle: 'Тез шилтемелер',
      socialTitle: 'Соцтармактар',
      description:
        'Жаңылыктар, департаменттер, туризм, өнүгүү долбоорлору жана тургундар менен коноктор үчүн санарип кызматтар.',
      privacy: 'Купуялуулук саясаты',
      copyright: '© 2026 Ысык-Көл облусу',
    },
  },
};

export function getDictionary(lang) {
  return dictionary[lang] ?? dictionary.ru;
}
