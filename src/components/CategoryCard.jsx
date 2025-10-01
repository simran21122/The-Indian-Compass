import { motion } from "framer-motion";

function CategoryCard({ category, data, activeCategory, setActiveCategory, culturalContent }) {
  const IconComponent = data.icon;
  const isActive = activeCategory === category;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveCategory(category)}
      className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-r ${data.color} text-white shadow-lg`
          : "bg-white hover:shadow-md border border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isActive ? "bg-white/20" : `bg-gradient-to-r ${data.color}`
          }`}
        >
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className={`font-semibold ${isActive ? "text-white" : "text-gray-900"}`}>
            {data.label}
          </h3>
          <p className={`text-sm ${isActive ? "text-white/80" : "text-gray-500"}`}>
            {culturalContent.filter(
              (item) => category === "all" || item.category === category
            ).length}{" "}
            items
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default CategoryCard;
