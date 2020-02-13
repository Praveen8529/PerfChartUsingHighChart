export const chartConfig = {
	info: {
		fundRaisingInfo:
			'Preqin Market Benchmark Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.',
		netIrr:
			'Net IRRs are not yet available for this fund and benchmark.\n Net IRRs are shown when funds are three year post-vintage year.',
		emptyWithBell: 'n/a',
		noBenchmarkInfo:
			'There is not enough data among this benchmark’s constituent funds to generate meaningful benchmark boundaries for this metric.',
		bellQuatilInfo:
			' is not available for this fund. There is not enough data among this benchmark’s constituent funds to generate meaningful quartile boundaries for this metric.',
		bellMetricInfoValid:
			'There is not enough data among this benchmark’s constituent funds to generate meaningful quartile boundaries for this metric.',
		bellMetricInfo: ' is not available for this fund.',
		fundRaisingEval: [null, -999],
		preqinMarket:
			'Market Benchmark Quartiles are not yet available for this fund and benchmark. Quartiles are assigned to funds three years post-vintage year.',
	},

	legend: {
		legendText: ['1st Quartile', '2nd Quartile', '3rd Quartile', '4th Quartile'],
		quartileLabel: ['Q1', 'Q2', 'Q3', 'Q4'],
	},

	PrefExportOptions: {
   
		menuItemDefinitions: {
      
			downloadPNG: {
				text: 'Download PNG image',
			},
			downloadJPEG: {
				text: 'Download JPEG image',
			},
			downloadPDF: {
				text: 'Download PDF document',
			},
			downloadSVG: {
				text: 'Download SVG vector image',
			},
			prntChart: {
				text: 'Print chart',
			},
		},
		buttons: {
         _titleKey: 'praveen',
			contextButton: {
				text: 'Export Chart',
				symbol: 'url(https://static.preqin.com/assets/images/export-icon.png)',
				theme: {
					fill: 'none',
				},
        _titleKey: '',
				symbolX: 20,
				symbolY: 22,
				x: 0,
				y: -10,
				menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'prntChart'],
			},
      
		},
		printMaxWidth: 768,
		width: 1920,
		chartOptions: {
      plotOptions:{	
        series: {
		dataLabels: {
			enabled: true,
			useHTML: true,
			color: 'white',
			verticalAlign: 'middle',
			formatter: function() {
				return PlotMarker(
					this.x.benchmarkId,
					this.series.type === 'columnrange' ? this.series.type : this.series.name,
					this.series.userOptions,
					this.point,
          true
				);
			},
		},
	},},
			legend: {
			align: 'center',
		  verticalAlign: 'bottom',
		  itemMarginTop: 70,
		  symbolRadius: 0,
		  itemDistance: 30,
			},
			chart: {
				width: 1200,
				height: 900,
				events: { 
        	load: function() {
              this.container.innerHTML=this.container.innerHTML.replace(/-999/g,chartConfig.info.fundRaisingInfo)+inlineCssInject_Export;
          }
        },
			},
      title: {
				text: 'Praveen',
				style: {
					color: 'black',
				},
			},
		},
		filename: '',
		scale: 1,
		allowHTML: true,
    
	},

	credits: false,
	mainTitle: '&nbsp',
	subTitle: '&nbsp',
	chartStyle: {
		height: 690,
		minWidth: 1520,
		marginRight: 120,
	},
	zone: {
		style: 'zone-fundRaising',
	},
	TABS: [
		{ name: 'Preqin Market Benchmark', anchor: 'preqinMarket', title: ' ', tickInterval: 25 },
		{ name: 'Net IRR', anchor: 'netIrr', title: 'Net IRR (%)' },
		{ name: 'Net Multiple', anchor: 'netMultiple', title: 'Net Multiple (X)' },
		{ name: 'RVPI', anchor: 'rvip', title: 'RVPI (%)' },
		{ name: 'DPI', anchor: 'dpi', title: 'DPI (%)' },
		{ name: 'Called', anchor: 'called', title: 'Called (%)' },
	],
};

const _benchMarkFundRaiseInfo = (info,isExport,tabs) => `<div class="benchMark-info"><p>${isExport?(tabs.name + '-999'):info}<p></div>`;

const _benchMarkPlotMarker = (plotText, isShowBell, tab, benchmarkID, quartile,isExport) => {
	let isPlotTextNM = plotText === 'n/a',
		{ name, anchor } = tab;
	return `<span class="plottingMarker_fundSeries plottingMarker_${anchor}">
      <div class="marker marker--otherFund--comparision">
        <div class="marker__oval"></div>
        <span class="marker__label ${anchor}">
           ${plotText} ${quartile && anchor !== 'preqinMarket' ? ' in ' + quartile : ''} ${
		!isShowBell || isPlotTextNM ? _bellIconSVG(benchmarkID,isExport) : ''
	}
        </span>
       </div>
		</span>
 ${
		!isExport && (!isShowBell || isPlotTextNM)
			? `<div  class="NotificationModalWithBell" id='${benchmarkID}'>
          <p>${
						isPlotTextNM && isShowBell
							? name + chartConfig.info.bellMetricInfo
							: isPlotTextNM
							? name + chartConfig.info.bellQuatilInfo
							: chartConfig.info.bellMetricInfoValid
					}</p>
            <button class="NotificationModalWithBell__button" onclick="document.getElementById('${benchmarkID}').style.display='none'">
              Hide message
            </button>
       </div>`
			: ''
 }`;
};

const _bellIconSVG = (id,isExport) => bellSVGForExport;

const _benchInnerText = (innerLabel, height) => {
	if (height < 18) {
		return '';
	}
	return `<span class="text-primary">${innerLabel}</span>`;
};

let indexChart = { id: 0, name: null };

const _setIndexByChartType = type => {
	if (indexChart.name === type) {
		indexChart = {
			...indexChart,
			id: ++indexChart.id,
			name: type,
		};
	} else {
		indexChart = {
			...indexChart,
			id: 0,
			name: type,
		};
	}
};

export const XAxisLabelFormatter = function() {
	let width = this.chart.chartWidth / this.axis.categories.length - 40;
	return `<div class="custom-xLabels" style="width: ${width}px">
<span class="xAxisLabel-formatter link_blue">
	<a title='${this.value.benchmarkName}' href='${this.value.benchmarkHref}'>${this.value.benchmarkName}</a>
	</span><span class="xAxisLabel-formatter"><a title='${this.value.fundName}' href='${this.value.fundHref}'>${this.value.fundName}</a></span></div>`;
};

const PlotMarker = (benchmarkId, type, userOptions, pointData,isExport=false) => {
	_setIndexByChartType(type);
	let excludeInnerLabelShowBell = !userOptions.isExcludeInnerLabel.find(
		item => item.benchMarkId === benchmarkId && item.tab === userOptions.currentTab.anchor,
	);
	if (!userOptions.innerLabel) {
		return !userOptions.data[indexChart.id].validChartData
			? _benchMarkFundRaiseInfo(userOptions.data[indexChart.id].label,isExport,userOptions.currentTab)
			: _benchMarkPlotMarker(
					userOptions.data[indexChart.id].label,
					excludeInnerLabelShowBell,
					userOptions.currentTab,
					benchmarkId,
					userOptions.data[indexChart.id].quartile,isExport
			  );
	} else {
		return _benchInnerText(excludeInnerLabelShowBell ? userOptions.innerLabel : '', pointData.shapeArgs.height);
	}
};

