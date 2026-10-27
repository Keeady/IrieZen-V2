import BrainDumpFlowRenderer from "./brain-dump-renderer";

type BrainDumpScreen = {
  title: string;
  label: string;
  placeholder: string;
  onComplete:(text: string) => void;
  buttonLabel?: string;
  iconText?: string;
  disabled: boolean;
};

export default function BrainDumpScreen({
  onComplete,
  title,
  label,
  placeholder,
  buttonLabel,
  iconText,
  disabled,
}: BrainDumpScreen) {

  return (
    <BrainDumpFlowRenderer
      onComplete={onComplete}
      title={title}
      label={label}
      placeholder={placeholder}
      buttonLabel={buttonLabel}
      iconText={iconText}
      disabled={disabled}
    />
  );
}
