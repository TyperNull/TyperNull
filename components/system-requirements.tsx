import { Monitor, Apple, Cpu } from "lucide-react"

export function PhotoshopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 24 24" {...props}>
      <g transform="translate(-40 -40)">
        <rect width="24" height="24" x="40" y="40" fill="none"></rect>
        <path fill="currentColor" d="M301.909,382.991C301.909,382.494 301.506,382.091 301.009,382.091L282.991,382.091C282.494,382.091 282.091,382.494 282.091,382.991L282.091,401.009C282.091,401.506 282.494,401.909 282.991,401.909L301.009,401.909C301.506,401.909 301.909,401.506 301.909,401.009L301.909,382.991ZM283.891,383.891L283.891,400.109L300.109,400.109L300.109,383.891L283.891,383.891ZM297.312,390.465C296.907,390.111 296.226,389.838 295.546,389.816C294.853,389.793 294.184,390.024 293.747,390.531C293.454,390.871 293.245,391.344 293.245,392C293.245,393.122 293.884,393.615 294.735,393.934C294.956,394.017 295.194,394.086 295.419,394.171C295.608,394.243 295.819,394.303 295.819,394.574C295.819,394.723 295.813,394.838 295.749,394.908C295.654,395.012 295.494,394.987 295.352,394.975C295.12,394.954 294.883,394.897 294.781,394.796C294.43,394.444 293.86,394.444 293.509,394.796C293.157,395.147 293.157,395.717 293.509,396.068C293.819,396.379 294.487,396.706 295.195,396.768C295.899,396.83 296.609,396.635 297.077,396.123C297.388,395.783 297.619,395.291 297.619,394.574C297.619,393.375 296.972,392.855 296.149,392.524C295.916,392.43 295.665,392.356 295.429,392.271C295.351,392.243 295.275,392.215 295.204,392.181C295.127,392.145 295.045,392.11 295.045,392C295.045,391.873 295.053,391.772 295.11,391.706C295.198,391.605 295.348,391.61 295.487,391.615C295.73,391.623 295.982,391.693 296.126,391.819C296.5,392.146 297.069,392.108 297.396,391.735C297.723,391.361 297.685,390.792 297.312,390.465ZM287.239,395.861L287.239,388.139C287.239,387.683 287.579,387.3 288.032,387.245C289.262,387.098 290.49,387.147 291.413,387.503C292.564,387.949 293.329,388.81 293.329,390.284C293.329,391.711 292.397,392.7 291.164,393.19C290.49,393.458 289.734,393.565 289.039,393.525L289.039,395.861C289.039,396.358 288.636,396.761 288.139,396.761C287.642,396.761 287.239,396.358 287.239,395.861ZM289.039,391.73C289.503,391.777 290.034,391.702 290.498,391.518C291.046,391.3 291.529,390.917 291.529,390.284C291.529,389.545 291.027,389.212 290.38,389.068C289.972,388.977 289.515,388.951 289.039,388.969L289.039,391.73Z" transform="translate(-240 -340)"></path>
      </g>
    </svg>
  );
}

export default function SystemRequirements() {
  const requirements = [
    {
      icon: Monitor,
      title: "Windows",
      desc: "Windows 10 or newer",
      color: "primary"
    },
    {
      icon: Apple,
      title: "macOS",
      desc: "macOS 12.8 or newer",
      color: "accent"
    },
    {
      icon: PhotoshopIcon,
      title: "Photoshop",
      desc: "CC 2015 or newer",
      color: "primary"
    },
  ]

  return (
    <section className="py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            System Requirements
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-${req.color}/10 flex items-center justify-center`}>
                  <req.icon className={`w-5 h-5 text-${req.color}`} />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{req.title}</div>
                  <div className="text-xs text-muted-foreground">{req.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
