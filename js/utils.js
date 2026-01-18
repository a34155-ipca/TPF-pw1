function gerarId() {
  return Date.now();
}

function calcularDias(dataEntrada, dataSaida) {
  const inicio = new Date(dataEntrada);
  const fim = new Date(dataSaida);
  return (fim - inicio) / (1000 * 60 * 60 * 24);
}

function formatarMoeda(valor) {
  return valor.toFixed(2) + " €";
}
