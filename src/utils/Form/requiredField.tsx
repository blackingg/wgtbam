export const Required = ({ thisField }: { thisField: string }) => (
  <span className=" text-red-500 font-normal text-base">
    {thisField} is required
  </span>
);