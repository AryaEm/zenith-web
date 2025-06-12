"use client";

import { useEffect, useState } from "react";
import WelcomeAdmin from "./welcome-admin";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import { BASE_API_URL } from "../../../global";
import { get } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookie";
import { FaDollarSign } from "react-icons/fa6";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TooltipItem,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type GameSalesStat = {
    totalThisMonth: number;
    totalLastMonth: number;
    percentChange: number;
    message: string;
};

const getGameSalesStatThisMonth = async (): Promise<GameSalesStat | null> => {
    try {
        const TOKEN = getCookie("token");
        const url = `${BASE_API_URL}/game/monthly-purchase`;

        const { status, data } = await get<GameSalesStat>(url, TOKEN);

        if (status && data) return data;
        return null;
    } catch (err) {
        console.error("Error fetching game sales stat:", err);
        return null;
    }
};

export default function AdminContent() {
    const [monthlyStat, setMonthlyStat] = useState<GameSalesStat | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const stat = await getGameSalesStatThisMonth();
            if (stat) {
                setMonthlyStat(stat);
            }
        };

        fetchData();
    }, []);

    const viewsCards = [
        {
            title: "Purchased This Month",
            value: monthlyStat ? monthlyStat.totalThisMonth.toString() : "-",
            change: monthlyStat
                ? `${monthlyStat.percentChange > 0 ? "+" : ""}${monthlyStat.percentChange.toFixed(2)}%`
                : "-",
            changeType: monthlyStat ? (monthlyStat.percentChange >= 0 ? "positive" : "negative") : "positive",
        },
        {
            title: "Purchased last Month", value: monthlyStat ? monthlyStat.totalLastMonth.toString() : "-",
            change: "0",
            changeType: "positive",
        },
        { title: "All Users", value: "-", change: "-", changeType: "positive" },
        { title: "New Users", value: "18", change: "+3.1%", changeType: "positive" },
    ];

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Revenue",
                data: [5000, 25000, 50000, 90000, 130000, 128000, 150000, 180000, 210000, 220000, 225000, 240800],
                borderColor: "#8B5CF6",
                backgroundColor: "rgba(139, 92, 246, 0.1)",
                tension: 0.4,
                pointRadius: 1,
                pointHoverRadius: 6,
            },
            // {
            //     label: "Expenses",
            //     data: [50000, 80000, 35000, 120000, 90000, 100000, 190000, 200000, 140000, 100000, 112000, 150000],
            //     borderColor: "#38BDF8",
            //     backgroundColor: "rgba(56, 189, 248, 0.1)",
            //     tension: 0.4,
            //     pointRadius: 1,
            //     pointHoverRadius: 6,
            //     fill: true,
            // },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    color: "#FFFFFF",
                },
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<"line">) => {
                        return `$${context.raw?.toLocaleString()} (${context.dataset.label})`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#A3A3A3",
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
            },
            y: {
                ticks: {
                    color: "#A3A3A3",
                    callback: (tickValue: string | number) => {
                        if (typeof tickValue === "number") {
                            return `$${tickValue / 1000}K`;
                        }
                        return tickValue;
                    },
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
                fill: true,
            },
        },
    };

    return (
        <div className="h-dvh w-4/5 py-8 px-12 relative">
            <WelcomeAdmin />

            <div className="h-fit w-full grid grid-cols-1 md:grid-cols-4 gap-6 mt-2 mb-5">
                {viewsCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-[#212430] text-white p-4 rounded-lg shadow-md border border-[#343B4F]"
                    >
                        <div className="text-sm font-medium text-[#AEB9E1] sfprodisplay">{card.title}</div>
                        <div className="w-full flex items-center gap-4 py-1">
                            <div className="text-2xl font-bold">{card.value}</div>
                            <div
                                className={`text-sm flex items-center gap-1 font-medium px-2 py-[0.10rem] border border-opacity-20 rounded-md ${card.changeType === "positive"
                                    ? "text-[#14CA74] border-[#05C168] bg-[#05C168] bg-opacity-20"
                                    : "text-[#FF5A65] border-[#FF5A65] bg-[#FF5A65] bg-opacity-20"
                                    }`}
                            >
                                {card.change}
                                <FiArrowDownLeft className={`${card.changeType === "positive" ? "hidden" : "block"}`} />
                                <FiArrowUpRight className={`${card.changeType === "positive" ? "block" : "hidden"}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#212430] w-full h-[72%] border border-[#343B4F] rounded-lg p-6">
                <h3 className="text-[#AEB9E1] text-sm font-semibold mb-2">Total Revenue</h3>
                <div className="flex gap-4 sfprodisplay items-center">
                    <p className="text-white text-xl font-semibold flex items-center">
                        <FaDollarSign className="text-2xl" /> 240.8K
                    </p>
                    <p className="text-[#14CA74] bg-[#05C168] bg-opacity-20 border-[#05C168] border-opacity-20 border px-2 py-[0.10rem] rounded-md text-sm flex gap-1 items-center">
                        +24.6% <FiArrowUpRight />
                    </p>
                </div>
                <div className="h-[85%]">
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    );
}
