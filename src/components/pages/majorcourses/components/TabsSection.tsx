interface TabsSectionProps {
    activeTab: 'tracks' | 'courses';
    onTabChange: (tab: 'tracks' | 'courses') => void;
}

export function TabsSection({ activeTab, onTabChange }: TabsSectionProps) {
    return (
        <div className="flex gap-8 border-b border-gray-200">
            <button
                onClick={() => onTabChange('tracks')}
                className={`pb-4 px-2 text-xl transition-all relative ${
                    activeTab === 'tracks'
                        ? 'text-gray-900'
                        : 'text-gray-400 hover:text-gray-600'
                }`}
            >
                מסלולים
                {activeTab === 'tracks' && (
                    <div className="absolute bottom-0 right-0 left-0 h-[3px] bg-gradient-to-l from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] rounded-full" />
                )}
            </button>
            <button
                onClick={() => onTabChange('courses')}
                className={`pb-4 px-2 text-xl transition-all relative ${
                    activeTab === 'courses'
                        ? 'text-gray-900'
                        : 'text-gray-400 hover:text-gray-600'
                }`}
            >
                קורסים
                {activeTab === 'courses' && (
                    <div className="absolute bottom-0 right-0 left-0 h-[3px] bg-gradient-to-l from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] rounded-full" />
                )}
            </button>
        </div>
    );
}
