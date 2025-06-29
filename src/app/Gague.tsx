import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

//Component with default values
export default function Gague() {
  return (
    <GaugeComponent
      value={60}
      type="semicircle"
      labels={{
        tickLabels: {
          type: "inner",
          ticks: [
            { value: 20 },
            { value: 40 },
            { value: 60 },
            { value: 80 },
            { value: 100 },
          ],
        },
      }}
      arc={{
        colorArray: ["#5BE12C", "#EA4228"],
        subArcs: [{}, {}, {}, {}, {}],
        padding: 0.02,
        width: 0.5,
      }}
      pointer={{
        elastic: true,
        animationDelay: 0,
      }}
    />
  );
}
