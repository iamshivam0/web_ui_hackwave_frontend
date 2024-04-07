import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { ButtonIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";
import gify from "@/assets/giphy.gif";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="mx-auto max-w-7xl">
      <motion.section
        className="container grid gap-10 py-20 lg:grid-cols-2 place-items-center md:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="space-y-6 text-center lg:text-start">
          <main className="text-5xl font-bold md:text-6xl">
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                Smart Grid Optimization
              </span>{" "}
              Renewable Energy for
            </h1>{" "}
            for{" "}
            <h2 className="inline">
              <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                Sustainable
              </span>{" "}
              Power Systems
            </h2>
          </main>

          <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
            Winds of Change :
            <br />
            <span className="">
              Harnessing Machine Learning for Optimal Windmill Utilization
            </span>
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Link to="./Stability">
              <Button className="w-full rounded md:w-1/3">
                Check Stability
              </Button>
            </Link>
            <Link to="./Pwrgen">
              <Button className={` w-full md:w-1/3 ${buttonVariants({})}`}>
                Power Generated
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero cards sections */}
        <motion.div
          className="z-10 bg-transparent"
          initial={{ x: "50vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <img src={gify} alt="loading..." className="w-[50vh] h-[50vh]" />
        </motion.div>

        {/* Shadow effect */}
        <motion.div
          className="shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        ></motion.div>
      </motion.section>
    </div>
  );
}

export default Hero;
