// "use client";

// import { ClickableMillionareBox, GoToChallenge } from "..";
// import { useFirebaseListener } from "@/hooks";

// export const LetsPlayBtn = ({ route }: { route: string }) => {
//   const { updateDataInStore, updateDataInFirebase } = useFirebaseListener();
//   const navToChallenge = GoToChallenge(route, () => {
//     console.log("Callback entered");

//     updateDataInFirebase({
//       letsPlay: true,
//     });
//   });

//   return <ClickableMillionareBox text="Lets Play!" onClick={navToChallenge} />;
// };
