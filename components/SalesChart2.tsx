"use client";
import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Giphy from "../public/assets/images/giphy2.gif";

type CountryData = {
  published: string;
  author: string;
  date: string;
};

type ChartOptions = {
  series: { name: string; data: any[] }[];
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
      const response = await fetch(
        "http://localhost:3009/news/author/aggregateByDate"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }
      const data: CountryData[] = await response.json();

      setCountriesData(data);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // console.log("This is countries data : ", countriesData);

  useEffect(() => {
    fetchData();
  }, []);

  const chartoptions: ChartOptions = {
    series: [
      {
        name: "Participants",
        data: countriesData.map((participants) => {
          return participants.author;
        }),
      },
    ],
    options: {
      xaxis: {
        categories: countriesData.map((date) => date.date),
      },
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
