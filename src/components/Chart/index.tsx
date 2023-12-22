import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartItem,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { AxiosError } from "axios";

import { getCryptoChartData } from "../../api";
import { cryptoChartData } from "../../types";

import { SelectButton } from "../../components/SelectButton";
import { Loading } from "../../components/Loading";

import styles from "./Chart.module.scss";

const dateValues = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

ChartItem.register({
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
});

interface ChartProps {
  setError: React.Dispatch<React.SetStateAction<AxiosError | null>>;
}

export const Chart: FC<ChartProps> = ({ setError }) => {
  const [chartApiState, setChartApiState] = useState<{
    data: cryptoChartData | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });
  const [days, setDays] = useState<number>(1);

  let { id } = useParams();
  id = id?.slice(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setChartApiState((prev) => ({ ...prev, loading: true }));
        const data = await getCryptoChartData(`${id}`, days);
        setChartApiState((prev) => ({
          ...prev,
          data,
          loading: false,
        }));
      } catch (error) {
        setError(error as AxiosError);
      }
    };

    fetchData();
  }, [id, days]);

  return (
    <div className={styles.Chart}>
      {chartApiState.loading ? (
        <Loading />
      ) : (
        <>
          <Line
            data={{
              labels: chartApiState?.data?.prices.map((coin) => {
                const date = new Date(coin[0]);
                return days === 1
                  ? `${date.getHours() % 12 || 12}:${String(
                      date.getMinutes()
                    ).padStart(2, "0")} ${date.getHours() >= 12 ? "PM" : "AM"}`
                  : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: chartApiState?.data?.prices.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in usd`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 0,
                },
              },
            }}
          />
          <div className={styles.Chart__buttonsWrapper}>
            {dateValues.map((day) => (
              <SelectButton
                onClick={() => setDays(day.value)}
                isSelected={days === day.value}
                key={day.value}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
