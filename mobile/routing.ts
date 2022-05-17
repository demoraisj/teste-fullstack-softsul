export type ScreenNames = keyof typeof screens;

export const screens = {
  loading: {
    name: "Loading",
    options: {
      title: 'Carregando',
      headerShown: false,
      headerBackVisible: false,
    },
  },

  login: {
    name: "Login",
    options: {
      title: 'Entrar',
      headerShown: false,
      headerBackVisible: false,
    },
  },

  list: {
    name: "List",
    options: {
      title: 'Lista de Filiais',
      headerBackVisible: false,
    },
  },

  details: {
    name: "Details",
    options: {
      title: 'Detalhes da Filial',
    },
  },
}