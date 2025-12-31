import { Plus } from 'lucide-react';
import {MentoPrimaryButton} from "../../../../assets/buttons/MentoPrimaryButton.tsx";
import {MentoOutlineButton} from "../../../../assets/buttons/MentoOutlineButton.tsx";


type PageHeaderProps = {
    onAddCourse: () => void;
    onAddMajor: () => void;
};

function PageHeader({ onAddCourse,onAddMajor }: PageHeaderProps) {
    return (
        <div className="flex items-start justify-between mb-12 gap-8">
            <div className="flex gap-3 flex-shrink-0">
                <MentoPrimaryButton
                    onClick={onAddCourse}
                    size="md"
                    shape="pill"
                    leftIcon={<Plus />}
                >
                    הוספת קורס
                </MentoPrimaryButton>

                <MentoOutlineButton
                    onClick={onAddMajor}
                    size="md"
                    shape="pill"
                    leftIcon={<Plus />}
                >
                    הוספת מסלול
                </MentoOutlineButton>

            </div>

            <div className="text-right flex-grow">
                <h1 className="mb-3" style={{ fontSize: '3rem', fontWeight: '700', background: 'linear-gradient(to left, #1a1a1a, #4a4a4a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    ניהול קורסים ומסלולים
                </h1>
                <p className="text-gray-500" style={{ fontSize: '1.125rem' }}>
                    ניהול כל הקורסים, שיוך למסלולים וסידור לפי שנה וסמסטר
                </p>
            </div>
        </div>
    );
}

export default PageHeader;
