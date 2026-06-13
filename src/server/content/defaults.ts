import type { PageContentMap } from './schema';

const WHY_BODY = `Мы создаём печенье, которое хочется разломить. Каждый вкус — это баланс текстуры, начинки и эмоции.

Без компромиссов и «Просто сладко». —

та самая тягучая текстура NY cookies — много начинки внутри, а не «Намёк» — вкус, который не надо доедать — его хочется — готовим небольшими партиями, а не на поток — можно собрать набор под себя WOW! CRUMBS — когда хочется не просто попробовать, а вернуться снова.`;

const PROMO_DESCRIPTION = `Соберите сочетание,
которое хочется попробовать именно сейчас.
Нажмите на карточку, чтобы увидеть начинку, состав, кбжу и детали вкуса.

Каждый вкус — с характером и своей текстурой.`;

const PAYMENT_BODY = `Оплата производится после подтверждения заказа.
Мы отправим итоговую сумму с учётом доставки и удобный способ оплаты.`;

export const defaultContent: PageContentMap = {
  common: {
    site: {
      name: 'WOW! CRUMBS',
      phone: '+7 (968) 825 83 05',
      phoneHref: 'tel:+79688258305',
      email: 'mail@wowcrumbs.ru',
    },
    nav: [
      { id: 'hits', label: 'Хиты', href: '/hits' },
      { id: 'packaging', label: 'Коробки', href: '/boxes' },
      { id: 'delivery', label: 'Доставка', href: '/delivery' },
      { id: 'payment', label: 'Оплата', href: '/#payment' },
    ],
    socials: { vk: 'https://vk.com', telegram: 'https://t.me' },
    header: { logo: { src: '/images/logo.svg', alt: 'WOW! CRUMBS' } },
    footer: {
      title: 'Контактная информация',
      mailText: 'mail:',
      addressText: 'Адрес',
      decorLeft: '/images/footer/footer-decor-left.svg',
      decorRight: '/images/footer/footer-decor-right.svg',
      phoneIcon: '/images/footer/footer-phone.svg',
      vkIcon: '/images/footer/footer-vk.svg',
      telegramIcon: '/images/footer/footer-telegram.svg',
    },
  },

  home: {
    hero: {
      title: 'Печенье, которое ломают ради этого момента',
      subtitle: 'Хруст снаружи. Мягкое, тягучее внутри. Сочна',
      button: { label: 'Собрать набор', href: '/boxes' },
      cookieMain: {
        src: '/images/hero/hero-cookie-main-23ec7d.png',
        alt: 'Шоколадное печенье WOW CRUMBS',
      },
      cookieSecondary: '/images/hero/hero-cookie-secondary-3e0ad3.png',
      scribble: '/images/hero/hero-scribble-main.svg',
      scribbleTop: '/images/hero/hero-scribble-top.svg',
      scribbleSecondary: '/images/hero/hero-scribble-secondary.svg',
      ring: '/images/hero/hero-decor-ring.svg',
      blurCircle: '/images/hero/hero-decor-blur-circle.svg',
      zigzag: '/images/hero/hero-decor-zigzag.svg',
      bannerRing: '/images/hero/hero-banner-ring.svg',
      bgWave: '/images/hero/hero-bg-wave.svg',
      crumbs: [
        '/images/hero/hero-crumb-1.svg',
        '/images/hero/hero-crumb-2.svg',
        '/images/hero/hero-crumb-3.svg',
        '/images/hero/hero-crumb-4.svg',
        '/images/hero/hero-crumb-5.svg',
      ],
    },
    why: {
      title: 'Почему WOW CRUMBS?',
      body: WHY_BODY,
      gallery: [
        { src: '/images/why/why-1-217953.png', alt: 'Печенье WOW CRUMBS' },
        { src: '/images/why/why-2.png', alt: 'Ассортимент печенья' },
        { src: '/images/why/why-3.png', alt: 'Печенье с начинкой' },
        { src: '/images/why/why-4.png', alt: 'NY cookies' },
      ],
      decorHook: '/images/why/why-decor-hook.svg',
      decorSquiggleLeft: '/images/why/why-decor-squiggle-left.svg',
      decorSquiggleRight: '/images/why/why-decor-squiggle-right.svg',
    },
    promo: {
      title: 'Повод для десерта',
      subtitle: 'Выберите вкусы',
      description: PROMO_DESCRIPTION,
      button: { label: 'Перейти', href: '/hits' },
      media: { src: '/images/promo/promo-media.png', alt: 'Печенье на ложке' },
      decorRing: '/images/promo/promo-decor-ring.svg',
    },
    hits: {
      title: 'ХИТЫ',
      button: { label: 'Посмотреть хиты', href: '/hits' },
      description: [
        'Выберите вкусы',
        'Соберите сочетание, которое хочется попробовать именно сейчас.',
        'Нажмите на карточку, чтобы увидеть начинку, состав, кбжу и детали вкуса.',
        'Каждый вкус — с характером и своей текстурой.',
      ],
      products: [
        { id: 'pistachio', name: 'Pistachio\nBerry Melt', image: '/images/product-1.png' },
        { id: 'ferrero', name: 'Ferrero\nCore', image: '/images/hits/product-ferrero.png' },
        { id: 'lemon', name: 'Lemon\nBerry\nBliss', image: '/images/product-5.png' },
        {
          id: 'biscoff',
          name: 'Biscoff\nLava',
          image: '/images/hits/product-biscoff-69b495.png',
          overlayImage: '/images/hits/hits-cookie-overlay-5d98ac.png',
        },
        { id: 'salted', name: 'Salted\nToffee\nCrunch', image: '/images/hits/product-salted.png' },
      ],
      decorBlobLeft: '/images/hits/hits-decor-blob-left.svg',
      decorBlobRight: '/images/hits/hits-decor-blob-right.svg',
    },
    packaging: {
      title: 'Идеальный выбор для первого заказа',
      button: { label: 'Собрать набор', href: '/boxes' },
      items: [
        { src: '/images/box-1.png', alt: 'Фирменная коробка WOW CRUMBS' },
        { src: '/images/box-2-33f1f0.png', alt: 'Подарочная коробка WOW CRUMBS' },
        { src: '/images/box-3-39c788.png', alt: 'Набор печенья WOW CRUMBS' },
      ],
    },
    delivery: {
      title: 'ДОСТАВКА',
      paragraphs: [
        'Доставка осуществляется курьером в удобный для вас интервал времени.',
        'Стоимость доставки рассчитывается индивидуально в зависимости от адреса.',
      ],
      button: { label: 'Заказать доставку', href: '/delivery' },
      illustration: { src: '/images/delivery-truck-3e2e36.png', alt: 'Доставка WOW CRUMBS' },
      path: '/images/delivery/delivery-path.svg',
      star: '/images/delivery/delivery-decor-star.svg',
      truckLeft: '/images/delivery/truck-334-8621.png',
      truckRight: '/images/delivery/truck-334-8622.png',
    },
    payment: {
      title: '💳 ОПЛАТА',
      body: PAYMENT_BODY,
      accent: 'Доступна оплата переводом через СБП.',
      button: { label: 'Подробнее', href: '/checkout' },
      image: { src: '/images/payment-311a7a.png', alt: 'Оплата заказа' },
    },
  },

  hits: {
    title: 'ХИТЫ WOW! CRUMBS',
    subtitle:
      'Начните со вкусов, которые заказывают чаще всего — идеальный вариант для первого знакомства',
    bottomText: 'Идеальный выбор для первого заказа.',
    buyLabel: 'Добавить в корзину',
    buyHref: '/cart',
    banner: { src: '/images/hits/hits-banner.png', alt: 'Хиты WOW! CRUMBS' },
    bannerDonut: '/images/hits/banner-donut.svg',
    bannerCat: '/images/hits/banner-cat.svg',
    products: [
      { id: 'salted', name: 'Salted Toffee\nCrunch', image: '/images/hits/product-salted.png' },
      { id: 'ferrero', name: 'Ferrero Core', image: '/images/hits/product-ferrero.png' },
      { id: 'pistachio', name: 'Pistachio\nBerry Melt', image: '/images/product-1.png' },
      { id: 'lemon', name: 'Lemon Berry\nBliss', image: '/images/product-5.png' },
    ],
  },

  boxes: {
    constructor: {
      title: 'Собрать набор',
      note: 'Вы выбираете вкусы — мы аккуратно соберем ваш набор',
      cartLabel: 'Перейти в корзину',
      cartHref: '/cart',
      hero: { src: '/images/boxes/constructor-hero.png', alt: 'Набор печенья WOW! CRUMBS' },
      bannerText: 'Идеальный выбор для первого заказа',
      bannerBlobLeft: '/images/boxes/banner-blob-left.svg',
      bannerBlobRight: '/images/boxes/banner-blob-right.svg',
      sizes: [
        { id: 'mini', name: 'Mini — 4 шт', image: '/images/boxes/size-mini.png', href: '/boxes/mini' },
        {
          id: 'signature',
          name: 'Signature — 6 шт',
          image: '/images/boxes/size-signature.png',
          href: '/boxes/signature',
        },
        {
          id: 'party',
          name: 'Party — 12 шт',
          image: '/images/boxes/size-party.png',
          href: '/boxes/party',
        },
      ],
    },
    sets: {
      mini: {
        id: 'mini',
        title: 'Mini — 4 шт',
        size: 4,
        price: 1400,
        cartLabel: 'Перейти в корзину',
        cartHref: '/cart',
        note: 'Вы выбираете вкусы — мы аккуратно соберем ваш набор',
        mockup: '/images/boxes/box-mini.png',
        mockupAlt: 'Набор Mini WOW! CRUMBS',
      },
      signature: {
        id: 'signature',
        title: 'Signature — 6 шт',
        size: 6,
        price: 2000,
        cartLabel: 'Перейти в корзину',
        cartHref: '/cart',
        note: 'Вы выбираете вкусы — мы аккуратно соберем ваш набор',
        mockup: '/images/boxes/size-signature.png',
        mockupAlt: 'Набор Signature WOW! CRUMBS',
      },
      party: {
        id: 'party',
        title: 'Party — 12 шт',
        size: 12,
        price: 3800,
        cartLabel: 'Перейти в корзину',
        cartHref: '/cart',
        note: 'Вы выбираете вкусы — мы аккуратно соберем ваш набор',
        mockup: '/images/boxes/size-party.png',
        mockupAlt: 'Набор Party WOW! CRUMBS',
      },
    },
    flavors: Array.from({ length: 6 }, (_, index) => ({
      id: `cherry-${index + 1}`,
      name: 'Вишнёвое',
      image: '/images/boxes/cookie-cherry.png',
    })),
    cardDoodle: '/images/boxes/card-doodle.svg',
  },

  delivery: {
    title: 'Доставка',
    formTitle: 'Изменение адреса',
    removeLabel: 'Удалить',
    submitLabel: 'Купить',
    fields: [
      { id: 'address', label: 'Город, улица, дом', span: 'full' },
      { id: 'entrance', label: 'Подъезд', span: 'half' },
      { id: 'doorCode', label: 'Код двери', span: 'half' },
      { id: 'floor', label: 'Этаж', span: 'half' },
      { id: 'apartment', label: 'Квартира', span: 'half' },
      { id: 'comment', label: 'Комментарий к адресу', span: 'full' },
    ],
    banner: { src: '/images/delivery/delivery-banner.png', alt: 'Доставка печенья WOW! CRUMBS' },
    map: { src: '/images/delivery/delivery-map.png', alt: 'Зона доставки на карте' },
  },

  cart: {
    title: 'Корзина пуста',
    note: 'Соберите набор печенья — и он появится здесь.',
    linkLabel: 'Собрать набор',
    linkHref: '/boxes',
    pageTitle: 'Корзина',
    subtitle: 'Доступность вкусов зависит от партии',
    ordersTitle: 'Доступные заказы',
    buyLabel: 'Купить',
    checkoutLabel: 'Перейти к оформлению',
    checkoutHref: '/checkout',
    summaryTitle: 'Ваша корзина',
    goodsLabel: 'Товары',
    deliveryNote: 'Доступные способы и время доставки можно выбрать при оформлении',
  },
};
