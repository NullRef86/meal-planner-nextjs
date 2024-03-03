export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className="
                border
                text-sm 
                rounded-lg
                block 
                w-full
                p-2.5
                bg-gray-700
                border-gray-600
                placeholder-gray-400
                text-white
                focus:ring-purple-600
                focus:border-purple-600
            "
            {...props}
        />
    );
};