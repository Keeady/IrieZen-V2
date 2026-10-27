import BrainDumpFlowRenderer from "./brain-dump-renderer";

type BrainDumpScreen = {
  title: string;
  label: string;
  placeholder: string;
  onComplete:(text: string) => void;
  buttonLabel?: string;
  iconText?: string;
};

export default function BrainDumpScreen({
  onComplete,
  title,
  label,
  placeholder,
  buttonLabel,
  iconText
}: BrainDumpScreen) {

  return (
    <BrainDumpFlowRenderer
      onComplete={onComplete}
      title={title}
      label={label}
      placeholder={placeholder}
      buttonLabel={buttonLabel}
      iconText={iconText}
    />
  );
}
