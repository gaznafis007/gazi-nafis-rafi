"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaGithub } from "react-icons/fa"
import { Meteors } from "./ui/meteors"
import { ShineBorder } from "./ui/shine-border"

const GithubContribution = ({ username = "gaznafis007" }) => {
  const [contributions, setContributions] = useState([])
  const [displayedContributions, setDisplayedContributions] = useState([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [error, setError] = useState(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
        if (!response.ok) throw new Error("Failed to fetch from the API")

        const data = await response.json()
        setContributions(data.contributions)
        updateDisplayedContributions(data.contributions, selectedYear)
      } catch (error) {
        setError("Error fetching contributions: " + error.message)
        console.error("Error fetching contributions:", error)
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
    if (count === 0) return "bg-[#ebedf0]"
    if (count < 5) return "bg-[#9be9a8]"
    if (count < 10) return "bg-[#40c463]"
    if (count < 15) return "bg-[#30a14e]"
    return "bg-[#216e39]"
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
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
    <div className="flex justify-center items-center bg-gray-50 py-16">
      <div className="w-full max-w-5xl">
        <ShineBorder className={'mx-auto'} color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
          <div className="relative bg-white rounded-lg p-8 overflow-x-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <FaGithub className="w-8 h-8 text-[#24292f]" />
                <h1 className="text-2xl font-bold text-[#24292f]">My GitHub Journey</h1>
              </div>
              <p className="text-[#57606a] text-sm ml-11">
                Crafting code and building dreams, one commit at a time - @{username}
              </p>
            </div>

            {/* Contribution Stats */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl text-[#24292f]">{totalContributions} contributions</h2>
              <select
                className="bg-[#f6f8fa] text-[#24292f] rounded px-2 py-1 text-sm border border-[#d0d7de]"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {[...Array(5)].map((_, i) => {
                  const year = new Date().getFullYear() - i
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* Contribution Graph */}
            <div className="overflow-x-auto">
              <div className="inline-flex flex-col min-w-full">
                {/* Months Row */}
                <div className="flex ml-[42px] justify-between w-[calc(100%-42px)] mb-2">
                  {months.map((month, index) => (
                    <div key={index} className="text-xs text-[#57606a] font-medium w-[calc(100%/12)] text-center">
                      {month}
                    </div>
                  ))}
                </div>

                {/* Days and Contributions Grid */}
                <div className="flex">
                  {/* Days Column */}
                  <div className="flex flex-col mr-2">
                    {["Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
                      <div
                        key={i}
                        className="h-[10px] text-xs text-[#57606a] leading-[10px] w-8 text-right pr-2 mb-[2px]"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Contributions Grid */}
                  <motion.div
                    className="flex gap-[2px] flex-1 w-[calc(100%-42px)]"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.005 },
                      },
                    }}
                  >
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[2px] flex-1">
                        {week.map((day) => (
                          <motion.div
                            key={day.date}
                            className={`w-full h-[10px] rounded-sm ${getContributionColor(day.count)}`}
                            variants={{
                              hidden: { scale: 0 },
                              visible: { scale: 1 },
                            }}
                            whileHover={{
                              scale: 1.2,
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

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 text-xs text-[#57606a]">
              <span>Learn how we count contributions</span>
              <div className="flex items-center gap-1">
                <span>Less</span>
                <div className="flex gap-[2px]">
                  {[0, 4, 8, 12, 16].map((count) => (
                    <div key={count} className={`w-[10px] h-[10px] rounded-sm ${getContributionColor(count)}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Centered Meteors */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <Meteors number={40} />
            </div>
          </div>
        </ShineBorder>
      </div>
    </div>
  )
}

export default GithubContribution

