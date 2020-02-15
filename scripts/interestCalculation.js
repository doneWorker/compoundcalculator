(function() {
  class InterestCalculation {
    /**
     * @param {number} base - Principal
     * @param {integer} periods - Number of years to grow
     * @param {number} rate - Annual % of compound
     * @param {integer} [compFrequency=1] - Number of compounding period in one year
     * @param {integer} [compoundTax=0] - Tax you pay for each compounding
     * @param {integer} [additionFrequency=0] - Frequency of additions
     * @param {number} [addition=0] - Amount will be added every "additionalFrequency"
     * @returns {Array} [totalBalance, history]
     */
    calculateCompound(
      base,
      periods,
      rate,
      compFrequency = 1,
      compoundTax = 0,
      additionFrequency = 0,
      addition = 0
    ) {
      let road = [];
      let sum = base;
      let totalIncome = 0;
      const periodLabel = this.getPeriodLabel(compFrequency);

      // replanish - boolean that indicates should we make additions
      const replenish =
        additionFrequency !== 0 &&
        addition > 0 &&
        additionFrequency >= compFrequency;

      // if replenish frequency is not equal to compound frequency
      if (replenish && compFrequency !== additionFrequency) {
        addition *= additionFrequency / compFrequency;
      }

      if (compFrequency !== 1) {
        // if compounds more often than anually
        periods = periods * compFrequency;
        rate = rate / compFrequency;
      }

      for (let i = 1; i <= periods; i++) {
        let income = this.calculateIncome(sum, rate, compoundTax);
        totalIncome += income;
        sum += income;
        if (replenish) sum += addition;
        road.push(this.packField(i, sum, income, totalIncome, periodLabel));

        // make additions
      }

      return [sum, road];
    }

    /**
     * @param {number} base - Principal
     * @param {integer} periods - Number of years to grow
     * @param {number} rate - Annual % of compound
     * @returns {Array} [totalBalance, history]
     */
    calculateSimple(base, periods, rate, compoundTax = 0) {
      let road = [];
      let sum = base;
      let totalIncome = 0;
      const income = this.calculateIncome(sum, rate, compoundTax);
      const periodLabel = this.getPeriodLabel(compFrequency);

      for (let i = 1; i <= periods; i++) {
        totalIncome += income;
        sum += income;
        if (replenish) sum += addition;
        road.push(this.packField(i, sum, income, totalIncome, periodLabel));

        // make additions
      }

      return [sum, road];
    }

    calculateIncome(sum, rate, tax) {
      let income = (sum * rate) / 100;
      tax !== 0 && (income -= (income * tax) / 100);
      return income;
    }

    getPeriodLabel(times) {
      switch (times) {
        case 12:
          return "Month";
        case 52:
          return "Week";
        case 365:
          return "Day";
        case 1:
          return "Year";
        default:
          return "Period";
      }
    }

    packField(periodNumber, sum, income, totalIncome, periodLabel) {
      return {
        period: `${periodNumber} ${periodLabel}`,
        total: sum.toFixed(2),
        income: income.toFixed(2),
        "total income": totalIncome.toFixed(2)
      };
    }
  }

  window.InterestCalculation = InterestCalculation;
})();
