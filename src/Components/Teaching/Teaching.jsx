import { Link } from "react-router-dom";

const Teaching = () => {
  return (
    <div className="py-12 bg-slate-200">
        
      <section className="flex min-h-[600px]   w-full items-center justify-center bg-base-green px-8 py-2">
        <div className="flex w-full max-w-6xl gap-10 lg:flex-row flex-col items-center justify-between">
          <div className="max-w-lg md:space-y-6 sm:space-y-5 space-y-4">
            <h1 className="lg:text-5xl sm:text-4xl text-3xl font-bold leading-tight text-base-orange font-poppin">
              Become a Part of EduMate&apos;s Teaching Community
            </h1>
            <p className="lg:text-lg sm:text-base text-sm text-white font-poppin">
              Join our network of passionate educators and make a difference in
              student&apos;s lives. Share your knowledge, inspire learners, and
              grow your teaching career with EduMate. Together, we can shape the
              future of education.
            </p>
            <div className="flex space-x-4">
              <Link to="/teachOn">
                <button className="inline-flex flex-nowrap items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-white hover:text-base-green h-10 px-4 py-2 bg-base-orange text-white">
                  Start teaching today
                </button>
              </Link>
            </div>
            <div>
        <p className="text-lg text-white mb-6 font-poppin">
          Empower others by sharing your technological skills. Together, we can innovate and inspire the next generation. - EduMate
        </p>
        </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
              className="relative md:h-[600px]  sm:h-[500px] h-[300px]  w-[500px] bg-gray-400 rounded-b-full object-cover"
              alt="image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Teaching;
