import React from "react";
import { FaCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center mt-5 py-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 6,
        }}
        className="relative w-16 h-16"
      >
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, index) => (
          <motion.div
            key={index}
            style={{
              transform: `rotate(${angle}deg) translate(30px) rotate(-${angle}deg)`,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600"
          >
            <FaCircle size={13} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;