export const configLegend = () => {
	let deviceWidth = window.innerWidth;
	let defaultConfig = {
		align: 'center',
		verticalAlign: 'bottom',
		itemMarginTop: 25,
		symbolRadius: 0,
		itemDistance: 30,
	};
	if (deviceWidth > 768) {
		return { ...defaultConfig, itemDistance: 100 };
	} else if (deviceWidth <= 768) {
		return { ...defaultConfig, itemDistance: 30 };
	}
};

export const XAxisLabels = {
	preqinMarket: {
		0: 'MIN',
		50: 'MEDIAN',
		100: 'MAX',
	},
};

export const plotOptions = {
	columnrange: {
		stacking: 'normal',
		pointPadding: 0,
		groupPadding: 0.2,
		pointWidth: 78,
		padding: 5,
		events: {
			legendItemClick: () => false,
		},
	},
	series: {
		dataLabels: {
			enabled: true,
			useHTML: true,
			color: 'white',
			verticalAlign: 'middle',
			formatter: function() {
				return PlotMarker(
					this.x.benchmarkId,
					this.series.type === 'columnrange' ? this.series.type : this.series.name,
					this.series.userOptions,
					this.point,
          false,
				);
			},
		},
	},
};


//export const dataJSON={"categoriesList":[{"benchmarkId":"421992","benchmarkName":"1992 - Venture - All - Most Up-to-Date","fundId":"31","fundName":"Abingworth Bioventures I","benchmarkHref":"/analysis/benchmarks/privateCapital/market/421992","fundHref":"/funds/31/overview/"},{"benchmarkId":"421996","benchmarkName":"1996 - Venture - All - Most Up-to-Date","fundId":"32","fundName":"Abingworth Bioventures II","benchmarkHref":"/analysis/benchmarks/privateCapital/market/421996","fundHref":"/funds/32/overview/"},{"benchmarkId":"432001","benchmarkName":"2001 - Venture - Europe - Most Up-to-Date","fundId":"33","fundName":"Abingworth Bioventures III","benchmarkHref":"/analysis/benchmarks/privateCapital/market/432001","fundHref":"/funds/33/overview/"},{"benchmarkId":"422003","benchmarkName":"2003 - Venture - All - Most Up-to-Date","fundId":"3490","fundName":"Abingworth Bioventures IV","benchmarkHref":"/analysis/benchmarks/privateCapital/market/422003","fundHref":"/funds/3490/overview/"},{"benchmarkId":"2242008","benchmarkName":"2008 - Private Equity - Europe - Most Up-to-Date","fundId":"14002","fundName":"Abingworth Bioventures V Co-Invest Growth Equity Fund","benchmarkHref":"/analysis/benchmarks/privateCapital/market/2242008","fundHref":"/funds/14002/overview/"}],"preqinMarket":{"columnSeries":[{"data":[[100,75],[100,75],[100,75],[100,75],[100,75]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"preqinMarket0"}},{"data":[[75,50],[75,50],[75,50],[75,50],[75,50]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"preqinMarket1"}},{"data":[[50,25],[50,25],[50,25],[50,25],[50,25]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"preqinMarket2"}},{"data":[[25,0],[25,0],[25,0],[25,0],[25,0]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"preqinMarket3"}}],"scatterSeries":[{"y":69.7,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"10/33","quartile":"Q2","label":"10/33","minOnEachBenchMark":0},{"y":51.2,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"21/43","quartile":"Q2","label":"21/43","minOnEachBenchMark":0},{"y":39.1,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"14/23","quartile":"Q3","label":"14/23","minOnEachBenchMark":0},{"y":59.6,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"19/47","quartile":"Q2","label":"19/47","minOnEachBenchMark":0},{"y":29.2,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"51/72","quartile":"Q3","label":"51/72","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":" ","max":100,"min":0,"mean":50,"tickInterval":25}}},"netMultiple":{"columnSeries":[{"data":[[15.68,2.7025],[22.5,2.49],[6.01,1.5625],[4.62,1.6125],[15.3,1.845]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"netMultiple0"}},{"data":[[2.7025,1.745],[2.49,1.64],[1.5625,1.175],[1.6125,1.085],[1.845,1.63]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"netMultiple1"}},{"data":[[1.745,1.165],[1.64,1.1],[1.175,0.5725],[1.085,0.5275],[1.63,1.405]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"netMultiple2"}},{"data":[[1.165,0.03],[1.1,0.1],[0.5725,0.36],[0.5275,0.01],[1.405,0.17]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"netMultiple3"}}],"scatterSeries":[{"y":2.36,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"2.36","quartile":"Q2","label":"2.36","minOnEachBenchMark":0.03},{"y":1.64,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"1.64","quartile":"Q2","label":"1.64","minOnEachBenchMark":0.1},{"y":0.99,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.99","quartile":"Q3","label":"0.99","minOnEachBenchMark":0.36},{"y":1.24,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"1.24","quartile":"Q2","label":"1.24","minOnEachBenchMark":0.01},{"y":1.22,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"1.22","quartile":"Q4","label":"1.22","minOnEachBenchMark":0.17}],"axisData":{"yAxis":{"title":"Net Multiple (X)","max":22.5,"min":0.01,"mean":11.255}}},"netIrr":{"columnSeries":[{"data":[[107.18,25.15],[188.44,58.75],[25.1,13],[35.1,8.425],[42.8,14.855]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"netIrr0"}},{"data":[[25.15,15.1],[58.75,10.95],[13,3.36],[8.425,1.495],[14.855,11.42]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"netIrr1"}},{"data":[[15.1,5.2],[10.95,4.26],[3.36,-0.2],[1.495,-10.45],[11.42,7.9925]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"netIrr2"}},{"data":[[5.2,-20.1],[4.26,-33.29],[-0.2,-10.11],[-10.45,-65.4],[7.9925,-17.3]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"netIrr3"}}],"scatterSeries":[{"y":21.58,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"21.6%","quartile":"Q2","label":"21.6%","minOnEachBenchMark":-20.1},{"y":10.8,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"10.8%","quartile":"Q3","label":"10.8%","minOnEachBenchMark":-33.29},{"y":-0.13,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"-0.1%","quartile":"Q3","label":"-0.1%","minOnEachBenchMark":-10.11},{"y":3.28,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"3.3%","quartile":"Q2","label":"3.3%","minOnEachBenchMark":-65.4},{"y":11.1,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"11.1%","quartile":"Q3","label":"11.1%","minOnEachBenchMark":-17.3}],"axisData":{"yAxis":{"title":"Net IRR (%)","max":188.44,"min":-65.4,"mean":61.519999999999996}}},"rvip":{"columnSeries":[{"data":[[0.06,0],[16.83,0],[113,3.195],[184.75,14.425],[321.2,63.12]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"rvip0"}},{"data":[[],[],[3.195,0],[14.425,0.235],[63.12,33.93]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"rvip1"}},{"data":[[],[],[],[0.235,0],[33.93,10.725]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"rvip2"}},{"data":[[],[],[],[],[10.725,0]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"rvip3"}}],"scatterSeries":[{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q1","label":"0.0%","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q1","label":"0.0%","minOnEachBenchMark":0},{"y":0.55,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.5%","quartile":"Q2","label":"0.5%","minOnEachBenchMark":0},{"y":4.87,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"4.9%","quartile":"Q2","label":"4.9%","minOnEachBenchMark":0},{"y":32.91,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"32.9%","quartile":"Q3","label":"32.9%","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":"RVPI (%)","max":321.2,"min":0,"mean":160.6}}},"dpi":{"columnSeries":[{"data":[[1568.37,270.5275],[2250.3,249],[488,156.475],[414.09,128.63],[1339,165.3]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"dpi0"}},{"data":[[270.5275,174.7],[249,161.68],[156.475,107.645],[128.63,93],[165.3,124.17]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"dpi1"}},{"data":[[174.7,116.725],[161.68,110.36],[107.645,57],[93,53.9],[124.17,92.525]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"dpi2"}},{"data":[[116.725,3],[110.36,10.38],[57,31.87],[53.9,0.81],[92.525,0]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"dpi3"}}],"scatterSeries":[{"y":236.34,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"236.3%","quartile":"Q2","label":"236.3%","minOnEachBenchMark":3},{"y":163.73,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"163.7%","quartile":"Q2","label":"163.7%","minOnEachBenchMark":10.38},{"y":98.62,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"98.6%","quartile":"Q3","label":"98.6%","minOnEachBenchMark":31.87},{"y":119.52,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"119.5%","quartile":"Q2","label":"119.5%","minOnEachBenchMark":0.81},{"y":88.89,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"88.9%","quartile":"Q4","label":"88.9%","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":"DPI (%)","max":2250.3,"min":0,"mean":1125.15}}},"called":{"columnSeries":[{"data":[[100.64,100],[128.63,100],[112.3,100],[117.31,100],[130.35,100]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"called0"}},{"data":[[100,100],[100,100],[100,100],[100,100],[100,96.59]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"called1"}},{"data":[[100,100],[100,100],[100,99.3],[100,99.2],[96.59,91.25]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"called2"}},{"data":[[100,95.48],[100,92.8],[99.3,85.5],[99.2,67.9],[91.25,79.06]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"called3"}}],"scatterSeries":[{"y":100,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"100.0%","quartile":"Q1","label":"100.0%","minOnEachBenchMark":95.48},{"y":100,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"100.0%","quartile":"Q1","label":"100.0%","minOnEachBenchMark":92.8},{"y":94.94,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"94.9%","quartile":"Q4","label":"94.9%","minOnEachBenchMark":85.5},{"y":98.5,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"98.5%","quartile":"Q4","label":"98.5%","minOnEachBenchMark":67.9},{"y":91.47,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"91.5%","quartile":"Q3","label":"91.5%","minOnEachBenchMark":79.06}],"axisData":{"yAxis":{"title":"Called (%)","max":130.35,"min":67.9,"mean":99.125}}},"excludeInnerLabelBenchmarkIds":[]}



