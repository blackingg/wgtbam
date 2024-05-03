"use client";

import {
  BackgroundImage,
  ClickableMillionareBox,
  GoToChallenge,
  GoToHome,
  MillionareLogo,
} from "@/components";

export default function Home() {
  GoToHome();

  const navToChallenge = GoToChallenge();

  return (
    <section className="relatve w-screen min-h-screen flex flex-col gap-y-10 justify-center">
      <BackgroundImage />
      <MillionareLogo />
      <ClickableMillionareBox text="Lets Play!" onClick={navToChallenge} />
    </section>
  );
}
