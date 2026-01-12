function gerarId() {
  return Date.now();
}

function calcularDias(entrada, saida) {
  return (new Date(saida) - new Date(entrada)) / 86400000;
}
