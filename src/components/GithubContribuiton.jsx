"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Meteors } from "./ui/meteors";
import { ShineBorder } from "./ui/shine-border";

const GithubContribution = ({ username = "gaznafis007" }) => {
  const [contributions, setContributions] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        if (!response.ok) throw new Error("Failed to fetch from the API");
        
        const data = await response.json();

        // Filter contributions from 2023 to now
        const startDate = new Date("2023-01-01");
        const filteredContributions = data.contributions
          .filter((day) => new Date(day.date) >= startDate)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setContributions(filteredContributions);
        setTotalContributions(filteredContributions.reduce((sum, day) => sum + day.count, 0));

        // Group contributions by weeks
        const weeklyContributions = [];
        let currentWeek = [];

        filteredContributions.forEach((day) => {
          const dayOfWeek = new Date(day.date).getDay();
          if (dayOfWeek === 0 && currentWeek.length > 0) {
            weeklyContributions.push(currentWeek);
            currentWeek = [];
          }
          currentWeek.push(day);
          if (currentWeek.length === 7) {
            weeklyContributions.push(currentWeek);
            currentWeek = [];
          }
        });

        if (currentWeek.length > 0) {
          weeklyContributions.push(currentWeek);
        }

        setWeeks(weeklyContributions);
      } catch (error) {
        setError("Error fetching contributions: " + error.message);
        console.error("Error fetching contributions:", error);
      }
    };

    fetchContributions();
  }, [username]);

  const getContributionColor = (level) => {
    switch (level) {
      case 0:
        return "bg-[#ddd]"; // Darker background
      case 1:
        return "bg-[#0e4429]"; // Darker green
      case 2:
        return "bg-[#006d32]"; // Dark green
      case 3:
        return "bg-[#26a641]"; // Medium green
      case 4:
        return "bg-[#39d353]"; // Light green
      default:
        return "bg-[#1b1f23]";
    }
  };

  const weekDays = ["", "Mon", "", "Wed", "", "Fri", ""];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (error) {
    return (
      <div className="relative w-full max-w-6xl mx-auto p-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] p-[1px] overflow-hidden">
        <Meteors number={10} />
      </div>
      <div className="relative rounded-xl bg-[#0d1117] p-8 overflow-x-auto">
        <ShineBorder>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <FaGithub className="w-8 h-8 text-[#7d8590]" />
              <h2 className="text-xl font-semibold text-[#7d8590]">
                {totalContributions} contributions in the last year
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <select className="bg-[#22262c] text-[#7d8590] rounded-md px-3 py-1 text-sm border border-[#363b42]">
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto pb-4">
            <div className="inline-flex gap-8">
              <div className="flex flex-col gap-[3px] pt-[22px]">
                {weekDays.map((day, index) => (
                  <div key={index} className="h-[10px] text-xs text-[#7d8590] leading-[10px]">
                    {day}
                  </div>
                ))}
              </div>
              <div className="flex flex-col min-w-max gap-4">
                <div className="flex gap-[50px]">
                  {months.map((month) => (
                    <div key={month} className="text-xs text-[#7d8590] font-medium">
                      {month}
                    </div>
                  ))}
                </div>
                <div className="flex gap-[2px]">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[2px]">
                      {week.map((day) => (
                        <motion.div
                          key={day.date}
                          className={`w-[10px] h-[10px] rounded-[2px] ${getContributionColor(day.level)}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.2,
                            delay: weekIndex * 0.01,
                            ease: "easeOut",
                          }}
                          whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.1 },
                          }}
                          title={`${day.count} contributions on ${day.date}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 text-xs text-[#7d8590]">
            <span>Learn how we count contributions</span>
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-[2px]">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div key={level} className={`w-[10px] h-[10px] rounded-[2px] ${getContributionColor(level)}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </ShineBorder>
      </div>
    </div>
  );
};

export default GithubContribution;