//export const dataJSON={"categoriesList":[{"benchmarkId":"441995","benchmarkName":"1995 - Venture - North America - Most Up-to-Date","fundId":"2917","fundName":"Crescendo I","benchmarkHref":"/analysis/benchmarks/privateCapital/market/441995","fundHref":"/funds/2917/overview/"},{"benchmarkId":"441997","benchmarkName":"1997 - Venture - North America - Most Up-to-Date","fundId":"559","fundName":"Crescendo II","benchmarkHref":"/analysis/benchmarks/privateCapital/market/441997","fundHref":"/funds/559/overview/"},{"benchmarkId":"441998","benchmarkName":"1998 - Venture - North America - Most Up-to-Date","fundId":"560","fundName":"Crescendo III","benchmarkHref":"/analysis/benchmarks/privateCapital/market/441998","fundHref":"/funds/560/overview/"},{"benchmarkId":"442000","benchmarkName":"2000 - Venture - North America - Most Up-to-Date","fundId":"561","fundName":"Crescendo IV","benchmarkHref":"/analysis/benchmarks/privateCapital/market/442000","fundHref":"/funds/561/overview/"},{"benchmarkId":null,"benchmarkName":"","fundId":"13641","fundName":"Crescendo IV (b)","benchmarkHref":"/analysis/benchmarks/privateCapital/market/null","fundHref":"/funds/13641/overview/"}],"preqinMarket":{"columnSeries":[{"data":[[100,75],[100,75],[100,75],[100,75],[100,0]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"preqinMarket0"}},{"data":[[75,50],[75,50],[75,50],[75,50],[]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"preqinMarket1"}},{"data":[[50,25],[50,25],[50,25],[50,25],[]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"preqinMarket2"}},{"data":[[25,0],[25,0],[25,0],[25,0],[]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"preqinMarket3"}}],"scatterSeries":[{"y":90,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"3/30","quartile":"Q1","label":"3/30","minOnEachBenchMark":0},{"y":40,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"33/55","quartile":"Q3","label":"33/55","minOnEachBenchMark":0},{"y":20.4,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"43/54","quartile":"Q4","label":"43/54","minOnEachBenchMark":0},{"y":19.2,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"80/99","quartile":"Q4","label":"80/99","minOnEachBenchMark":0},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Preqin Market Benchmark Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":" ","max":100,"min":0,"mean":50,"tickInterval":25}}},"netMultiple":{"columnSeries":[{"data":[[42.45,4.9975],[12.84,3.6725],[19.86,1.585],[11.2,1.3225],[42.45,0]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"netMultiple0"}},{"data":[[4.9975,2.465],[3.6725,1.625],[1.585,1.05],[1.3225,0.94],[]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"netMultiple1"}},{"data":[[2.465,1.21],[1.625,1.0925],[1.05,0.53],[0.94,0.625],[]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"netMultiple2"}},{"data":[[1.21,0.15],[1.0925,0.17],[0.53,0.03],[0.625,0],[]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"netMultiple3"}}],"scatterSeries":[{"y":8.28,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"8.28","quartile":"Q1","label":"8.28","minOnEachBenchMark":0.15},{"y":1.36,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"1.36","quartile":"Q3","label":"1.36","minOnEachBenchMark":0.17},{"y":0.47,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.47","quartile":"Q4","label":"0.47","minOnEachBenchMark":0.03},{"y":0.45,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.45","quartile":"Q4","label":"0.45","minOnEachBenchMark":0},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Net Multiple Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":"Net Multiple (X)","max":42.45,"min":0,"mean":21.225}}},"netIrr":{"columnSeries":[{"data":[[447.4,79.75],[267.67,81.075],[514.33,16.525],[52.9,4.95],[514.33,-100]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"netIrr0"}},{"data":[[79.75,26.725],[81.075,29.79],[16.525,3.36],[4.95,-1.29],[]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"netIrr1"}},{"data":[[26.725,4.695],[29.79,5.4275],[3.36,-8.5625],[-1.29,-6.8525],[]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"netIrr2"}},{"data":[[4.695,-10.55],[5.4275,-14.1],[-8.5625,-71.8],[-6.8525,-100],[]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"netIrr3"}}],"scatterSeries":[{"y":447.4,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"447.4%","quartile":"Q1","label":"447.4%","minOnEachBenchMark":-10.55},{"y":19.9,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"19.9%","quartile":"Q3","label":"19.9%","minOnEachBenchMark":-14.1},{"y":-11.52,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"-11.5%","quartile":"Q4","label":"-11.5%","minOnEachBenchMark":-71.8},{"y":-7.4,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"-7.4%","quartile":"Q4","label":"-7.4%","minOnEachBenchMark":-100},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Net IRR Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":"Net IRR (%)","max":514.33,"min":-100,"mean":207.16500000000002}}},"rvip":{"columnSeries":[{"data":[[1.18,0],[2.61,0],[19.5,0],[42.75,3.56],[42.75,0]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"rvip0"}},{"data":[[],[],[],[3.56,0],[]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"rvip1"}},{"data":[[],[],[],[],[]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"rvip2"}},{"data":[[],[],[],[],[]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"rvip3"}}],"scatterSeries":[{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q1","label":"0.0%","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q1","label":"0.0%","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q1","label":"0.0%","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q2","label":"0.0%","minOnEachBenchMark":0},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"RVPI Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":"RVPI (%)","max":42.75,"min":0,"mean":21.375}}},"dpi":{"columnSeries":[{"data":[[4245,500.065],[1283.84,367.4625],[1986.22,155.01],[1120,132.69],[4245,0]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"dpi0"}},{"data":[[500.065,246.6],[367.4625,162.45],[155.01,104.37],[132.69,89.66],[]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"dpi1"}},{"data":[[246.6,121.0525],[162.45,109.5325],[104.37,51.085],[89.66,59.35],[]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"dpi2"}},{"data":[[121.0525,14.64],[109.5325,14.66],[51.085,2.5],[59.35,0],[]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"dpi3"}}],"scatterSeries":[{"y":827.5,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"827.5%","quartile":"Q1","label":"827.5%","minOnEachBenchMark":14.64},{"y":135.6,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"135.6%","quartile":"Q3","label":"135.6%","minOnEachBenchMark":14.66},{"y":46.73,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"46.7%","quartile":"Q4","label":"46.7%","minOnEachBenchMark":2.5},{"y":45.28,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"45.3%","quartile":"Q4","label":"45.3%","minOnEachBenchMark":0},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"DPI Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":"DPI (%)","max":4245,"min":0,"mean":2122.5}}},"called":{"columnSeries":[{"data":[[100.03,100],[110,100],[121.55,100],[129.3,100],[129.3,61.55]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"called0"}},{"data":[[100,100],[100,100],[100,100],[100,100],[]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"called1"}},{"data":[[100,100],[100,100],[100,100],[100,98.13],[]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"called2"}},{"data":[[100,61.55],[100,75.83],[100,92.83],[98.13,71.4],[]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"called3"}}],"scatterSeries":[{"y":100,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"100.0%","quartile":"Q1","label":"100.0%","minOnEachBenchMark":61.55},{"y":100,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"100.0%","quartile":"Q1","label":"100.0%","minOnEachBenchMark":75.83},{"y":100.02,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"100.0%","quartile":"Q1","label":"100.0%","minOnEachBenchMark":92.83},{"y":100.01,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"100.0%","quartile":"Q1","label":"100.0%","minOnEachBenchMark":71.4},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Called Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":"Called (%)","max":129.3,"min":61.55,"mean":95.42500000000001}}},"excludeInnerLabelBenchmarkIds":[]};

