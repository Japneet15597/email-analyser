import { motion } from "framer-motion";

interface ScoreBarProps {
  title: String;
  decorator?: String;
  score: number;
  maxScorePossible: number;
}

const ScoreBar = ({
  title,
  decorator,
  score,
  maxScorePossible,
}: ScoreBarProps) => {
  const calculateWidth = () => {
    const val = (score / maxScorePossible) * 100;

    if (val > 100) {
      return 100;
    } else {
      return val;
    }
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="w-full rounded-full bg-gray-200 h-6">
        <motion.div
          animate={{ width: `${calculateWidth()}%` }}
          transition={{
            duration: 1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          style={{ width: `${calculateWidth()}%` }}
          className="bg-green-400 rounded-full h-full"
        ></motion.div>
      </div>
      <span className="text-sm font-medium">
        {title}: {score.toString()} {decorator ? decorator : ""}
      </span>
    </div>
  );
};

export default ScoreBar;
