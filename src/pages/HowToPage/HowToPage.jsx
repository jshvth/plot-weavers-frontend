export default function HowToPage() {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Headline */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">
            The Art of Writing Manga Chapters
          </h1>
          <p className="text-lg text-gray-700">
            Welcome to the writer&apos;s guide! This page will walk you through
            the key elements of crafting compelling stories for your manga.
          </p>
        </header>

        {/* What is a Manga Plot */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-pink-600 mb-3">
            What Is a Manga Plot?
          </h2>
          <p className="text-gray-700 mb-4">
            A manga isn&apos;t just a drawing; it&apos;s a complete narrative
            with a plot, characters, and a world. While a manga is the visual
            art, the plot is the story&apos;s text, structure, and emotional
            core.
          </p>
          <p className="text-gray-700">
            Most chapters follow a linear structure with a clear beginning,
            middle, and end. However, some stories use a branching structure
            with multiple perspectives or timelines. Always guide your readers
            through the story and build tension with a compelling story arc for
            each chapter.
          </p>
        </section>

        {/* Genres & Tropes */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-indigo-500 mb-3">
            Typical Genres & Tropes
          </h2>
          <p className="text-gray-700 mb-4">
            Before you start, it&apos;s helpful to know the different types of
            stories you can tell.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>
              <span className="font-semibold">Shonen:</span> Adventure, action,
              aimed at young males.
            </li>
            <li>
              <span className="font-semibold">Shojo:</span> Romance, drama,
              aimed at young females.
            </li>
            <li>
              <span className="font-semibold">Seinen:</span> Complex themes,
              aimed at adult males.
            </li>
            <li>
              <span className="font-semibold">Isekai:</span> A protagonist is
              transported to another world.
            </li>
            <li>
              <span className="font-semibold">Slice of Life:</span> Everyday
              events and small moments.
            </li>
            <li>
              <span className="font-semibold">Horror:</span> Designed to scare
              and thrill.
            </li>
            <li>
              <span className="font-semibold">Comedy:</span> Focuses on humor.
            </li>
          </ul>
          <p className="text-gray-700">
            Tropes are common narrative patterns. Examples include: a hero with
            a dark past, a sudden transformation, a rivalry between characters,
            or a Tsundere (a character who is initially cold but reveals a
            warmer side).
          </p>
        </section>

        {/* Building a Great Chapter */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-pink-600 mb-3">
            Building a Great Chapter
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">The Hook:</span> A captivating
              opening that grabs attention.
            </li>
            <li>
              <span className="font-semibold">Conflict or Development:</span>{" "}
              The main event (fight, discovery, conversation).
            </li>
            <li>
              <span className="font-semibold">(Optional) Cliffhanger:</span> End
              on high tension for the next chapter.
            </li>
            <li>
              <span className="font-semibold">Dialogue & Atmosphere:</span>{" "}
              Reveal character and mood with dialogue & description.
            </li>
            <li>
              <span className="font-semibold">Formatting:</span> Keep text
              readable with clear formatting.
            </li>
          </ul>
        </section>

        {/* Rules */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-indigo-500 mb-3">
            What Is (and Isn&apos;t) Allowed
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">
                No Glorification of Violence:
              </span>{" "}
              Violence may be shown but not celebrated.
            </li>
            <li>
              <span className="font-semibold">No Hate Speech:</span> Zero
              tolerance for racism, discrimination, or hate.
            </li>
            <li>
              <span className="font-semibold">Erotica:</span> Erotic themes
              permitted, but not explicit content.
            </li>
            <li>
              <span className="font-semibold">No Plagiarism:</span> Always use
              your own work.
            </li>
            <li>
              <span className="font-semibold">AI-Generated Text:</span> Allowed
              if clearly stated.
            </li>
          </ul>
        </section>

        {/* Tips & Writing Aids */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-pink-600 mb-3">
            Tips & Writing Aids
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Chapter Length:</span> Aim for
              300–1,500 words.
            </li>
            <li>
              <span className="font-semibold">Planning Tools:</span> Use
              notebooks or mind maps.
            </li>
            <li>
              <span className="font-semibold">Feedback:</span> Community
              feedback is gold for improvement.
            </li>
          </ul>
        </section>

        {/* Inspiration */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-indigo-500 mb-3">
            Examples & Inspiration
          </h2>
          <p className="text-gray-700">
            To get inspired, check out popular manga and anime to study their
            storytelling techniques. Even the best writers take inspiration from
            others!
          </p>
        </section>
      </div>
    </div>
  );
}
