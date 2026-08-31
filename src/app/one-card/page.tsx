import { ReadingExperience } from "../../components/ReadingExperience";
import { oneCardPosition } from "../../lib/spreads";

export default function OneCardReading() {
  return (
    <ReadingExperience
      kind="one-card"
      title="One card"
      description="A single point of focus for the question in front of you."
      positions={[oneCardPosition]}
    />
  );
}
