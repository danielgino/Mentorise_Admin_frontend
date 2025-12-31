interface BadgeProps {
    isAlumni: boolean;
    mobile?: boolean
}

export function Badge({ isAlumni,mobile=false }: BadgeProps,) {
    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                isAlumni
                    ? "bg-green-100/60 text-green-700"
                    : "bg-gray-100/60 text-gray-600"
            }`}
        >
          {mobile ? (isAlumni ? "בוגר" : "אינו בוגר") : isAlumni ? "כן" : "לא"}
    </span>
    );
}