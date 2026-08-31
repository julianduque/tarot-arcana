import { ReadingExperience } from "../../components/ReadingExperience";
import { spreadDefinitions } from "../../lib/spreads";

export default function ThreeCardReading() {
  return (
    <ReadingExperience
      kind="three-card"
      title="Past, present, future"
      description="Three cards to see where a situation came from, where it stands, and where it may move."
      positions={spreadDefinitions["three-card"].positions}
    />
  );
}
