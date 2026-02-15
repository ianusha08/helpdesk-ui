import { useNavigate } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

interface Props {
    title: string;
}

const Placeholder = ({ title }: Props) => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 max-w-md w-full">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Construction className="h-8 w-8 text-brand" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
                <p className="text-gray-500 mb-6">
                    This feature is currently under development. Check back later for updates.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-hover hover:underline transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Placeholder;
