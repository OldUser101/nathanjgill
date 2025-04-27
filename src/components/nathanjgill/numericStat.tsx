import Counter from "./counter";

interface NumericStatProps {
    title: string,
    value: number,
    suffix?: string,
    prefix?: string,
    className?: string
}

export function NumericStat({title, value, suffix, prefix, className}: NumericStatProps) {
    return (
        <div className={`flex ${className}`}>
            <p className="text-base font-light mr-2 mt-auto">{prefix}</p>
            <div className="text-base font-semibold self-end"><Counter target={value}/>{suffix}</div>
            <p className="text-base font-light ml-2 mt-auto">{title}</p>
        </div>
    );
}