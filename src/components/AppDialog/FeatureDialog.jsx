import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import AppDialog from "../AppDialog/AppDialog";
import "./FeatureDialog.css";

function FeaturesDialog({ open, onClose }) {
  const features = [
    {
      icon: "⚡",
      title: "Fast Results",
      description: "Instant search powered by optimized queries.",
    },
    {
      icon: "🎙️",
      title: "Voice Search",
      description: "Search hands-free with built-in speech recognition.",
    },
    {
      icon: "⌨️",
      title: "Keyboard Navigation",
      description: "Navigate suggestions with arrow keys and Enter.",
    },
    {
      icon: "🎯",
      title: "Smart Suggestions",
      description: "Recent searches appear as you type.",
    },
  ];

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Features"
      icon={<AutoAwesomeOutlinedIcon />}
      maxWidth="xs"
    >
      <div className="featureList">
        {features.map((feature) => (
          <div key={feature.title} className="featureItem">
            <span className="featureEmoji">{feature.icon}</span>

            <div className="featureInfo">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </AppDialog>
  );
}

export default FeaturesDialog;
