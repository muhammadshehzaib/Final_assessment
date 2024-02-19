import { useEffect, useState } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import Link from "next/link";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CountryData {
  participants: string;
  replies_count: number;
  published: string; // Assuming published is a string
  // Add other properties as needed
}

const SalesChart: React.FC = () => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);

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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Aggregate data based on months
  const aggregatedData: Record<
    string,
    { participants: number; replies_count: number }
  > = {};
  countriesData.forEach((country) => {
    const month = new Date(country.published).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
    if (!aggregatedData[month]) {
      aggregatedData[month] = { participants: 0, replies_count: 0 };
    }
    aggregatedData[month].participants += parseFloat(country.participants);
    aggregatedData[month].replies_count += country.replies_count;
  });

  const chartoptions = {
    series: [
      {
        name: "Participants Count",
        data: Object.values(aggregatedData).map((data) => data.participants),
      },
      {
        name: "Replies Count",
        data: Object.values(aggregatedData).map((data) => data.replies_count),
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
        categories: Object.keys(aggregatedData),
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
