let totalVezes = document.querySelector("#vezes");
let totalProbabilidade = document.querySelector("#probabilidade");
let ctx = document.getElementById("binomialChart").getContext("2d");
let myChart;

function calcularCombinacao(vezes, sucesso) {
  return (
    calcularFatorial(vezes) /
    (calcularFatorial(sucesso) * calcularFatorial(vezes - sucesso))
  );
}

function calcularFatorial(numero) {
  let acumulador = 1;
  while (numero > 0) {
    acumulador *= numero;
    numero--;
  }
  return acumulador;
}

function distribuicaoBinomial() {
  let probabilidade = parseFloat(totalProbabilidade.value);
  let vezes = parseInt(totalVezes.value);

  if (probabilidade >= 0 && probabilidade <= 1) {
    let resultados = [];
    for (let k = 0; k <= vezes; k++) {
      let combinacao = calcularCombinacao(vezes, k);
      let probabilidadeCalculada =
        combinacao *
        Math.pow(probabilidade, k) *
        Math.pow(1 - probabilidade, vezes - k);
      resultados.push(probabilidadeCalculada);
    }
    return resultados;
  }
}

function plotChart() {
  if (!totalVezes.value || !totalProbabilidade.value) {
    myChart.destroy();
    return;
  }

  let dadosGrafico = distribuicaoBinomial();

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Array.from({ length: totalVezes.value + 1 }, (_, i) => i),
      datasets: [
        {
          label: "Distribuição Binomial",
          data: dadosGrafico,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

totalVezes.addEventListener("input", plotChart);
totalProbabilidade.addEventListener("input", plotChart);
