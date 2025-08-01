"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaGithub } from "react-icons/fa"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import Link from "next/link"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

const GithubContribution = ({ username = "gaznafis007" }) => {
  const [contributions, setContributions] = useState([])
  const [displayedContributions, setDisplayedContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0)
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
        if (!response.ok) throw new Error("Failed to fetch contributions")
        const data = await response.json()
        setContributions(data.contributions)
        updateDisplayedContributions(data.contributions, selectedYear)

        // Mock GitHub stats (replace with actual GitHub API calls)
        setStats({
          totalCommits: Object.values(data.total).reduce((sum, commits) => sum + commits, 0),
          repositories: 115,
          pullRequests: 200,
          stars: 15,
          languages: [
            { name: "JavaScript", count: 70 },
            { name: "TypeScript", count: 65 },
            { name: "Python", count: 12 },
          ],
          monthlyCommits: [30, 10, 7, 36, 45, 80, 100, 120, 170, 160, 220, 190],
        })
      } catch (error) {
        setError("Error fetching data: " + error.message)
        console.error("Error fetching data:", error)
      }
    }
    fetchContributions()
  }, [username, selectedYear])

  useEffect(() => {
    updateDisplayedContributions(contributions, selectedYear)
  }, [selectedYear, contributions])

  const updateDisplayedContributions = (allContributions, year) => {
    const endDate = new Date(year, 11, 31)
    const startDate = new Date(endDate)
    startDate.setFullYear(startDate.getFullYear() - 1)
    startDate.setDate(startDate.getDate() + 1)

    const filteredContributions = allContributions
      .filter((day) => {
        const date = new Date(day.date)
        return date >= startDate && date <= endDate
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))

    setDisplayedContributions(filteredContributions)
    setTotalContributions(filteredContributions.reduce((sum, day) => sum + day.count, 0))
  }

  const getContributionColor = (count) => {
    if (count === 0) return "bg-gray-200"
    if (count < 5) return "bg-[#a7f3d0]"
    if (count < 10) return "bg-[#34d399]"
    if (count < 15) return "bg-[#10b981]"
    return "bg-[#047857]"
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Chart Data
  const languageChartData = {
    labels: stats ? stats.languages.map((lang) => lang.name) : [],
    datasets: [
      {
        label: "Repositories",
        data: stats ? stats.languages.map((lang) => lang.count) : [],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "#3b82f6",
        borderWidth: 1,
      },
    ],
  }

  const contributionTrendData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Commits",
        data: stats ? stats.monthlyCommits : [],
        fill: true,
        backgroundColor: "rgba(192, 38, 211, 0.2)",
        borderColor: "#c026d3",
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#1f2937", titleColor: "#fff", bodyColor: "#fff" },
    },
    scales: {
      x: { ticks: { color: "#9ca3af" } },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(156, 163, 175, 0.2)" },
      },
    },
  }

  if (error) {
    return (
      <div className="relative w-full max-w-6xl mx-auto p-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    )
  }

  const weeks = []
  for (let i = 0; i < displayedContributions.length; i += 7) {
    weeks.push(displayedContributions.slice(i, i + 7))
  }

  const months = Array.from(
    new Set(
      displayedContributions.map((d) => {
        const date = new Date(d.date)
        return date.toLocaleString("default", { month: "short" })
      }),
    ),
  )

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200/30 to-gray-300/30 animate-pulse-slow" />
        <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern
              id="futuristic-grid"
              patternUnits="userSpaceOnUse"
              width="40"
              height="40"
              patternTransform="rotate(45)"
            >
              <path
                d="M0 40 V0 H40"
                fill="none"
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#futuristic-grid)" />
        </svg>
      </div>
      <motion.div
        className="absolute top-1/2 left-1/2 w-3/4 h-3/4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-15"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.2, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-8">
        <motion.div
          className="relative w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 animate-glow pointer-events-none" />
          <div className="relative p-10">
            {/* Header Section */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FaGithub className="w-10 h-10 text-gray-900" />
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">GitHub Contributions</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Coding the future, one commit at a time — @{username}
                </p>
              </div>
            </motion.div>

            {/* Stats Section */}
            {stats && (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  { label: "Commits", value: stats.totalCommits, icon: "📝" },
                  { label: "Repositories", value: stats.repositories, icon: "📂" },
                  { label: "Pull Requests", value: stats.pullRequests, icon: "🔄" },
                  { label: "Stars", value: stats.stars, icon: "⭐" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="bg-gray-100/50 backdrop-blur-sm p-4 rounded-lg border border-gray-200/50 text-center"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-xl font-semibold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Contribution Graph */}
            <motion.div
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900">
                {totalContributions} Contributions
              </h2>
              <motion.select
                className="bg-gray-100/80 backdrop-blur-sm text-gray-900 rounded-lg px-4 py-2 text-sm font-medium border border-gray-200/50 hover:bg-gray-200 transition-colors"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {[...Array(5)].map((_, i) => {
                  const year = new Date().getFullYear() - i
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                })}
              </motion.select>
            </motion.div>

            <div className="overflow-x-auto mb-8">
              <div className="inline-flex flex-col min-w-full">
                {/* Months Row */}
                <motion.div
                  className="flex ml-[52px] justify-between w-[calc(100%-52px)] mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {months.map((month, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-600 font-medium w-[calc(100%/12)] text-center"
                    >
                      {month}
                    </div>
                  ))}
                </motion.div>

                {/* Days and Contributions Grid */}
                <div className="flex">
                  {/* Days Column */}
                  <motion.div
                    className="flex flex-col mr-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    {["Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
                      <div
                        key={i}
                        className="h-[14px] text-sm text-gray-600 leading-[14px] w-10 text-right pr-3 mb-[3px]"
                      >
                        {day}
                      </div>
                    ))}
                  </motion.div>

                  {/* Contributions Grid */}
                  <motion.div
                    className="flex gap-[3px] flex-1 w-[calc(100%-52px)]"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.003 },
                      },
                    }}
                  >
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[3px] flex-1">
                        {week.map((day) => (
                          <motion.div
                            key={day.date}
                            className={`w-full h-[14px] rounded-md ${getContributionColor(
                              day.count,
                            )} transition-all duration-200`}
                            variants={{
                              hidden: { scale: 0, opacity: 0 },
                              visible: { scale: 1, opacity: 1 },
                            }}
                            whileHover={{
                              scale: 1.3,
                              boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
                              transition: { duration: 0.1 },
                            }}
                            title={`${day.count} contributions on ${formatDate(day.date)}`}
                          />
                        ))}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            {stats && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="bg-gray-100/50 backdrop-blur-sm p-6 rounded-lg border border-gray-200/50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Top Languages
                  </h3>
                  <div className="h-[200px]">
                    <Bar data={languageChartData} options={chartOptions} />
                  </div>
                </div>
                <div className="bg-gray-100/50 backdrop-blur-sm p-6 rounded-lg border border-gray-200/50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Contribution Trend
                  </h3>
                  <div className="h-[200px]">
                    <Line data={contributionTrendData} options={chartOptions} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Footer */}
            <motion.div
              className="flex justify-between items-center mt-6 text-sm text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <Link
                href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/about-your-profile#contributions"
                className="hover:text-gray-900 transition-colors"
              >
                Learn how we count contributions
              </Link>
              <div className="flex items-center gap-2">
                <span>Less</span>
                <div className="flex gap-[3px]">
                  {[0, 4, 8, 12, 16].map((count) => (
                    <div
                      key={count}
                      className={`w-[14px] h-[14px] rounded-md ${getContributionColor(count)}`}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes glow {
          0% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(192, 38, 211, 0.2);
          }
          50% {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.4), 0 0 30px rgba(192, 38, 211, 0.3);
          }
          100% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(192, 38, 211, 0.2);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default GithubContribution