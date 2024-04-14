import {
  AnswerButton,
  QuestionBox,
  TelIcon,
  UsergroupIcon,
} from "@/components";

export default function Home() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center gap-16 purplebg">
      <div className=" w-full h-full relative">
        <div className=" max-w-[150px] tablet:max-w-[140px] max-h-[150px] tablet:max-h-[140px] w-full h-full flex justify-center items-center mx-auto">
          <img src="/Images/logo2.svg" alt="Logo" className="" />
          <div className=" absolute right-[3rem] top-[50%] translate-y-[-50%] flex gap-6 items-center">
            <div className="max-w-[100px] max-h-[50px] w-full h-full flex justify-center items-center font-montserrat font-bold text-xl text-[#8A0089] rounded-[72px] bg-white/90 shadow-md px-6 py-4">
              50/50
            </div>
            <div className=" max-w-[100px] max-h-[50px] w-full h-full flex justify-center items-center font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] bg-white/90 shadow-md px-6 py-4">
              <TelIcon width="39" height="38" />
            </div>
            <div className=" max-w-[100px] max-h-[50px] w-full h-full flex justify-center items-center font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] bg-white/90 shadow-md px-6 py-4">
              <UsergroupIcon />
            </div>
          </div>
        </div>
      </div>

      <section className=" mt-8">
        <div className=" relative">
          <div className=" bg-[#EAB95A] w-full h-[4.5px] z-[1] absolute left-[0%] top-[50%] translate-y-[-50%] " />
          <QuestionBox
            question="Which of the following is not a part of the seven wonder of the  ancient world?"
            className=" text-sm px-[4px] z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] "
            isBig={true}
          />
        </div>
      </section>
      <section className=" mt-8">
        <div className=" tablet:px-8 flex flex-col tablet:flex-row items-center justify-center gap-4 relative">
          <div className=" bg-[#EAB95A] w-full h-[4.5px] z-[1] absolute left-[0%] top-[50%] translate-y-[-50%] hidden tablet:block " />
          <QuestionBox question="A. The Statue of Zues" />
          <QuestionBox question="B. The Great Pyramid of Giza" />
        </div>

        <div className=" py-4 ipad:py-8 ipad:px-8 flex flex-col tablet:flex-row items-center justify-center gap-4 relative">
          <div className=" bg-[#EAB95A] w-full h-[4.5px] z-[1] absolute left-[0%] top-[50%] translate-y-[-50%] hidden tablet:block " />
          <QuestionBox question="C. The Effiel Tower" />
          <QuestionBox question="D. The Colossus of Rhodes" />
        </div>
      </section>

      <div className=" flex justify-between items-center px-12">
        <AnswerButton btntext="Reveal Correct Answer" />
        <AnswerButton
          btntext="Confirm Participant Answer"
          className=" bg-[#E07000]"
        />
      </div>
    </section>
  );
}