//Starting 2 ghosted Lines
//export const dataJSON={"categoriesList":[{"benchmarkId":null,"benchmarkName":"","fundId":"2546","fundName":"Horsley Bridge Fund IV","benchmarkHref":"/analysis/benchmarks/privateCapital/market/null","fundHref":"/funds/2546/overview/"},{"benchmarkId":null,"benchmarkName":"","fundId":"2547","fundName":"Horsley Bridge Fund V","benchmarkHref":"/analysis/benchmarks/privateCapital/market/null","fundHref":"/funds/2547/overview/"},{"benchmarkId":"271999","benchmarkName":"1999 - Fund of Funds - North America - Most Up-to-Date","fundId":"999","fundName":"Horsley Bridge Fund VI","benchmarkHref":"/analysis/benchmarks/privateCapital/market/271999","fundHref":"/funds/999/overview/"},{"benchmarkId":"272000","benchmarkName":"2000 - Fund of Funds - North America - Most Up-to-Date","fundId":"1000","fundName":"Horsley Bridge Fund VII","benchmarkHref":"/analysis/benchmarks/privateCapital/market/272000","fundHref":"/funds/1000/overview/"},{"benchmarkId":"272005","benchmarkName":"2005 - Fund of Funds - North America - Most Up-to-Date","fundId":"6202","fundName":"Horsley Bridge Fund VIII","benchmarkHref":"/analysis/benchmarks/privateCapital/market/272005","fundHref":"/funds/6202/overview/"},{"benchmarkId":"272008","benchmarkName":"2008 - Fund of Funds - North America - Most Up-to-Date","fundId":"12247","fundName":"Horsley Bridge Fund IX","benchmarkHref":"/analysis/benchmarks/privateCapital/market/272008","fundHref":"/funds/12247/overview/"},{"benchmarkId":"272012","benchmarkName":"2012 - Fund of Funds - North America - Most Up-to-Date","fundId":"34604","fundName":"Horsley Bridge X Venture","benchmarkHref":"/analysis/benchmarks/privateCapital/market/272012","fundHref":"/funds/34604/overview/"},{"benchmarkId":"272015","benchmarkName":"2015 - Fund of Funds - North America - Most Up-to-Date","fundId":"52105","fundName":"Horsley Bridge XI Venture","benchmarkHref":"/analysis/benchmarks/privateCapital/market/272015","fundHref":"/funds/52105/overview/"},{"benchmarkId":"272017","benchmarkName":"2017 - Fund of Funds - North America - Most Up-to-Date","fundId":"72584","fundName":"Horsley Bridge XII Venture","benchmarkHref":"/analysis/benchmarks/privateCapital/market/272017","fundHref":"/funds/72584/overview/"}],"preqinMarket":{"columnSeries":[{"data":[[100,0],[100,0],[100,75],[100,75],[100,75],[100,75],[100,75],[100,75],[100,75]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"preqinMarket0"}},{"data":[[],[],[75,50],[75,50],[75,50],[75,50],[75,50],[75,50],[75,50]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"preqinMarket1"}},{"data":[[],[],[50,25],[50,25],[50,25],[50,25],[50,25],[50,25],[50,25]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"preqinMarket2"}},{"data":[[],[],[25,0],[25,0],[25,0],[25,0],[25,0],[25,0],[25,0]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"preqinMarket3"}}],"scatterSeries":[{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Preqin Market Benchmark Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Preqin Market Benchmark Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0},{"y":20,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"20/25","quartile":"Q4","label":"20/25","minOnEachBenchMark":0},{"y":25,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"21/28","quartile":"Q3","label":"21/28","minOnEachBenchMark":0},{"y":93.5,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"3/46","quartile":"Q1","label":"3/46","minOnEachBenchMark":0},{"y":97,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"2/67","quartile":"Q1","label":"2/67","minOnEachBenchMark":0},{"y":31.6,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"26/38","quartile":"Q3","label":"26/38","minOnEachBenchMark":0},{"y":27.9,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"31/43","quartile":"Q3","label":"31/43","minOnEachBenchMark":0},{"y":31.2,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"22/32","quartile":"Q3","label":"22/32","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":" ","max":100,"min":0,"mean":50,"tickInterval":25}}},"netMultiple":{"columnSeries":[{"data":[[3.76,0.48],[3.76,0.48],[2.02,1.595],[2.11,1.62],[2.49,1.675],[3.76,2.11],[2.74,1.885],[1.63,1.375],[1.45,1.19]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"netMultiple0"}},{"data":[[],[],[1.595,1.24],[1.62,1.325],[1.675,1.54],[2.11,1.78],[1.885,1.56],[1.375,1.305],[1.19,1.09]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"netMultiple1"}},{"data":[[],[],[1.24,0.975],[1.325,1.155],[1.54,1.39],[1.78,1.54],[1.56,1.325],[1.305,1.215],[1.09,1.02]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"netMultiple2"}},{"data":[[],[],[0.975,0.48],[1.155,0.49],[1.39,0.88],[1.54,0.82],[1.325,1],[1.215,1],[1.02,0.65]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"netMultiple3"}}],"scatterSeries":[{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Net Multiple Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Net Multiple Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0},{"y":0.95,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.95","quartile":"Q4","label":"0.95","minOnEachBenchMark":0.48},{"y":1.21,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"1.21","quartile":"Q3","label":"1.21","minOnEachBenchMark":0.49},{"y":1.99,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"1.99","quartile":"Q1","label":"1.99","minOnEachBenchMark":0.88},{"y":2.83,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"2.83","quartile":"Q1","label":"2.83","minOnEachBenchMark":0.82},{"y":1.36,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"1.36","quartile":"Q3","label":"1.36","minOnEachBenchMark":1},{"y":1.23,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"1.23","quartile":"Q3","label":"1.23","minOnEachBenchMark":1},{"y":1.03,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"1.03","quartile":"Q3","label":"1.03","minOnEachBenchMark":0.65}],"axisData":{"yAxis":{"title":"Net Multiple (X)","max":3.76,"min":0.48,"mean":2.12}}},"netIrr":{"columnSeries":[{"data":[[39.2,-11.65],[39.2,-11.65],[16.75,10.1],[17.5,10.17],[15.91,8.91],[23.5,15.6],[24.6,19.19],[30.5,23.25],[39.2,22.3275]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"netIrr0"}},{"data":[[],[],[10.1,3.5],[10.17,5.765],[8.91,7.2],[15.6,12.8],[19.19,14.89],[23.25,16.18],[22.3275,5.06]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"netIrr1"}},{"data":[[],[],[3.5,0.07],[5.765,2.23],[7.2,6.39],[12.8,10],[14.89,8.86],[16.18,12.025],[5.06,-0.0825]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"netIrr2"}},{"data":[[],[],[0.07,-4.3],[2.23,-8.69],[6.39,1.9],[10,-2.8],[8.86,-0.01],[12.025,2.37],[-0.0825,-11.65]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"netIrr3"}}],"scatterSeries":[{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Net IRR Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Net IRR Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0},{"y":-0.7,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"-0.7%","quartile":"Q4","label":"-0.7%","minOnEachBenchMark":-4.3},{"y":2.47,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"2.5%","quartile":"Q3","label":"2.5%","minOnEachBenchMark":-8.69},{"y":14.6,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"14.6%","quartile":"Q1","label":"14.6%","minOnEachBenchMark":1.9},{"y":20.2,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"20.2%","quartile":"Q1","label":"20.2%","minOnEachBenchMark":-2.8},{"y":9.31,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"9.3%","quartile":"Q3","label":"9.3%","minOnEachBenchMark":-0.01},{"y":11.81,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"11.8%","quartile":"Q4","label":"11.8%","minOnEachBenchMark":2.37},{"y":3.83,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"3.8%","quartile":"Q3","label":"3.8%","minOnEachBenchMark":-11.65}],"axisData":{"yAxis":{"title":"Net IRR (%)","max":39.2,"min":-11.65,"mean":13.775000000000002}}},"rvip":{"columnSeries":[{"data":[[221,0],[221,0],[8.71,1.595],[18.76,3.415],[131.69,35.59],[221,83.42],[214.62,140.835],[154.93,125.3775],[145.2,114.2]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"rvip0"}},{"data":[[],[],[1.595,0.2],[3.415,1.155],[35.59,19],[83.42,59.98],[140.835,108.95],[125.3775,117.79],[114.2,104.48]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"rvip1"}},{"data":[[],[],[0.2,0],[1.155,0],[19,7.935],[59.98,40.04],[108.95,87.58],[117.79,106.2275],[104.48,100.79]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"rvip2"}},{"data":[[],[],[],[],[7.935,0],[40.04,0],[87.58,0],[106.2275,65.8],[100.79,64.62]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"rvip3"}}],"scatterSeries":[{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"RVPI Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"RVPI Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0},{"y":5.74,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"5.7%","quartile":"Q1","label":"5.7%","minOnEachBenchMark":0},{"y":11.29,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"11.3%","quartile":"Q1","label":"11.3%","minOnEachBenchMark":0},{"y":11.43,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"11.4%","quartile":"Q3","label":"11.4%","minOnEachBenchMark":0},{"y":168.57,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"168.6%","quartile":"Q1","label":"168.6%","minOnEachBenchMark":0},{"y":133.25,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"133.2%","quartile":"Q2","label":"133.2%","minOnEachBenchMark":0},{"y":123.16,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"123.2%","quartile":"Q2","label":"123.2%","minOnEachBenchMark":65.8},{"y":103.1,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"103.1%","quartile":"Q3","label":"103.1%","minOnEachBenchMark":64.62}],"axisData":{"yAxis":{"title":"RVPI (%)","max":221,"min":0,"mean":110.5}}},"dpi":{"columnSeries":[{"data":[[224.8,0],[224.8,0],[202,157.565],[209.45,163.01],[197.58,149.325],[224.8,136.94],[139.84,63.99],[51.7,21.035],[14.71,5.28]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"dpi0"}},{"data":[[],[],[157.565,121.5],[163.01,131.01],[149.325,132],[136.94,115.38],[63.99,38.205],[21.035,10.92],[5.28,0]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"dpi1"}},{"data":[[],[],[121.5,91.82],[131.01,111.49],[132,115.45],[115.38,89.1],[38.205,22.5675],[10.92,1.8525],[]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"dpi2"}},{"data":[[],[],[91.82,47.73],[111.49,49.29],[115.45,56.59],[89.1,27.43],[22.5675,0],[1.8525,0],[]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"dpi3"}}],"scatterSeries":[{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"DPI Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"DPI Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0},{"y":89.01,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"89.0%","quartile":"Q4","label":"89.0%","minOnEachBenchMark":47.73},{"y":109.52,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"109.5%","quartile":"Q4","label":"109.5%","minOnEachBenchMark":49.29},{"y":187.57,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"187.6%","quartile":"Q1","label":"187.6%","minOnEachBenchMark":56.59},{"y":114.43,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"114.4%","quartile":"Q3","label":"114.4%","minOnEachBenchMark":27.43},{"y":3.1,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"3.1%","quartile":"Q4","label":"3.1%","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q4","label":"0.0%","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q2","label":"0.0%","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":"DPI (%)","max":224.8,"min":0,"mean":112.4}}},"called":{"columnSeries":[{"data":[[122.65,4],[122.65,4],[121.25,104.52],[113.95,98.5],[114.8,100],[122.65,101.14],[100.67,95.2125],[103.38,78.7975],[77.57,43.96]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"called0"}},{"data":[[],[],[104.52,98],[98.5,97],[100,97.105],[101.14,95.5],[95.2125,88.205],[78.7975,65.175],[43.96,37.01]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"called1"}},{"data":[[],[],[98,96.23],[97,95.26],[97.105,88.685],[95.5,88.91],[88.205,80.7725],[65.175,54.925],[37.01,21.75]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"called2"}},{"data":[[],[],[96.23,70.61],[95.26,89],[88.685,68],[88.91,64],[80.7725,44.5],[54.925,4],[21.75,7.52]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"called3"}}],"scatterSeries":[{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Called Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Called Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0},{"y":98.28,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"98.3%","quartile":"Q2","label":"98.3%","minOnEachBenchMark":70.61},{"y":97.47,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"97.5%","quartile":"Q2","label":"97.5%","minOnEachBenchMark":89},{"y":99.58,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"99.6%","quartile":"Q2","label":"99.6%","minOnEachBenchMark":68},{"y":97.43,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"97.4%","quartile":"Q2","label":"97.4%","minOnEachBenchMark":64},{"y":92.22,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"92.2%","quartile":"Q2","label":"92.2%","minOnEachBenchMark":44.5},{"y":81.22,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"81.2%","quartile":"Q1","label":"81.2%","minOnEachBenchMark":4},{"y":37.54,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"37.5%","quartile":"Q2","label":"37.5%","minOnEachBenchMark":7.52}],"axisData":{"yAxis":{"title":"Called (%)","max":122.65,"min":4,"mean":63.325}}},"excludeInnerLabelBenchmarkIds":[]};

