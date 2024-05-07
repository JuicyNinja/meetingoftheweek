import { useQuery } from '@tanstack/react-query';
import React from 'react';

import Chart from 'react-apexcharts';
import { fetchRecentMemberTotals } from '../../services';

const useGetRecentMemberTotalsHook = () => useQuery({
    queryKey: ["getRecentMemberTotal"],
    queryFn: async (): Promise<any> => {
        try {
            const data = await fetchRecentMemberTotals();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch recent member totals');
        }
    }
  });

const MemberChart: React.FC = () => {
    const {data: memberRecent, isLoading, isError} = useGetRecentMemberTotalsHook();
    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator
    }
    if (isError) {
        return <div>Error: Failed to fetch data</div>; // Show error message
    }
    const options: any = {
        chart: {
            id: "chart_member",
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
            text: 'New Members',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: memberRecent?.months,
        },
    };
    const series = [{
        name: "Members",
        data: memberRecent?.counts
    }];

    return (
        <div id="chart_member">
             <Chart options={options} series={series} type="line" height={350} />
        </div>
    );
};

export default MemberChart;
