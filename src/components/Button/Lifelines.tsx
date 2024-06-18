import { useQuestionStore } from "@/zustand/store";
import { FiftyFiftyButton } from "./FiftyFiftyButton";
import { PhoneFriendBtn } from "./PhoneFriendBtn";
import { AskAudienceBtn } from "./AskAudienceBtn";

export const Lifelines = ({
  usedFifty,
  isAnswered,
  usedPhone,
  usedAudience,
  handleFiftyFiftyClick,
}: {
  usedFifty: boolean;
  isAnswered: boolean;
  usedPhone: boolean;
  usedAudience: boolean;
  handleFiftyFiftyClick: () => void;
}) => {
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase,
  );

  return (
    <div className="absolute right-[3rem] top-[50%] flex translate-y-[-50%] flex-col items-center gap-6 ipad:flex-row">
      <FiftyFiftyButton
        onClick={() => {
          if (usedFifty === false && isAnswered === false) {
            handleFiftyFiftyClick();
          }
        }}
        className={`${usedFifty && `bg-[#EB1212]`}`}
      />
      <PhoneFriendBtn
        onClick={() => {
          if (usedPhone === false && isAnswered === false) {
            updateDataInFirebase({
              usedPhone: true,
            });
          }
        }}
        className={`${usedPhone && `bg-[#EB1212]`}`}
      />
      <AskAudienceBtn
        onClick={() => {
          if (usedAudience === false && isAnswered === false) {
            updateDataInFirebase({
              usedAudience: true,
            });
          }
        }}
        className={`${usedAudience && `bg-[#EB1212]`}`}
      />
    </div>
  );
};
