// to make this app simpler this homepage will act as a about page also
// basically only explaining the purpose of the app and who are allowed to use it.

function Home() {
  return (
    <section className="flex flex-col lg:h-[80vh] md:h-[90vh] sm:h-[95vh] px-6 space-x-5 max-w-2xl mx-auto text-center mb-5">
      <h1 className="text-5xl font-extralight mt-10 mb-10 text-center pl-4">
        Welcome
      </h1>

      <section className="flex flex-col mx-auto justify-center text-center items-center">
        <span className="iconEmoji rounded-xl">🤗</span>
        <p className="text-[16px] my-10">
          Workflow
          <span className="border-1 bg-white rounded-lg p-1 font-bold text-[#556cef]">
            Helper
          </span>{" "}
          is meant to help our associates need less dependance from our team
          leads. In general team leads are in charge of low level maintenance
          within their designated departments, as the shift goes they are being
          prompt to take care of minor troubleshooting and maintenance tasks to
          keep their lines running all shift, according to my observations and
          feedback from the team leads, 70% of these issues can be fixed by
          anyone on the floor but what we lack is the tool that can allow us
          machinist to perform these fixes by following a step by step guide on
          each issue that they encounter.
        </p>
      </section>
    </section>
  );
}

export default Home;
