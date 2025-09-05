import AI_Prompt from "@/modules/home/components/ai-prompt";

export default function HomePage() {


  return (
    <div className="min-h-screen">
      <main className="flex flex-col max-w-6xl mx-auto px-6 justify-center items-center">
        <section className="text-center space-y-8 pt-72 pb-20">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-4xl font-bold tracking-tight leading-tight text-zinc-700 dark:text-zinc-100">
              Prompt. Refine. Learn.
              <br />
              <span className="text-[#5075EF]">
                Build real , interactive Courses By Describing Them.
              </span>
            </h1>

          </div>
        </section>

        <AI_Prompt />

      </main>
    </div>
  )
}