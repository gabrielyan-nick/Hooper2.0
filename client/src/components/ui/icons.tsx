import cn from "clsx";

interface IIconRectangular {
  width?: number;
  height?: number;
  className?: string;
}

interface IIconSquare {
  size?: number;
  className?: string;
}

export const HooperLogoIcon = ({
  width = 187,
  height = 55,
  className = "",
}: IIconRectangular) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 27.182098 7.9947346"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="a">
          <stop offset={0} stopColor="#00914c" stopOpacity={1} />
          <stop offset={0.5} stopColor="#147c3f" stopOpacity={1} />
          <stop offset={0.75} stopColor="#ff5235" stopOpacity={1} />
          <stop offset={1} stopColor="#d04516" stopOpacity={1} />
        </linearGradient>
        <linearGradient
          xlinkHref="#a"
          id="b"
          x1={3.1964653}
          y1={0.22348779}
          x2={26.429989}
          y2={0.22348779}
          gradientUnits="userSpaceOnUse"
        />
      </defs>
      <text
        xmlSpace="preserve"
        style={{
          whiteSpace: "pre",
          inlineSize: 29.2427,
        }}
        x={2.4294252}
        y={2.5836747}
        transform="translate(-2.1 3.44)"
        fontSize="1.74431px"
        letterSpacing="-.101751px"
        wordSpacing={0}
        fill="url(#b)"
        fillOpacity={1}
        stroke="#00914c"
        strokeWidth={0.183495}
        strokeDasharray="none"
        strokeOpacity={0}
      >
        <tspan x={2.4294252} y={2.5836747}>
          <tspan
            // style={{
            //   InkscapeFontSpecification: "'Arial, Normal'",
            // }}
            fontSize="7.75247px"
            fontFamily="Arial, Normal"
            letterSpacing="-.290718px"
          >
            {"H"}
          </tspan>
          <tspan
            dx={-0.18896708}
            // style={{
            //   InkscapeFontSpecification: "'Berlin'",
            // }}
            fontSize="7.75247px"
            fontFamily="Berlin, Arial"
          >
            {"ooper"}
          </tspan>
        </tspan>
      </text>
      <path
        d="M2.859 2.303l.036.22v0"
        opacity={0.973837}
        fill="#ff3e1a"
        stroke="#00914c"
        strokeWidth={0.183495}
        strokeOpacity={0}
      />
      <path
        d="M2.851 2.296l.037.226"
        opacity={0.973837}
        fill="none"
        stroke="none"
        strokeWidth={0.183495}
        strokeOpacity={1}
      />
      <path
        opacity={0.973837}
        fillOpacity={0}
        // stroke={main}
        className="stroke-slate-200"
        strokeWidth={0.122381}
        strokeDasharray="none"
        d="M1.7393782 0.88280219H4.508589499999999V2.70306119H1.7393782z"
      />
      <path
        opacity={0.973837}
        fillOpacity={0}
        // stroke={main}
        className="stroke-slate-200"
        strokeWidth={0.0824081}
        strokeDasharray="none"
        d="M2.6789002 1.7383457H3.66984125V2.36818113H2.6789002z"
      />
      <rect
        width={1.1253058}
        height={0.016795523}
        x={2.6033199}
        y={2.4689548}
        ry={0.0083977617}
        opacity={0.973837}
        fillOpacity={0}
        // stroke={net}
        className="stroke-emerald-950 dark:stroke-gray-500"
        strokeWidth={0.0824081}
        strokeLinecap="round"
        strokeDasharray="none"
      />
      <path
        d="M2.662 2.545h1.025l-.06.167h-.88z"
        opacity={0.973837}
        // fill={net}
        className="fill-emerald-950 dark:fill-gray-500"
        fillOpacity={0.67628205}
        strokeWidth={0.0824081}
        strokeLinecap="round"
        strokeDasharray="none"
        strokeOpacity={0}
      />
      <path
        opacity={0.973837}
        fillOpacity={0}
        // stroke={main}
        className="stroke-slate-200"
        strokeWidth={0.122411}
        strokeLinecap="round"
        strokeDasharray="none"
        strokeOpacity={1}
        d="M1.7458985 3.4629092H4.5144389V3.482302996H1.7458985z"
      />
      <path
        opacity={0.973837}
        fillOpacity={0}
        // stroke={main}
        className="stroke-slate-200"
        strokeWidth={0.121567}
        strokeLinecap="round"
        strokeDasharray="none"
        strokeOpacity={1}
        d="M1.7454761 3.4721329H1.7657148390000001V5.3733667H1.7454761z"
      />
      <path
        opacity={0.973837}
        fillOpacity={0}
        // stroke={main}
        className="stroke-slate-200"
        strokeWidth={0.121567}
        strokeLinecap="round"
        strokeDasharray="none"
        strokeOpacity={1}
        d="M4.4946227 3.4817791H4.514861439V5.3830129H4.4946227z"
      />
      <path
        opacity={0.973837}
        // fill={net}
        className="fill-emerald-950 dark:fill-gray-500"
        fillOpacity={0.330128}
        stroke="#000"
        strokeWidth={0.123294}
        strokeLinecap="round"
        strokeDasharray="none"
        strokeOpacity={0}
        d="M1.8910316 3.6040442H4.3693062000000005V5.3435647H1.8910316z"
      />
    </svg>
  );
};
