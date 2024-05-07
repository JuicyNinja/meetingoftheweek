import { useQuery } from '@tanstack/react-query';
import React from 'react';

import Chart from 'react-apexcharts';
import { fetchRecentReferralTotals } from '../../services';

const useGetRecentReferralTotalsHook = () => useQuery({
    queryKey: ["getRecentReferralTotal"],
    queryFn: async (): Promise<any> => {
        try {
            const data = await fetchRecentReferralTotals();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch recent referral totals');
        }
    }
  });

const ReferralChart: React.FC = () => {
    const {data: referralRecent, isLoading, isError} = useGetRecentReferralTotalsHook();
    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator
    }
    if (isError) {
        return <div>Error: Failed to fetch data</div>; // Show error message
    }
    const options: any = {
        chart: {
            id: "chart_referral",
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
            text: 'New Referrals',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: referralRecent?.months,
        },
    };
    const series = [{
        name: "Referrals",
        data: referralRecent?.counts
    }];

    return (
        <div id="chart_referral">
             <Chart options={options} series={series} type="line" height={350} />
        </div>
    );
};

export default ReferralChart;
