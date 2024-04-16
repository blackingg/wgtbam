import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const RingLoader = () => {
  return (
    <div className=" flex justify-center items-center w-screen h-screen">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};
