"use client";
import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Giphy from "../public/assets/images/giphy2.gif";

type CountryData = {
  published: string;
  author: string;
};

type ChartOptions = {
  series: { name: string; data: number[] }[];
  options: {
    xaxis: { categories: string[] };
  };
};

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesChart2: FC = () => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3009/news");
      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }
      const data: CountryData[] = await response.json();

      setCountriesData(data);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const authorsCountByDate = countriesData.reduce((acc, country) => {
    const publishedDate = new Date(country.published);
    const formattedDate = new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
    }).format(publishedDate);

    if (!acc[formattedDate]) {
      acc[formattedDate] = new Set<string>();
    }

    acc[formattedDate].add(country.author);

    return acc;
  }, {} as Record<string, Set<string>>);

  console.log("Authors Count by Date: ", authorsCountByDate);

  const chartoptions: ChartOptions = {
    series: [
      {
        name: "Authors",
        data: Object.keys(authorsCountByDate).map(
          (date) => authorsCountByDate[date].size
        ),
      },
      // Add other series as needed
    ],
    options: {
      xaxis: {
        categories: Object.keys(authorsCountByDate),
      },
      // ... (your existing options)
    },
  };

  return (
    <Card className="flex justify-center max-w-full m-auto">
      <CardBody>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Sales Report
        </CardSubtitle>
        {loading ? (
          <div className="flex justify-center items-center">
            <img src={Giphy.src} alt="" />
          </div>
        ) : (
          <Chart
            type="area"
            width="100%"
            height="390"
            options={chartoptions.options}
            series={chartoptions.series}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default SalesChart2;