//2 bell Icon in net IRR
export const dataJSON={"categoriesList":[{"benchmarkId":"51991","benchmarkName":"1991 - Buyout - All - Most Up-to-Date","fundId":"4786","fundName":"ECI 4","benchmarkHref":"/analysis/benchmarks/privateCapital/market/51991","fundHref":"/funds/4786/overview/"},{"benchmarkId":"91995","benchmarkName":"1995 - Buyout - Small - All - Most Up-to-Date","fundId":"649","fundName":"ECI 5","benchmarkHref":"/analysis/benchmarks/privateCapital/market/91995","fundHref":"/funds/649/overview/"},{"benchmarkId":"141997","benchmarkName":"1997 - Buyout - Small - Europe - Most Up-to-Date","fundId":"650","fundName":"ECI 6","benchmarkHref":"/analysis/benchmarks/privateCapital/market/141997","fundHref":"/funds/650/overview/"},{"benchmarkId":"142000","benchmarkName":"2000 - Buyout - Small - Europe - Most Up-to-Date","fundId":"651","fundName":"ECI 7","benchmarkHref":"/analysis/benchmarks/privateCapital/market/142000","fundHref":"/funds/651/overview/"},{"benchmarkId":"142005","benchmarkName":"2005 - Buyout - Small - Europe - Most Up-to-Date","fundId":"5607","fundName":"ECI 8","benchmarkHref":"/analysis/benchmarks/privateCapital/market/142005","fundHref":"/funds/5607/overview/"},{"benchmarkId":"82010","benchmarkName":"2010 - Buyout - Mid - All - Most Up-to-Date","fundId":"15631","fundName":"ECI 9","benchmarkHref":"/analysis/benchmarks/privateCapital/market/82010","fundHref":"/funds/15631/overview/"},{"benchmarkId":"132015","benchmarkName":"2015 - Buyout - Mid - Europe - Most Up-to-Date","fundId":"43873","fundName":"ECI 10","benchmarkHref":"/analysis/benchmarks/privateCapital/market/132015","fundHref":"/funds/43873/overview/"},{"benchmarkId":"82018","benchmarkName":"2018 - Buyout - Mid - All - Most Up-to-Date","fundId":"89960","fundName":"ECI 11","benchmarkHref":"/analysis/benchmarks/privateCapital/market/82018","fundHref":"/funds/89960/overview/"}],"preqinMarket":{"columnSeries":[{"data":[[100,75],[100,75],[100,75],[100,75],[100,75],[100,75],[100,75],[100,0]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"preqinMarket0"}},{"data":[[75,50],[75,50],[75,50],[75,50],[75,50],[75,50],[75,50],[]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"preqinMarket1"}},{"data":[[50,25],[50,25],[50,25],[50,25],[50,25],[50,25],[50,25],[]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"preqinMarket2"}},{"data":[[25,0],[25,0],[25,0],[25,0],[25,0],[25,0],[25,0],[]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"preqinMarket3"}}],"scatterSeries":[{"y":27.3,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"8/11","quartile":"Q3","label":"8/11","minOnEachBenchMark":0},{"y":88.2,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"2/17","quartile":"Q1","label":"2/17","minOnEachBenchMark":0},{"y":7.7,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"12/13","quartile":"Q4","label":"12/13","minOnEachBenchMark":0},{"y":84.2,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"3/19","quartile":"Q1","label":"3/19","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"21/21","quartile":"Q4","label":"21/21","minOnEachBenchMark":0},{"y":81,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"4/21","quartile":"Q1","label":"4/21","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"8/8","quartile":"Q4","label":"8/8","minOnEachBenchMark":0},{"y":null,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"Preqin Market Benchmark Quartile not available for this fund. Quartiles are assigned to funds which have at least three years and which have reported Net IRR and Net Multiple values.","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":" ","max":100,"min":0,"mean":50,"tickInterval":25}}},"netMultiple":{"columnSeries":[{"data":[[3.67,3.015],[3.31,2.27],[2.73,2.26],[3.51,2.6025],[5.81,2.23],[2.96,2.1425],[1.67,1.36],[1.28,1.07]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"netMultiple0"}},{"data":[[3.015,2.44],[2.27,1.8],[2.26,1.5],[2.6025,2.07],[2.23,1.61],[2.1425,1.81],[],[1.07,0.97]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"netMultiple1"}},{"data":[[2.44,2.12],[1.8,0.925],[1.5,0.99],[2.07,1.4125],[1.61,1.145],[1.81,1.3275],[],[0.97,0.8575]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"netMultiple2"}},{"data":[[2.12,0.97],[0.925,0.18],[0.99,0.9],[1.4125,0.78],[1.145,0.84],[1.3275,1.08],[1.36,0.98],[0.8575,0.41]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"netMultiple3"}}],"scatterSeries":[{"y":2.2,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"2.2","quartile":"Q3","label":"2.2","minOnEachBenchMark":0.97},{"y":3.19,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"3.19","quartile":"Q1","label":"3.19","minOnEachBenchMark":0.18},{"y":0.93,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.93","quartile":"Q4","label":"0.93","minOnEachBenchMark":0.9},{"y":2.34,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"2.34","quartile":"Q2","label":"2.34","minOnEachBenchMark":0.78},{"y":0.84,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.84","quartile":"Q4","label":"0.84","minOnEachBenchMark":0.84},{"y":2.21,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"2.21","quartile":"Q1","label":"2.21","minOnEachBenchMark":1.08},{"y":0.98,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.98","quartile":"","label":"0.98","minOnEachBenchMark":0.98},{"y":0.86,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.86","quartile":"Q3","label":"0.86","minOnEachBenchMark":0.41}],"axisData":{"yAxis":{"title":"Net Multiple (X)","max":5.81,"min":0.18,"mean":2.9949999999999997}}},"netIrr":{"columnSeries":[{"data":[[54.7,40.1],[59.9,24.9425],[64.3,27.725],[36.6,31.2],[76.9,37.535],[31.13,21.61],[25.1,14.2],[76.9,-19.9]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"netIrr0"}},{"data":[[40.1,25.585],[24.9425,17.31],[27.725,9.25],[31.2,24.74],[37.535,13.9],[21.61,15.1],[],[]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"netIrr1"}},{"data":[[25.585,21.275],[17.31,2.2775],[9.25,0.735],[24.74,11.5],[13.9,4.4],[15.1,9.55],[],[]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"netIrr2"}},{"data":[[21.275,-0.47],[2.2775,-19.9],[0.735,-2.3],[11.5,-5.7],[4.4,-4.7],[9.55,1.9],[14.2,7.9],[]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"netIrr3"}}],"scatterSeries":[{"y":24.5,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"24.5%","quartile":"Q3","label":"24.5%","minOnEachBenchMark":-0.47},{"y":33.89,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"33.9%","quartile":"Q1","label":"33.9%","minOnEachBenchMark":-19.9},{"y":-1.8,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"-1.8%","quartile":"Q4","label":"-1.8%","minOnEachBenchMark":-2.3},{"y":32.5,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"32.5%","quartile":"Q1","label":"32.5%","minOnEachBenchMark":-5.7},{"y":null,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"n/a","minOnEachBenchMark":-4.7},{"y":null,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"n/a","minOnEachBenchMark":1.9},{"y":null,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"","quartile":"","label":"n/a","minOnEachBenchMark":7.9},{"y":-999,"validChartData":false,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"-999.0%","quartile":"","label":"Net IRRs are not yet available for this fund and benchmark.\n Net IRRs are shown when funds are three year post-vintage year.","minOnEachBenchMark":-999}],"axisData":{"yAxis":{"title":"Net IRR (%)","max":76.9,"min":-19.9,"mean":28.500000000000004}}},"rvip":{"columnSeries":[{"data":[[0,0],[0,0],[2.5,0],[4.72,0],[84.3,6.5],[119.49,74.07],[164.3,115],[126.48,103.96]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"rvip0"}},{"data":[[],[],[],[],[6.5,2],[74.07,38.61],[],[103.96,94.3]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"rvip1"}},{"data":[[],[],[],[],[2,0],[38.61,24.1975],[],[94.3,84.795]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"rvip2"}},{"data":[[],[],[],[],[],[24.1975,0],[115,92.45],[84.795,40.77]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"rvip3"}}],"scatterSeries":[{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q1","label":"0.0%","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q1","label":"0.0%","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q1","label":"0.0%","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q1","label":"0.0%","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q3","label":"0.0%","minOnEachBenchMark":0},{"y":24.4,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"24.4%","quartile":"Q3","label":"24.4%","minOnEachBenchMark":0},{"y":92.45,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"92.4%","quartile":"","label":"92.4%","minOnEachBenchMark":92.45},{"y":86.15,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"86.1%","quartile":"Q3","label":"86.1%","minOnEachBenchMark":40.77}],"axisData":{"yAxis":{"title":"RVPI (%)","max":164.3,"min":0,"mean":82.15}}},"dpi":{"columnSeries":[{"data":[[366.9,301.3825],[330.8,227.3],[273,225.8],[351,257.57],[579,223],[232.9,172.875],[59.4,6],[32.27,0.565]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"dpi0"}},{"data":[[301.3825,244.22],[227.3,179.9],[225.8,149.7],[257.57,207.32],[223,147.2],[172.875,140.25],[],[0.565,0]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"dpi1"}},{"data":[[244.22,212.1975],[179.9,92.1575],[149.7,99.05],[207.32,141.275],[147.2,97.76],[140.25,83.225],[],[]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"dpi2"}},{"data":[[212.1975,97.47],[92.1575,17.9],[99.05,87],[141.275,78.26],[97.76,72.8],[83.225,59.11],[6,0],[]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"dpi3"}}],"scatterSeries":[{"y":220,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"220.0%","quartile":"Q3","label":"220.0%","minOnEachBenchMark":97.47},{"y":319,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"319.0%","quartile":"Q1","label":"319.0%","minOnEachBenchMark":17.9},{"y":93,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"93.0%","quartile":"Q4","label":"93.0%","minOnEachBenchMark":87},{"y":234,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"234.0%","quartile":"Q2","label":"234.0%","minOnEachBenchMark":78.26},{"y":83.93,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"83.9%","quartile":"Q4","label":"83.9%","minOnEachBenchMark":72.8},{"y":196.37,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"196.4%","quartile":"Q1","label":"196.4%","minOnEachBenchMark":59.11},{"y":6,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"6.0%","quartile":"","label":"6.0%","minOnEachBenchMark":0},{"y":0,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"0.0%","quartile":"Q2","label":"0.0%","minOnEachBenchMark":0}],"axisData":{"yAxis":{"title":"DPI (%)","max":579,"min":0,"mean":289.5}}},"called":{"columnSeries":[{"data":[[106.52,100.0175],[115.54,100],[102,100],[110.49,100],[138,101.6],[116.4,102.18],[97.7,90.675],[50.11,30.1975]],"labels":{"name":"1st Quartile","innerLabel":"Q1","key":"called0"}},{"data":[[100.0175,100],[100,100],[100,100],[100,98],[101.6,100],[102.18,98.595],[90.675,82.64],[30.1975,18.48]],"labels":{"name":"2nd Quartile","innerLabel":"Q2","key":"called1"}},{"data":[[100,98.225],[100,92.895],[100,98.5],[98,94.075],[100,94.57],[98.595,91.225],[82.64,61.65],[18.48,10.52]],"labels":{"name":"3rd Quartile","innerLabel":"Q3","key":"called2"}},{"data":[[98.225,80.67],[92.895,82.8],[98.5,86.6],[94.075,87.46],[94.57,24.8],[91.225,73],[61.65,51],[10.52,6.78]],"labels":{"name":"4th Quartile","innerLabel":"Q4","key":"called3"}}],"scatterSeries":[{"y":98,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"98.0%","quartile":"Q4","label":"98.0%","minOnEachBenchMark":80.67},{"y":90,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"90.0%","quartile":"Q4","label":"90.0%","minOnEachBenchMark":82.8},{"y":102,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"102.0%","quartile":"Q1","label":"102.0%","minOnEachBenchMark":86.6},{"y":96,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"96.0%","quartile":"Q3","label":"96.0%","minOnEachBenchMark":87.46},{"y":98,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"98.0%","quartile":"Q3","label":"98.0%","minOnEachBenchMark":24.8},{"y":91,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"91.0%","quartile":"Q4","label":"91.0%","minOnEachBenchMark":73},{"y":91.36,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"91.4%","quartile":"Q1","label":"91.4%","minOnEachBenchMark":51},{"y":13,"validChartData":true,"isOnlyMinMax":false,"showNoBenchmark":false,"pointLabel":"13.0%","quartile":"Q3","label":"13.0%","minOnEachBenchMark":6.78}],"axisData":{"yAxis":{"title":"Called (%)","max":138,"min":6.78,"mean":72.39}}},"excludeInnerLabelBenchmarkIds":[{"benchMarkId":"132015","tab":"netIrr"},{"benchMarkId":"132015","tab":"netMultiple"},{"benchMarkId":"132015","tab":"rvip"},{"benchMarkId":"132015","tab":"dpi"}]};

const inlineCssInject_Export = `<style>@import 'https://code.highcharts.com/css/highcharts.css';
.plottingMarker_fundSeries{
  position: absolute;display: flex;justify-content: center;flex-direction: column;align-items: center;cursor: default;left: 60px;z-index: 1;
}
.plottingMarker_preqinMarket{
 left: 20px !important;
}
.marker{
  width: 0.05em;height: 89px;position: relative;display: inline-block;-webkit-transform: rotate(90deg);-moz-transform: rotate(90deg);-ms-transform: rotate(90deg);-o-transform: rotate(90deg);filter: progid: DXImageTransform.Microsoft.BasicImage(rotation=3);background: #6cbd70;top: -29px;
}.marker__oval{
  position: relative;left: -2px;width: 5px;height: 5px;-webkit-border-radius: 25px;-moz-border-radius: 25px;border-radius: 25px;background: #6cbd70;
}.marker__label{
  position: absolute;top: -49px;border-radius: 5px;left: -35px;display: flex;justify-content: left;align-items: center;background: #6cbd70;font-size: 10px;color: #fff;box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.17);z-index: 1;padding: 5px;display: inline-block;-webkit-transform: rotate(-90deg);-moz-transform: rotate(90deg);-ms-transform: rotate(90deg);-o-transform: rotate(90deg);filter: progid: DXImageTransform.Microsoft.BasicImage(rotation=3);
}.preqinMarket{
  min-width: 41px;top: -39px;left: -23px;
}.icon{
  margin-left: 0.2em;
}.highcharts-color-0{
  fill: #d8dafc;stroke: #d8dafc;
}.highcharts-color-1{
  fill: #7b7ec2;stroke: #7b7ec2;
}.highcharts-color-2{
  fill: #4d508f;stroke: #4d508f;
}.highcharts-color-3{
  fill: #3e4190;
}
.highcharts-color-4{
  fill: none !important;
  stroke: none !important;
}
.custom-xLabels{
  padding: 0 5px;white-space: normal;
}.xAxisLabel-formatter{
  display: block;padding: 10px 0;
}
.text-primary {
    color: white;
}
.benchMark-info {
height: 120px;
top: 5px;
width: 150px;
background-color: #ededed;
position: absolute;
display: flex;
cursor: default;
left: -30px;
padding: 12px;
box-shadow: 0 2px 2px rgba(0, 0, 0, 0.08);
white-space: pre-wrap !important;
}
.benchMark-info p {
height: 85px;
color: #282826;
font-size: 9px;
line-height: 15px;
text-align: center;
}
.no-data-columns .highcharts-point {
stroke: #d3d4d5 !important;
stroke-dasharray: 10,10;
stroke-width: 1px !important;
fill: none;
}
.zone-fundRaising {
stroke: #d3d4d5;
fill: white;
stroke-dasharray: 10, 10;
stroke-width: 1px;
}
.chart_fundSeries, .chart {
box-shadow: none;
margin-bottom: 0;
padding: 0;
}
.highcharts-title, .highcharts-title {
font-size: 18px;
font-weight: 600;
}
.highcharts-tick, .highcharts-tick {
stroke: none;
}
.highcharts-anchor, .highcharts-anchor {
text-decoration: underline;
cursor: pointer;
}
.highcharts-axis-title, .highcharts-axis-title {
font-size: 14px;
}
.highcharts-menu {
padding: 15px;
}
.highcharts-menu-item {
line-height: 30px;
}
.tooltip-line-1, .tooltip-line-2 {
font-size: 12px;
}
.highcharts-tooltip > span {
padding: 10px 0;
}
.highcharts-axis-labels {
text-align: center;
}

.highcharts-axis-labels a {
font-size: 12px;
color: #282826;
text-decoration: underline;
}
.zone-fundRaising {
stroke: #d3d4d5;
fill: white;
stroke-dasharray: 10, 10;
stroke-width: 1px;
}
.zone-minMax {
fill: #afb1cc;
}
.highcharts-legend-item text {
cursor: auto !important;
fill: #282826 !important;
stroke-width: 0 !important;
font-size: 12px !important;
}
.highcharts-scrolling {
overflow-x: auto;
}
.highcharts-axis-labels {
margin-top: 12px;
}
.highcharts-axis-line {
stroke: none;
}
a {
color: #282826;
text-decoration: underline;
}
.highcharts-tracker {
opacity: 1 !important;
visibility: visible !important;
}
.text-Primary-bellInfo {
font-weight: normal;
color: $white;
font-family: Open Sans;
font-style: normal;
font-size: 10px;
}
.text-Primary-bellInfo {
font-weight: normal;
color: white;
font-family: Open Sans;
font-style: normal;
font-size: 10px;
}
</style>`;

const bellSVGForExport=`|&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 15 15" fill="white">
<g clip-path="url(#clip0)">
<path d="M13.7059 12.6519L12.6321 10.8631C12.1371 10.0375 11.8753 9.09251 11.8753 8.12937V6.56249C11.8753 4.15062 9.91214 2.1875 7.50027 2.1875C5.08841 2.1875 3.12528 4.15062 3.12528 6.56249V8.12937C3.12528 9.09251 2.8634 10.0375 2.3684 10.8631L1.29464 12.6519C1.23651 12.7481 1.23525 12.8688 1.29027 12.9663C1.34591 13.0644 1.45026 13.125 1.56276 13.125H13.4378C13.5503 13.125 13.6546 13.0644 13.7102 12.9663C13.7653 12.8687 13.764 12.7481 13.7059 12.6519ZM2.11466 12.5L2.90403 11.1844C3.45777 10.2619 3.75027 9.20562 3.75027 8.12937V6.56249C3.75027 4.49436 5.43215 2.81249 7.50027 2.81249C9.5684 2.81249 11.2503 4.49436 11.2503 6.56249V8.12937C11.2503 9.20562 11.5428 10.2619 12.0959 11.1844L12.8859 12.5H2.11466Z"/>
<path d="M7.50001 0C6.81063 0 6.25 0.560625 6.25 1.25001V2.50002C6.25 2.67249 6.39001 2.8125 6.56251 2.8125C6.73501 2.8125 6.87502 2.67249 6.87502 2.49999V1.25001C6.87502 0.90501 7.15501 0.62502 7.50001 0.62502C7.84501 0.62502 8.125 0.90501 8.125 1.25001V2.50002C8.125 2.67249 8.26501 2.8125 8.43751 2.8125C8.61001 2.8125 8.75002 2.67249 8.75002 2.49999V1.25001C8.75002 0.560625 8.1894 0 7.50001 0Z"/>
<path d="M8.85251 12.6545C8.76438 12.5057 8.57375 12.457 8.42439 12.5426C8.27501 12.6301 8.22503 12.822 8.31251 12.9707C8.39375 13.1089 8.43813 13.2745 8.43813 13.4376C8.43813 13.9545 8.01752 14.3751 7.50063 14.3751C6.98375 14.3751 6.56313 13.9545 6.56313 13.4376C6.56313 13.2745 6.60752 13.1089 6.68876 12.9707C6.77563 12.8213 6.72564 12.6301 6.57688 12.5426C6.42626 12.457 6.23624 12.5057 6.14876 12.6545C6.01062 12.8907 5.9375 13.1614 5.9375 13.4376C5.93753 14.2995 6.63813 15.0001 7.50002 15.0001C8.3619 15.0001 9.06251 14.2995 9.06377 13.4376C9.06377 13.1614 8.99064 12.8907 8.85251 12.6545Z"/>
</g>
<defs>
<clipPath id="clip0">
<path d="M0 0H15V15H0V0Z"/>
</clipPath>
</defs>
</svg>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;