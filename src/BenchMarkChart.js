import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import addHighchartsMore from 'highcharts/highcharts-more';
import { plotOptions, configLegend, XAxisLabelFormatter, XAxisLabels,dataJSON,chartConfig } from './PerformanceConfig';
import {
	HighchartsChart,
	Chart,
  AreaSplineSeries,  
  SplineSeries, 
  RangeSelector,
	withHighcharts,
	XAxis,
	YAxis,
	Legend,
	ColumnSeries,
	Title,
	Subtitle,
	Credits,
	Tooltip,
  ScatterSeries,
  ColumnRangeSeries,
  navigation,
} from 'react-jsx-highstock'; 
import applyExporting from 'highcharts/modules/exporting';
import { pathOr, isNil, isEmpty } from 'ramda';


const PerformanceTrackRecord = ({ data }) => {
  		applyExporting(Highcharts);
    	addHighchartsMore(Highcharts);

      let {
			TABS,
			chartStyle,
			plotOptionsData = plotOptions,
			credits,
			mainTitle,
			subTitle,
			PrefExportOptions,
		} = chartConfig,
		zoneTabValues = [],
		scatterTabValues = [],
		noBenchmarkPlotMarks = [],performanceBenchmarkData=dataJSON,loaded=true;
	const [currentTab, setTab] = useState(pathOr({}, [1], TABS));

	let { tickInterval = null, max = null, min = 0, mean = 0, title = null } = pathOr(
		{},
		[currentTab.anchor, 'axisData', 'yAxis'],
		performanceBenchmarkData,
	);

  performanceBenchmarkData[currentTab.anchor].scatterSeries.forEach((item, i) => {
			zoneTabValues.push(
				!item.validChartData || item.isOnlyMinMax
					? { value: i + 1, className: item.isOnlyMinMax ? 'zone-minMax' : 'zone-fundRaising' }
					: { value: i + 1 },
			);
			let FundRaisePointer = item.y > mean ? mean : max;
			if (!isEmpty(scatterTabValues)) {
				FundRaisePointer = scatterTabValues[i - 1].y > mean ? mean : max;
			}
			scatterTabValues.push(
				!item.validChartData || isNil(item.y)
					? { ...item, y: item.label === 'n/a' ? item.minOnEachBenchMark : FundRaisePointer }
					: item,
			);
			noBenchmarkPlotMarks.push(
				item.showNoBenchmark ? { y: item.y, label: item.pointLabel, validChartData: true } : {},
			);
		});
    
	const YAxisLabelFormatter = function() {
		return (XAxisLabels[currentTab.anchor] && (XAxisLabels[currentTab.anchor][this.value] || ' ')) || this.value;
  }

	const exportDataExcel = {
		text: 'Export underlying data to Excel',
		onclick: () => {
			toggleExportModal(true);
		},
	};

  const navigationItem={
        menuItemStyle: {
        //    fontWeight: 'normal',
        //    background: 'none'
        },
        menuItemHoverStyle: {
         //  fontWeight: 'bold',
            background: 'none',
            color: 'black'
        },
    }
return (
		<div class="tileWithButtonTabs-PerformanceRecord">
			{(loaded && (
				<HighchartsChart
					plotOptions={plotOptionsData}
					exporting={{
						...PrefExportOptions,
						buttons: {
							contextButton: {
								...PrefExportOptions.buttons.contextButton,
								menuItems: [...PrefExportOptions.buttons.contextButton.menuItems, exportDataExcel],
							},
						},filename: currentTab.anchor,
					}} navigation={navigationItem}>
					<Chart type="column" height={chartStyle.height} marginRight={chartStyle.marginRight} />
					<Legend {...configLegend()} />
					<Credits enabled={credits} />
					<XAxis
						categories={performanceBenchmarkData.categoriesList}
						labels={{
							formatter: XAxisLabelFormatter,
							useHTML: true,
							allowOverlap: true,
							style: {
								wordBreak: 'break-all',
								textOverflow: 'allow',
							},
						}}
					/>
					<Title useHTML={true}>{mainTitle}</Title>
					<Subtitle useHTML={true}>{subTitle}</Subtitle>
					<YAxis
						tickInterval={tickInterval}
						max={max}
						min={min}
						labels={{ formatter: YAxisLabelFormatter }}
						allowDecimals={true}
					>
						<YAxis.Title>{title}</YAxis.Title>
						{performanceBenchmarkData[currentTab.anchor].columnSeries &&
							performanceBenchmarkData[currentTab.anchor].columnSeries.map(item => (
								<ColumnRangeSeries
									name={item.labels.name}
									data={item.data}
									key={item.labels.key}
									id={item.labels.key}
									zoneAxis="x"
									zones={zoneTabValues}
									innerLabel={item.labels.innerLabel}
									isExcludeInnerLabel={performanceBenchmarkData.excludeInnerLabelBenchmarkIds}
									currentTab={currentTab}
									states={{ hover: { enabled: false } }}
								/>
							))}
						{scatterTabValues && (
							<ScatterSeries
								name="Plot_Marker"
								key={currentTab.anchor + currentTab.name}
								data={scatterTabValues}
								showInLegend={false}
								isExcludeInnerLabel={performanceBenchmarkData.excludeInnerLabelBenchmarkIds}
								currentTab={currentTab}
								marker={{ enabled: false, states: { hover: { enabled: false } } }}
							/>
						)}
						{!isEmpty(noBenchmarkPlotMarks) && (
							<ScatterSeries
								name="Plot_Marker2"
								key={currentTab.anchor}
								data={noBenchmarkPlotMarks}
								showInLegend={false}
								isExcludeInnerLabel={performanceBenchmarkData.excludeInnerLabelBenchmarkIds}
								currentTab={currentTab.anchor}
								marker={{ enabled: false, states: { hover: { enabled: false } } }}
							/>
						)}
					</YAxis>
				</HighchartsChart>
			)) || (
				<div className="chart">
					<Loading animate>Loading...</Loading>
				</div>
			)}
		</div>
	);
}

export default withHighcharts(PerformanceTrackRecord, Highcharts);
