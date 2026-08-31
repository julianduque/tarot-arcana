import { ReadingExperience } from "../../components/ReadingExperience";
import { spreadDefinitions } from "../../lib/spreads";

export default function CelticCrossReading() {
  return (
    <ReadingExperience
      kind="celtic-cross"
      title="Celtic Cross"
      description="Waite’s ten-card pattern, with an optional significator laid beneath the cross."
      positions={spreadDefinitions["celtic-cross"].positions}
    />
  );
}
