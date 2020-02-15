(function() {
  const buildTable = arrayOfObjects => {
    const table = document.createElement("table");
    arrayOfObjects.forEach((item, idx) => {
      // first add headline to table
      if (idx === 0) {
        let tr = buildTr(item, true);
        table.appendChild(tr);
      }
      let tr = buildTr(item, false);
      table.appendChild(tr);
    });

    return table;
  };

  const buildTr = (obj, isHeader) => {
    let tr = document.createElement("tr");
    for (let key in obj) {
      let td = document.createElement(isHeader ? "th" : "td");
      td.textContent = isHeader ? key : obj[key];
      tr.appendChild(td);
    }

    return tr;
  };

  // Objects
  let sectionSwitcher = undefined,
    calculator = undefined,
    interestChart = undefined;

  // HTML Elements
  let tablePlacement = undefined;
  let submitBtn = undefined;
  let chartSelector = "#chart1";

  function main() {
    sectionSwitcher = new SectionSwitcher();
    calculator = new InterestCalculation();
    interestChart = new InterestChart(chartSelector);

    tablePlacement = document.getElementById("recap_table");
    chartPlacement = document.getElementById("income_chart");
    submitBtn = document.querySelector('#calculator input[type="submit"]');

    submitBtn.addEventListener("click", onCalculatorSubmit);
  }

  const onCalculatorSubmit = e => {
    e.preventDefault();
    const fd = parseForm(document.querySelector("form"));

    // destructing form data
    let {
      base,
      rate,
      periods,
      compound_frequency,
      tax_per_compound,
      addition_frequency,
      addition
    } = fd;

    compound_frequency = parseInt(compound_frequency, 10);
    addition_frequency = parseInt(addition_frequency, 10);

    [sum, road] = calculator.calculateCompound(
      base,
      periods,
      rate,
      compound_frequency,
      tax_per_compound,
      addition_frequency,
      addition
    );

    // update table data
    tablePlacement.innerHTML = "";
    tablePlacement.appendChild(buildTable(road));
    // switch section
    sectionSwitcher.switchToNext();

    // update chart
    let compoundChartData = {
      name: "Compound Interest",
      data: road.map(item => item.total)
    };

    let simpleChartData = {
      name: "Simple Interest",
      data: road.map(item => item.total)
    };

    let labels = road.map(item => item.period);
    interestChart.updateChartData(labels, [compoundChartData]);
  };

  const parseForm = form => {
    let params = {};
    form.querySelectorAll("input, select").forEach(input => {
      if (input.type === "submit") return;
      params[input.name] =
        input.type === "number" ? parseFloat(input.value) : input.value;
    });

    return params;
  };

  window.addEventListener("load", main);
})();
