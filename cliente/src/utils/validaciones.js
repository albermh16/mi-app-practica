export const tieneMinimo = (valor) => valor.length >= 6;
export const tieneMayuscula = (valor) => /[A-Z]/.test(valor);
export const tieneArroba = (valor) => /@/.test(valor);
export const seleccionValida = (valor) => valor !== "";