// gestao.js

function totalFaturadoAno() {
  return reservas.reduce((t, r) => t + r.total, 0);
}

function totalFaturadoMes(mes) {
  return reservas
    .filter(r => new Date(r.dataInicio).getMonth() + 1 === mes)
    .reduce((t, r) => t + r.total, 0);
}

function totalDiasReservados() {
  return reservas.reduce((t, r) => t + r.dias, 0);
}

function atualizarGestao() {
  const ano = document.getElementById("totalAno");
  const mes = document.getElementById("totalMes");
  const dias = document.getElementById("totalDias");
  const selectMes = document.getElementById("selectMes");

  if (ano) ano.textContent = `€${totalFaturadoAno()}`;
  if (dias) dias.textContent = totalDiasReservados();

  if (selectMes && mes) {
    const m = Number(selectMes.value);
    mes.textContent = `€${totalFaturadoMes(m)}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const selectMes = document.getElementById("selectMes");
  if (!selectMes) return;

  for (let i = 1; i <= 12; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `Mês ${i}`;
    selectMes.appendChild(opt);
  }

  selectMes.addEventListener("change", atualizarGestao);
});
