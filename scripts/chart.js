(function() {
  // Chart
  class InterestChart {
    constructor(chartSelector) {
      this.chart = undefined;
      this.maxPointsToShow = 20;
      this.chartSelector = chartSelector;
      this.options = {
        showPoint: true,
        lineSmooth: true,
        axisX: {
          showGrid: true,
          showLabel: true
        },
        axisY: {
          offset: 50,
          labelInterpolationFnc: function(value) {
            return "$" + value;
          }
        }
      };
    }

    updateChartData(labels, series) {
      if (labels.length > this.maxPointsToShow) {
        labels = this.reduceFrequency(
          labels,
          Math.floor(labels.length / this.maxPointsToShow)
        );
        series.forEach((item) => {
            item.data = this.reduceFrequency(
              item.data,
              Math.floor(item.data.length / this.maxPointsToShow)
            );
        });
      }

      let data = {
        labels: labels,
        series: series
      };

      if (this.chart !== undefined) {
        this.updateLineChart(data);
      } else {
        this.createLineChart(data);
      }
    }

    getLabels(arr) {}

    getSeries() {}

    createLineChart(data) {
      this.chart = new Chartist.Line(this.chartSelector, data, this.options);
    }

    updateLineChart(data) {
      this.chart.update(data);
    }

    // keep every n item
    reduceFrequency(arr, n) {
      let result = [arr[0]];
      let prev = n;
      for (let i = 1; i < arr.length - 1; i++) {
        if (i === prev) {
          prev += n;
          result.push(arr[i]);
        }
      }

      result.push(arr[arr.length - 1]);
      return result;
    }
  }

  window.InterestChart = InterestChart;
})();
