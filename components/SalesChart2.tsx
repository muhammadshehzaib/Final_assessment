"use client";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const SalesChart2 = () => {
  const [countriesData, setCountriesData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3009/news");
      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }
      const data = await response.json();

      setCountriesData(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create a mapping to count authors for each date
  const authorsCountByDate = countriesData.reduce((acc, country) => {
    const publishedDate = new Date(country.published);
    const formattedDate = new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
    }).format(publishedDate);

    if (!acc[formattedDate]) {
      acc[formattedDate] = new Set();
    }

    acc[formattedDate].add(country.author);

    return acc;
  }, {});

  console.log("Authors Count by Date: ", authorsCountByDate);

  // Now you can use authorsCountByDate to update your chart options
  const chartoptions = {
    series: [
      {
        name: "Participants Count",
        data: Object.keys(authorsCountByDate).map(
          (date) => authorsCountByDate[date].size
        ),
      },
      // Add other series as needed
    ],
    options: {
      // ... (your existing options)
      xaxis: {
        categories: Object.keys(authorsCountByDate),
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
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        />
      </CardBody>
    </Card>
  );
};

export default SalesChart2;
