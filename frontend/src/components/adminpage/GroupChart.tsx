import React from 'react';
import Chart from 'react-apexcharts';
import { fetchRecentGroupTotals } from '../../services';
import { useQuery } from '@tanstack/react-query';

const useGetRecentGroupTotalsHook = () => useQuery({
    queryKey: ["getRecentGroupTotal"],
    queryFn: async (): Promise<any> => {
        try {
            const data = await fetchRecentGroupTotals();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch recent group totals');
        }
    }
  });

const GroupChart: React.FC = () => {
    const {data: groupRecent, isLoading, isError} = useGetRecentGroupTotalsHook();
    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator
    }
    if (isError) {
        return <div>Error: Failed to fetch data</div>; // Show error message
    }
    const options: any = {
        chart: {
            id: "chart_group",
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'New Groups',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: groupRecent?.months,
        },
    };
    const series = [{
        name: "Groups",
        data: groupRecent?.counts
    }];

    return (
        <div id="chart_group">
             <Chart options={options} series={series} type="line" height={350} />
        </div>
    );
};

export default GroupChart;
