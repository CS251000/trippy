const Pill = ({ children, color }) => {
    const colorClasses = {
        blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-400",
        gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-400",
        red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border border-red-400",
        green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-400",
        yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-400",
        indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 border border-indigo-400",
        purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border border-purple-400",
        pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300 border border-pink-400",
    };

    const selectedClasses = colorClasses[color] || colorClasses["blue"]; // Default to blue if color is invalid

    return (
        <span
            className={`text-xs mx-2 font-medium me-2 px-2.5 py-0.5 rounded-full ${selectedClasses}`}
        >
            {children}
        </span>
    );
};

export default Pill;
