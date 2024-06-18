import { BackgroundImage } from "../common";
import { PrizePool } from "../PrizePool";

export const UserPrizeModal = ({ openPrize }: { openPrize: boolean }) => {
  // const updateDataInFirebase = useQuestionStore(
  //   useShallow((state) => state.updateDataInFirebase)
  // );

  // const closeModal = async () => {
  //   await updateDataInFirebase({
  //     openPrize: false,
  //   });
  // };

  return (
    <>
      {openPrize && (
        <div
          // onClick={closeModal}
          className="fixed left-0 top-0 z-[999995] grid min-h-[100dvh] w-screen place-items-center overflow-hidden backdrop-blur-lg"
        >
          <BackgroundImage />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-[999999] flex h-full w-full items-center justify-center bg-opacity-[0.15] shadow-md backdrop-blur-sm"
          >
            <PrizePool
            // prizeLevel={prizeLevel}
            // usedFifty={usedFifty}
            // usedAudience={usedAudience}
            // usedPhone={usedPhone}
            />
          </div>
        </div>
      )}
    </>
  );
};
