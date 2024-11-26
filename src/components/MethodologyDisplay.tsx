import { MethodologyResponse } from '../types/questionnaire';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { WeeklySchedule } from './WeeklySchedule';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subheading: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    list: {
        marginLeft: 20,
    },
});

const MethodologyPDF = ({ methodology }: { methodology: MethodologyResponse }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.heading}>Your Personalized Productivity Methodology</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subheading}>Work Intervals</Text>
                <Text style={styles.text}>{methodology.workIntervals}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subheading}>Energy Management Strategy</Text>
                <Text style={styles.text}>{methodology.energyStrategy}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subheading}>Top 3 Productivity Recommendations</Text>
                <View style={styles.list}>
                    {methodology.recommendations.map((rec, index) => (
                        <Text key={index} style={styles.text}>
                            • {rec}
                        </Text>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.subheading}>Productivity Blockers to Watch</Text>
                <View style={styles.list}>
                    {methodology.productivityBlockers.map((blocker, index) => (
                        <Text key={index} style={styles.text}>
                            • {blocker}
                        </Text>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.subheading}>Suggested Tools & Techniques</Text>
                <View style={styles.list}>
                    {methodology.suggestedTools.map((tool, index) => (
                        <Text key={index} style={styles.text}>
                            • {tool}
                        </Text>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.subheading}>Weekly Schedule Notes</Text>
                <View style={styles.list}>
                    {methodology.weeklySchedule.notes.map((note, index) => (
                        <Text key={index} style={styles.text}>
                            • {note}
                        </Text>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export function MethodologyDisplay({
    methodology,
}: {
    methodology: MethodologyResponse;
}) {
    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Your Personalized Productivity Methodology</h1>
                <PDFDownloadLink
                    document={<MethodologyPDF methodology={methodology} />}
                    fileName="productivity-methodology.pdf"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Download PDF
                </PDFDownloadLink>
            </div>

            <section>
                <h2 className="text-xl font-semibold mb-3">Work Intervals</h2>
                <p className="text-gray-700">{methodology.workIntervals}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-3">Energy Management Strategy</h2>
                <p className="text-gray-700">{methodology.energyStrategy}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-3">Top 3 Productivity Recommendations</h2>
                <ul className="list-disc list-inside space-y-2">
                    {methodology.recommendations.map((rec, index) => (
                        <li key={index} className="text-gray-700">{rec}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-3">Productivity Blockers to Watch</h2>
                <ul className="list-disc list-inside space-y-2">
                    {methodology.productivityBlockers.map((blocker, index) => (
                        <li key={index} className="text-gray-700">{blocker}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-3">Suggested Tools & Techniques</h2>
                <ul className="list-disc list-inside space-y-2">
                    {methodology.suggestedTools.map((tool, index) => (
                        <li key={index} className="text-gray-700">{tool}</li>
                    ))}
                </ul>
            </section>

            <WeeklySchedule schedule={methodology.weeklySchedule} />
        </div>
    );
} 