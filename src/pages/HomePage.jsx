import { PageAnimation } from "../common/Animation";
import InPageTabNavigation from "../components/InPageTabNavigation";

const HomePage = () => {
  return (
    <PageAnimation>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full ">
        <InPageTabNavigation tabs={["home","trending blogs"]} defaultHiddenTabs={["trending blogs"]}>

            <h1>latest</h1>
            <h1>Trending</h1>
        </InPageTabNavigation>



        </div>

        <div className="w-full bg-slate-600">
        Haii


        </div>
      </section>
    </PageAnimation>
  );
};

export default HomePage;
