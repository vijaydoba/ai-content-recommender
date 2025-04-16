import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement);
function Dashboard() {
  const data = {
    labels: ["AI", "Python"],
    datasets: [{ label: "Views", data: [60, 40], backgroundColor: "rgba(75, 192, 192, 0.2)" }],
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl">Your Activity</h2>
      <Bar data={data} />
    </div>
  );
}
export default Dashboard;