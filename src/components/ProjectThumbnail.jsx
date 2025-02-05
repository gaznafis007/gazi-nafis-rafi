import { motion } from "framer-motion"

const ProjectThumbnail = ({ title, color }) => {
  return (
    <motion.div
      className="w-full h-64 rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          background: `linear-gradient(45deg, ${color}, ${color}88)`,
        }}
      >
        <h3 className="text-3xl font-bold text-white text-center px-4">{title}</h3>
      </div>
    </motion.div>
  )
}

export default ProjectThumbnail

