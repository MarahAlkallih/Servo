
type DetailsCardProps = {
    label: string;
    value: string;
    icon: React.ReactNode;
}

export const Card = ({ label, value, icon }: DetailsCardProps) => {
    return (
        <div
            className="
                rounded-2xl bg-(--light-color) border border-(--main-color)/15
                px-4 py-4 shadow-sm text-right
                transition-all hover:shadow-md hover:-translate-y-0.5
            "
            dir="rtl"
        >
            <div className="flex items-center justify-between gap-3">
                <div className="text-(--main-color) shrink-0">{icon}</div>

                <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-600 mb-1">{label}</p>
                    <p className="text-lg font-medium text-gray-900 wrap-break-word">{value}</p>
                </div>
            </div>
        </div>
    )
}