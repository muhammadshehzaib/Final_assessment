"use client";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesChart = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [languagesData, setLanguagesData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3009/news");
      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }
      const data = await response.json();

      setCountriesData(data);

      // console.log("data : ", data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await fetch("http://localhost:3009/news");
      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }
      const data = await response.json();

      setLanguagesData(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchLanguages();
  }, []);

  const chartoptions = {
    series: [
      {
        name: "Participants Count",
        data: languagesData.map((language) => {
          // console.log("This is Participants  : " + language.domain_rank);
          return language.participants;
        }),
      },
      {
        name: "Replies Count",
        data: countriesData.map((country) => {
          // console.log("This is replies count : " + country.replies_count);
          return country.replies_count;
        }),
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
        borderColor: "rgba(0,0,0,0.1)",
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
        ],
      },
    },
  };
  return (
    <div>
      <Link
        href="/graph"
        className="nav-link text-black font-extrabold text-3xl"
      >
        <div className="mb-6"> Click Here to See Another Graph</div>
      </Link>
      <Card>
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
    </div>
  );
};

export default SalesChart;
