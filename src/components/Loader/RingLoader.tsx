import { ColorRing } from "react-loader-spinner";

export const RingLoader = () => {
  return (
    <div className=" flex justify-center items-center w-full h-full">
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#EAB95A", "#8A0089", "#ffffff", "#FDCB3E", "#7C2B46"]}
      />
    </div>
  );
};
