export type ScreenNames = keyof typeof screens;

export const screens = {
  login: {
    name: "Login",
    options: {
      title: 'Entrar',
    },
  },

  list: {
    name: "List",
    options: {
      title: 'Lista de Filiais',
    },
  },

  details: {
    name: "Details",
    options: {
      title: 'Detalhes da Filial',
    },
  },
}