import { useQuestionStore } from "@/zustand/store";
import { useRouter } from "next/navigation";

export const useWithdrawMoney = ({
  numPrizeLevel,
  route,
}: {
  numPrizeLevel: number;
  route: string;
}) => {
  const router = useRouter();
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );

  async function WithdrawMoney() {
    await updateDataInFirebase({
      goToTotal: true,
      prizeLevel: numPrizeLevel,
      showCheckpoint: false,
    });

    router.push(route ?? "");
  }
  return WithdrawMoney;
};
