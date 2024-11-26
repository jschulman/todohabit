import { WeeklySchedule as WeeklyScheduleType, TimeBlock } from '../types/questionnaire';

const categoryColors = {
    'deep-work': 'bg-blue-100 border-blue-300',
    'shallow-work': 'bg-green-100 border-green-300',
    'meetings': 'bg-purple-100 border-purple-300',
    'break': 'bg-yellow-100 border-yellow-300',
    'exercise': 'bg-red-100 border-red-300',
    'personal': 'bg-indigo-100 border-indigo-300',
};

const categoryIcons = {
    'deep-work': '🎯',
    'shallow-work': '📝',
    'meetings': '👥',
    'break': '☕',
    'exercise': '🏃‍♂️',
    'personal': '🌟',
};

interface TimeSlotProps {
    time: string;
    weekdayBlock?: TimeBlock;
    weekendBlock?: TimeBlock;
}

const TimeSlot = ({ time, weekdayBlock, weekendBlock }: TimeSlotProps) => {
    const renderBlock = (block?: TimeBlock) => {
        if (!block) return <div className="h-full p-2">-</div>;
        return (
            <div className={`h-full p-2 rounded-md ${categoryColors[block.category]}`}>
                <div className="flex justify-between items-start">
                    <span className="font-medium">{block.activity}</span>
                    <span>{categoryIcons[block.category]}</span>
                </div>
                <div className="text-sm text-gray-600">{block.description}</div>
            </div>
        );
    };

    return (
        <tr className="border-b">
            <td className="py-2 px-4 font-medium text-gray-500 w-24">{time}</td>
            <td className="py-2 px-4 w-1/2">{renderBlock(weekdayBlock)}</td>
            <td className="py-2 px-4 w-1/2">{renderBlock(weekendBlock)}</td>
        </tr>
    );
};

const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
};

export function WeeklySchedule({ schedule }: { schedule: WeeklyScheduleType }) {
    const timeSlots = generateTimeSlots();
    const weekdaySchedule = schedule.schedule.find(day => day.day === 'Monday')?.blocks || [];
    const weekendSchedule = schedule.schedule.find(day => day.day === 'Saturday')?.blocks || [];

    const findBlockForTime = (timeSlot: string, blocks: TimeBlock[]) => {
        return blocks.find(block => block.startTime === timeSlot);
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Your Ideal Week</h2>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="py-3 px-4 text-left text-gray-600">Time</th>
                            <th className="py-3 px-4 text-left text-gray-600">Weekday</th>
                            <th className="py-3 px-4 text-left text-gray-600">Weekend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((time) => (
                            <TimeSlot
                                key={time}
                                time={time}
                                weekdayBlock={findBlockForTime(time, weekdaySchedule)}
                                weekendBlock={findBlockForTime(time, weekendSchedule)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Schedule Notes</h3>
                <ul className="list-disc list-inside space-y-2">
                    {schedule.notes.map((note, index) => (
                        <li key={index} className="text-gray-700">{note}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(categoryColors).map(([category, color]) => (
                    <div
                        key={category}
                        className={`p-2 rounded-lg ${color} flex items-center justify-center`}
                    >
                        <span className="mr-2">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                        <span className="capitalize">{category.replace('-', ' ')}</span>
                    </div>
                ))}
            </div>
        </div>
    );
} 