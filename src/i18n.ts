import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      'title': 'Apptrix Food',
      'menu': 'Menu',
      'logout': 'Log out',
      'order-history': 'Your order history:',
      'date': 'Date:',
      'address': 'Address:',
      'payment': 'Payment:',
      'total': 'Total:',
      'add': 'Add to cart',
      'empty-cart': "You haven't selected any products yet",
      'order': 'Your order:',
      'items': 'items of',
      'street': 'Street:',
      'building': 'Building:',
      'apartment': 'Apartment:',
      'place-order': 'Place order',
      'password': 'Password:',
      'login': 'Log in',
      'register': 'Register',
      'or': 'or',
      'no-orders': 'No orders',
      'page-not-found': 'Page not found'
    },
  },
  ru: {
    translation: {
      'title': 'Apptrix Еда',
      'menu': 'Меню',
      'logout': 'Выйти',
      'order-history': 'Ваша история заказов:',
      'date': 'Дата:',
      'address': 'Адрес:',
      'payment': 'Оплата:',
      'total': 'Итого:',
      'add': 'Добавить',
      'empty-cart': 'Пока Вы не выбрали ни одного продукта',
      'order': 'Ваш заказ:',
      'items': 'шт на сумму',
      'street': 'Улица:',
      'building': 'Дом:',
      'apartment': 'Квартира:',
      'place-order': 'Заказать',
      'password': 'Пароль:',
      'login': 'Войти',
      'register': 'Зарегистрироваться',
      'or': 'или',
      'no-orders': 'Нет заказов',
      'page-not-found': 'Страница не найдена'
    },
  },
}

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
})

export default i18n
